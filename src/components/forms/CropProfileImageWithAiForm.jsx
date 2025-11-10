import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import {
  AlertCircleIcon,
  CropIcon,
  FileIcon,
  Loader2Icon,
  MoveLeft,
  StarsIcon,
  UploadIcon,
} from "lucide-react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useDropzone } from "react-dropzone";
import { CropProfileImageWithAiLoadingOverlay } from "..";
import { cropToPerson } from "@/services/geminiService";
import { cropImageToSquare } from "@/lib/image-utils";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteFile,
  useUpdateAppearance,
  useUpdateUserProfile,
  useUploadFile,
} from "@/tanstack-query/queries";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { fetchProfileByUserId } from "@/redux/thunks";
import { v4 as uuidV4 } from "uuid";
import { supabaseUrl } from "@/utils/supabase";
import { getDominantColorFromImageURL } from "@/helpers/imageDominatingColorFetcher";

const CropProfileImageWithAiForm = ({
  file,
  setFile,
  imageURL,
  setImageURL,
  setFormStep,
  isDialogCloseBlock,
  setDialogCloseBlock,
  setDialogClose,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { user, profile } = useSelector((state) => state?.user);
  const { appearance } = useSelector((state) => state?.dashboard);

  const [isSmartCroppingActive, setSmartCroppingActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isImageUploadPending, setImageUploadPending] = useState(false);
  const [isImageUploadProcessActive, setImageUploadProcessActive] =
    useState(false);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setFile(null);

      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setImageURL(URL.createObjectURL(acceptedFiles[0]));
      }

      if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        if (
          firstRejection.errors.some((error) => error.code === "too-many-files")
        ) {
          console.error("Please select only one file.");
        } else {
          console.error(firstRejection.errors[0].message);
        }
      }
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".bmp", ".heic", ".heif"],
    },
  });

  const handleSmartCrop = async () => {
    setSmartCroppingActive(true);
    setImageUploadProcessActive(false);

    setDialogCloseBlock(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const boundingBox = await cropToPerson(base64Image);
        if (boundingBox) {
          const croppedImageBlob = await cropImageToSquare(
            base64Image,
            boundingBox
          );

          if (!croppedImageBlob) {
            throw new Error(
              "Cropping the profile picture failed. Please retry."
            );
          }

          const croppedImageURL = URL.createObjectURL(croppedImageBlob);

          if (!croppedImageURL) {
            throw new Error(
              "Failed to generate the cropped profile picture URL. Please try again."
            );
          }

          setFile(croppedImageBlob);
          setImageURL(croppedImageURL);

          setImageUploadProcessActive(true);
        }
      } catch (error) {
        if (error) {
          console.error(error?.message);
          setErrorMessage(error?.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } finally {
        setSmartCroppingActive(false);
        setDialogCloseBlock(false);
      }
    };
  };

  const { mutateAsync: uploadProfileImageFile } = useUploadFile();

  const { mutateAsync: deleteProfileImageFile } = useDeleteFile();

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const uploadProfilePicture = useCallback(async () => {
    try {
      setImageUploadPending(true);
      setDialogCloseBlock(true);

      // 1. Ensure 'file' is a Blob/File object (it is a Blob after cropping)
      if (!file || !(file instanceof Blob)) {
        throw new Error("Invalid file object for upload.");
      }

      // 2. Create a new File object from the Blob, explicitly setting the type.
      // The `cropImageToSquare` utility uses "image/png", so we use that here.
      const fileName = `${uuidV4()}.png`; // Use a standard extension
      const fileToUpload = new File([file], fileName, { type: "image/png" });

      if (profile?.profile_image_url) {
        const path = profile?.profile_image_url.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteProfileImageFile(path);
      }

      await uploadProfileImageFile({
        path: `${profile?.user_id}/profile-image/${fileName}`,
        file: fileToUpload,
      });

      const profileImageURL = `${supabaseUrl}/storage/v1/object/public/users-storage-bucket/${profile?.user_id}/profile-image/${fileName}`;

      await updateUserProfile({
        user_profile_data: { profile_image_url: profileImageURL },
        user_profile_id: profile?.id,
      });

      if (appearance?.profile_image_layout === "hero") {
        const dominatingColor = await getDominantColorFromImageURL(
          profileImageURL
        );

        const updatedAppearance = await updateAppearance({
          id: appearance?.id,
          data_object: {
            hero_profile_layout_wallpaper_setup: {
              color: dominatingColor,
              style: {
                background: dominatingColor,
              },
            },
          },
        });

        dispatch(updateAppearanceData(updatedAppearance));
      }

      dispatch(fetchProfileByUserId(user?.id));

      setFile(null);
      setImageURL(null);
      setFormStep(1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to upload profile image.",
        description: "The profile image upload failed. Please try again.",
      });

      console.error(error.message);
    } finally {
      setImageUploadPending(false);
      setDialogCloseBlock(false);
    }
  }, [
    file,
    profile,
    uploadProfileImageFile,
    deleteProfileImageFile,
    updateUserProfile,
    updateAppearance,
    appearance,
    dispatch,
    user,
    setFile,
    setImageURL,
    setFormStep,
    toast,
  ]);

  return (
    <>
      <DialogHeader className="relative mb-2.5">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() => {
            if (isDialogCloseBlock) return;

            if (!file) {
              setFormStep(2);
            }
            setFile(null);
            setImageURL(null);
            setImageUploadProcessActive(false);
            setErrorMessage(null);
          }}
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          {file ? "Crop profile image" : "Upload profile image"}
        </DialogTitle>
      </DialogHeader>

      {file ? (
        <>
          <div className="relative w-full h-80 overflow-hidden border border-border rounded-lg">
            <img
              src={imageURL}
              alt="image to crop with AI"
              className="w-full h-full object-contain"
            />

            {isSmartCroppingActive && (
              <CropProfileImageWithAiLoadingOverlay
                icon={<CropIcon className="text-white" />}
                title="Smart Cropping in Progress…"
                description="Just a moment! We're cropping your image to highlight the key parts."
              />
            )}

            {isImageUploadProcessActive && isImageUploadPending && (
              <CropProfileImageWithAiLoadingOverlay
                icon={<UploadIcon className="text-white" />}
                title="Uploading Your Profile Picture…"
                description="Hang tight! We're getting your photo ready to shine. This won't take long."
              />
            )}
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircleIcon className="size-4 shrink-0" />{" "}
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                if (isDialogCloseBlock) return;
                setFile(null);
                setImageURL(null);
                setFormStep(1);
                setImageUploadProcessActive(false);
                setErrorMessage(null);
                setDialogClose(false);
              }}
            >
              Cancel
            </Button>

            {isImageUploadProcessActive ? (
              <Button
                type="button"
                variant="contrast"
                className="w-full"
                onClick={uploadProfilePicture}
              >
                {isImageUploadPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Upload"
                )}
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className={`w-full bg-gradient-to-r from-purple-700 via-blue-600 to-teal-600 hover:from-purple-800 hover:via-blue-700 hover:to-teal-700 ${
                  isSmartCroppingActive &&
                  "animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]"
                }`}
                onClick={handleSmartCrop}
              >
                {isSmartCroppingActive ? (
                  <Loader2Icon className="animate-spin text-white" />
                ) : (
                  <StarsIcon className="text-white" />
                )}
                <span className="text-white">Smart Crop</span>
              </Button>
            )}
          </div>
        </>
      ) : (
        <div
          {...getRootProps()}
          className="bg-background rounded-lg cursor-pointer overflow-hidden border border-border focus-within:ring-1 focus-within:ring-ring hover:bg-accent"
        >
          <input {...getInputProps()} className="cursor-pointer" />

          <div className="w-full h-80 text-copy flex flex-col items-center justify-center gap-4 text-center">
            <FileIcon size={40} strokeWidth={1} />
            <p className="text-sm">
              Select file to upload, <br /> or drag-and-drop file
            </p>
            <small className="text-xs text-balance text-copy-lighter">
              Allowed file types: JPEG, PNG, WebP, BMP, HEIC, HEIF
            </small>
          </div>
        </div>
      )}
    </>
  );
};

export default CropProfileImageWithAiForm;

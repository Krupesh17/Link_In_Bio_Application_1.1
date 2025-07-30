import React, { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileDragDropBox } from "..";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import {
  useDeleteFile,
  useUpdateAppearance,
  useUploadFile,
} from "@/tanstack-query/queries";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { supabaseUrl } from "@/utils/supabase";
import { useToast } from "@/hooks/use-toast";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";

const AppearanceWallpaperImageForm = ({
  setDialogOpen,
  onImageUploadSuccess,
}) => {
  const { appearance } = useSelector((state) => state?.dashboard);
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [formStep, setFormStep] = useState(1);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleDialogClose = () => {
    setFile(null);
    setImageURL(null);
    setFormStep(1);
    setDialogOpen(false);
  };

  const {
    mutateAsync: uploadWallpaperImageFile,
    isPending: isWallpaperImageFileUploading,
  } = useUploadFile();

  const {
    mutateAsync: deleteWallpaperImageFile,
    isPending: isWallpaperImageFileDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateAppearance, isPending: isAppearanceUpdating } =
    useUpdateAppearance();

  const uploadImageWallpaper = async () => {
    try {
      if (appearance?.wallpaper_setup?.wallpaper_image_url) {
        const path = appearance?.wallpaper_setup?.wallpaper_image_url.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteWallpaperImageFile(path);
      }

      const wallpaper_image_id = uuidV4();

      await uploadWallpaperImageFile({
        path: `${profile?.user_id}/appearance-wallpaper-images/${wallpaper_image_id}`,
        file: file,
      });

      const wallpaperImageURL = `${supabaseUrl}/storage/v1/object/public/users-storage-bucket/${profile?.user_id}/appearance-wallpaper-images/${wallpaper_image_id}`;

      const response = await updateAppearance({
        id: appearance?.id,
        data_object: {
          wallpaper_setup: {
            type: "image",
            color: appearance?.wallpaper_setup?.color,
            wallpaper_image_url: wallpaperImageURL,
            style: {
              backgroundImage: `url("${wallpaperImageURL}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          },
        },
      });

      dispatch(updateAppearanceData(response));

      // Reset form state
      setFile(null);
      setImageURL(null);
      setFormStep(1);

      // Call success callback to update parent component
      if (onImageUploadSuccess) {
        onImageUploadSuccess();
      } else {
        // Fallback to regular dialog close
        handleDialogClose();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Upload Wallpaper Image",
        description: "The wallpaper image upload failed. Please try again.",
      });

      console.error(error?.message);
    }
  };

  return (
    <>
      <DialogHeader className="relative mb-2.5">
        {formStep === 3 && (
          <Button
            size="icon"
            variant="link"
            className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
            onClick={() => {
              setFormStep(1);
              setFile(null);
              setImageURL(null);
            }}
          >
            <MoveLeft />
          </Button>
        )}
        <DialogTitle className="text-copy text-center mb-2.5">
          Image Wallpaper
        </DialogTitle>
        <DialogDescription>
          Frame your content with a background that tells your story!
        </DialogDescription>
      </DialogHeader>

      {formStep === 1 && (
        <FileDragDropBox
          file={file}
          setFile={setFile}
          imageURL={imageURL}
          setImageURL={setImageURL}
          afterImageCrop={() => setFormStep(3)}
          terminateImageCrop={() => setFormStep(1)}
        />
      )}

      {formStep === 3 && (
        <div className="flex flex-col gap-4">
          <div className="w-full h-80 flex justify-center items-center bg-accent rounded-lg overflow-hidden border border-border">
            <img
              src={imageURL}
              alt="cropped image"
              className="h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contrast"
              className="w-full"
              onClick={uploadImageWallpaper}
            >
              {isWallpaperImageFileDeleting ||
              isWallpaperImageFileUploading ||
              isAppearanceUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppearanceWallpaperImageForm;

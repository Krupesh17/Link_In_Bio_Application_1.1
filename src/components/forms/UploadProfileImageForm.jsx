import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import {
  useUpdateUserProfile,
  useUploadFile,
  useDeleteFile,
} from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { supabaseUrl } from "@/utils/supabase";
import { fetchProfileByUserId } from "@/redux/thunks";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidV4 } from "uuid";

const UploadProfileImageForm = ({
  file,
  setFile,
  imageURL,
  setImageURL,
  setFormStep,
  setDialogClose,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { user, profile } = useSelector((state) => state?.user);

  const {
    mutateAsync: uploadProfileImageFile,
    isPending: isProfileImageFileUploading,
  } = useUploadFile();

  const {
    mutateAsync: deleteProfileImageFile,
    isPending: isProfileImageFileDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateUserProfile, isPending: userProfileUpdating } =
    useUpdateUserProfile();

  const uploadProfilePicture = async () => {
    try {
      if (profile?.profile_image_url) {
        const path = profile?.profile_image_url.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteProfileImageFile(path);
      }

      const image_id = uuidV4();

      await uploadProfileImageFile({
        path: `${profile?.user_id}/profile-image/${image_id}`,
        file: file,
      });

      const profileImageURL = `${supabaseUrl}/storage/v1/object/public/users-storage-bucket/${profile?.user_id}/profile-image/${image_id}`;

      await updateUserProfile({
        user_profile_data: { profile_image_url: profileImageURL },
        user_profile_id: profile?.id,
      });

      dispatch(fetchProfileByUserId(user?.id));
      
      setFile(null);
      setImageURL(null);
      setFormStep(1);
      setDialogClose(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to upload profile image.",
        description: "The profile image upload failed. Please try again.",
      });

      console.error(error.message);
    }
  };

  const imageUploadCancel = () => {
    setFile(null);
    setImageURL(null);
    setFormStep(1);
  };
  return (
    <>
      <DialogHeader className="relative mb-2.5">
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
        <DialogTitle className="text-copy text-center">
          Upload profile image
        </DialogTitle>
      </DialogHeader>

      <div className="w-full h-80 flex justify-center items-center bg-accent rounded-lg overflow-hidden border border-border">
        <img src={imageURL} alt="cropped image" className="h-full object-contain" />
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={imageUploadCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="contrast"
          className="w-full"
          onClick={uploadProfilePicture}
        >
          {isProfileImageFileDeleting ||
          isProfileImageFileUploading ||
          userProfileUpdating ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Upload"
          )}
        </Button>
      </div>
    </>
  );
};

export default UploadProfileImageForm;

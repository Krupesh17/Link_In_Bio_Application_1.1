import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteFile,
  useUpdateUserProfile,
} from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";
import { fetchProfileByUserId } from "@/redux/thunks";

const ProfileImageDeleteConfirmation = ({ setFormStep, setDialogClose }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);

  const {
    mutateAsync: deleteProfileImageFile,
    isPending: isProfileImageFileDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateUserProfile, isPending: userProfileUpdating } =
    useUpdateUserProfile();

  const handleDeleteProfileImage = async () => {
    try {
      if (profile?.profile_image_url) {
        const path = profile?.profile_image_url.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteProfileImageFile(path);
        await updateUserProfile({
          user_profile_data: { profile_image_url: "" },
          user_profile_id: profile?.id,
        });
        dispatch(fetchProfileByUserId(user?.id));
        setDialogClose(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to delete profile image.",
        description: error.message,
      });
    }
  };

  return (
    <section>
      <DialogHeader className="relative mb-5">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() => {
            setFormStep(1);
          }}
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          Delete profile image
        </DialogTitle>
      </DialogHeader>

      <Button
        type="button"
        variant="contrast"
        className="w-full font-semibold h-10 mb-2"
        onClick={handleDeleteProfileImage}
      >
        {isProfileImageFileDeleting || userProfileUpdating ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Delete"
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full font-semibold h-10"
        onClick={() => setDialogClose(false)}
      >
        Cancel
      </Button>
    </section>
  );
};

export default ProfileImageDeleteConfirmation;

import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import {
  useDeleteFile,
  useUpdateLink,
  useUploadFile,
} from "@/tanstack-query/queries";
import { v4 as uuidV4 } from "uuid";
import { supabaseUrl } from "@/utils/supabase";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const UploadLinkThumbnailImageForm = ({
  file,
  setFile,
  imageURL,
  setImageURL,
  setFormStep,
  setDialogClose,
  linkData,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { links } = useSelector((state) => state?.dashboard);
  const { profile } = useSelector((state) => state?.user);

  const {
    mutateAsync: uploadLinkThumbnailImageFile,
    isPending: isLinkThumbnailUploading,
  } = useUploadFile();

  const {
    mutateAsync: deleteLinkThumbnailImageFile,
    isPending: isLinkThumbnailDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateLink, isPending: isLinkUpdating } =
    useUpdateLink();

  const uploadLinkThumbnailImage = async () => {
    try {
      if (linkData?.link_thumbnail_url) {
        const path = linkData?.link_thumbnail_url?.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteLinkThumbnailImageFile(path);
      }

      const thumbnail_id = uuidV4();

      await uploadLinkThumbnailImageFile({
        path: `${profile?.user_id}/link-thumbnail-images/${thumbnail_id}`,
        file: file,
      });

      const linkThumbnailImageURL = `${supabaseUrl}/storage/v1/object/public/users-storage-bucket/${profile?.user_id}/link-thumbnail-images/${thumbnail_id}`;

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_thumbnail_url: linkThumbnailImageURL },
      });

      const indexOfLinkToBeUpdated = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeUpdated, 1, response?.at(0));

      dispatch(updateLinksData(updatedLinks));

      setFile(null);
      setImageURL(null);
      setFormStep(1);
      setDialogClose(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to upload thumbnail image.",
        description: "The thumbnail image upload failed. Please try again.",
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
          onClick={uploadLinkThumbnailImage}
        >
          {isLinkThumbnailDeleting ||
          isLinkThumbnailUploading ||
          isLinkUpdating ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Upload"
          )}
        </Button>
      </div>
    </>
  );
};

export default UploadLinkThumbnailImageForm;

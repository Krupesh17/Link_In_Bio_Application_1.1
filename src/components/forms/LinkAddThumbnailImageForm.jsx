import React, { useState } from "react";
import { Button } from "../ui/button";
import { AddLinkThumbnailImageDialog } from "../dialog-boxs";
import { useDeleteFile, useUpdateLink } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateLinksData } from "@/redux/features/dashboardSlice";
import { Image, Loader2 } from "lucide-react";

const LinkAddThumbnailImageForm = ({ linkData }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { links } = useSelector((state) => state?.dashboard);

  const [isAddThumbnailImageDialogOpen, setAddThumbnailImageDialogOpen] =
    useState(false);

  const {
    mutateAsync: deleteLinkThumbnailImageFile,
    isPending: isLinkThumbnailDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateLink, isPending: isLinkUpdating } =
    useUpdateLink();

  const removeLinkThumbnailImage = async () => {
    try {
      const path = linkData?.link_thumbnail_url?.match(
        /users-storage-bucket\/(.+)/
      )[1];

      await deleteLinkThumbnailImageFile(path);

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_thumbnail_url: null },
      });

      const indexOfLinkToBeUpdated = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeUpdated, 1, response?.at(0));

      dispatch(updateLinksData(updatedLinks));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to delete thumbnail image.",
        description:
          "The thumbnail image could not be deleted. Please try again.",
      });

      console.error(error?.message);
    }
  };
  return (
    <>
      <AddLinkThumbnailImageDialog
        isAddThumbnailImageDialogOpen={isAddThumbnailImageDialogOpen}
        setAddThumbnailImageDialogOpen={setAddThumbnailImageDialogOpen}
        linkData={linkData}
      />

      {linkData?.link_thumbnail_url ? (
        <section className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={linkData?.link_thumbnail_url}
              alt="Link thumbnail image"
              className="w-[88px] h-[88px] shrink-0 bg-transparent rounded-md object-cover"
            />
            <div className="flex flex-col gap-2 w-full">
              <Button
                type="button"
                variant="contrast"
                className="h-10 w-full font-semibold"
                onClick={() => setAddThumbnailImageDialogOpen(true)}
              >
                Change
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-10 w-full font-semibold"
                onClick={removeLinkThumbnailImage}
              >
                {isLinkThumbnailDeleting || isLinkUpdating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Remove"
                )}
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 pb-4">
          <p className="text-sm text-copy-lighter text-center mb-4">
            Add a Thumbnail or Icon to this Link.
          </p>
          <Button
            type="button"
            variant="contrast"
            className="h-10 w-full font-semibold"
            onClick={() => setAddThumbnailImageDialogOpen(true)}
          >
            <Image strokeWidth={1.5} />
            <span>Set Thumbnail</span>
          </Button>
        </section>
      )}
    </>
  );
};

export default LinkAddThumbnailImageForm;

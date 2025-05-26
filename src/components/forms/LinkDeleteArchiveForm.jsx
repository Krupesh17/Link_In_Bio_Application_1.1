import React from "react";
import { Button } from "../ui/button";
import { Archive, Loader2, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useDeleteLink, useUpdateLink } from "@/tanstack-query/queries";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkDeleteArchiveForm = ({ linkData, setLoading }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const { mutateAsync: deleteLink, isPending: isDeletingLink } =
    useDeleteLink();

  const { mutateAsync: updateLink, isPending: isUpdatingLink } =
    useUpdateLink();

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!linkData?.id) {
        throw new Error("Link Id is missing. Please try again.");
      }

      const response = await deleteLink(linkData?.id);

      const indexOfLinkToBeDeleted = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeDeleted, 1);

      dispatch(updateLinksData(updatedLinks));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Link Deletion Failed",
        description:
          "The link couldn't be deleted due to a technical issue. Please try again.",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    try {
      setLoading(true);

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_archived: true },
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
        title: "Oops! Link Archived Failed",
        description:
          "The link couldn't be archived due to a technical issue. Please try again.",
      });

      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-2 max-[500px]:grid-cols-1 gap-2 px-4 pb-4">
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={handleDelete}
        >
          {isDeletingLink ? (
            <Loader2 />
          ) : (
            <>
              <Trash2 /> <span>Delete</span>
            </>
          )}
        </Button>
        <small className="text-center max-[500px]:text-left text-wrap text-copy-lighter">
          Delete forever.
        </small>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="contrast"
          className="h-10"
          onClick={handleArchive}
        >
          {isUpdatingLink ? (
            <Loader2 />
          ) : (
            <>
              <Archive /> <span>Archive</span>
            </>
          )}
        </Button>
        <small className="text-center max-[500px]:text-left text-wrap text-copy-lighter">
          Reduce clutter and restore anytime.
        </small>
      </div>
    </section>
  );
};

export default LinkDeleteArchiveForm;

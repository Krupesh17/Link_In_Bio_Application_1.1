import React from "react";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteLink } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkArchivedDeleteForm = ({ linkData, setVisible }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const { mutateAsync: deleteLink, isPending: isDeletingLink } =
    useDeleteLink();

  const handleDelete = async () => {
    try {
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
    }
  };

  return (
    <section className="px-4 pb-4">
      <p className="text-copy-lighter text-center mb-4">
        Permanently delete this link from your LinkChain
      </p>
      <div className="grid grid-cols-2 max-[500px]:grid-cols-1 gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={() => setVisible(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="contrast"
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
      </div>
    </section>
  );
};

export default LinkArchivedDeleteForm;

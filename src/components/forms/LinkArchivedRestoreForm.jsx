import React from "react";
import { Button } from "../ui/button";
import { ArchiveRestore, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useUpdateLink } from "@/tanstack-query/queries";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkArchivedRestoreForm = ({ linkData, setVisible }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const { mutateAsync: updateLink, isPending: isUpdatingLink } =
    useUpdateLink();

  const handleRestore = async () => {
    try {
      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_archived: false },
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
    }
  };

  return (
    <section className="px-4 pb-4">
      <p className="text-copy-lighter text-center mb-4">
        Restore this link to your LinkChain
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
          onClick={handleRestore}
        >
          {isUpdatingLink ? (
            <Loader2 />
          ) : (
            <>
              <ArchiveRestore /> <span>Restore</span>
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default LinkArchivedRestoreForm;

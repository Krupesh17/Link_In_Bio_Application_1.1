import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useUpdateLink } from "@/tanstack-query/queries";
import { Switch } from "./ui/switch";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkGroupItemPublishSwitch = ({ linkData, setLoading }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [linkVisibility, setLinkVisibility] = useState(
    linkData ? linkData?.link_published : false
  );

  const { mutateAsync: updateLink } = useUpdateLink();

  const handleLinkVisibility = async (value) => {
    try {
      setLinkVisibility(value);
      setLoading(true);

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_published: value },
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
        title: "Oops! Link Visibility Update Failed",
        description:
          "Visibility change failed due to a system issue. Refresh and try again.",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch checked={linkVisibility} onCheckedChange={handleLinkVisibility} />
  );
};

export default LinkGroupItemPublishSwitch;

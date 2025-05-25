import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVertical } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Switch } from "./ui/switch";
import { useUpdateSocialChannel } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateSocialChannelsData } from "@/redux/features/dashboardSlice";

const SocialIconDragDropReorderingListItem = ({
  socialChannelLocalData,
  socialChannelFetchedData,
  setFormState,
  setSocialChannelsUpdating,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { socialChannels } = useSelector((state) => state?.dashboard);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: socialChannelFetchedData?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [socialChannelVisibility, setSocialChannelVisibility] = useState(
    socialChannelFetchedData
      ? socialChannelFetchedData?.social_channel_visible
      : true
  );

  const { mutateAsync: updateSocialChannel } = useUpdateSocialChannel();

  const handleEditSocialChannelFormState = (
    socialChannelLocalData,
    socialChannelFetchedData
  ) => {
    setFormState({
      step: 3,
      addIconFormData: {
        name: socialChannelLocalData?.name,
        slug: socialChannelLocalData?.slug,
        placeholder: socialChannelLocalData?.placeholder,
        example: socialChannelLocalData?.example,
        form_type: "update",
        form_value: socialChannelFetchedData?.social_channel_value,
        social_channel_id: socialChannelFetchedData?.id,
        validation: socialChannelLocalData?.validation,
      },
    });
  };

  const handleSocialChannelVisibility = async (value) => {
    try {
      setSocialChannelVisibility(value);
      setSocialChannelsUpdating(true);

      const response = await updateSocialChannel({
        social_channel_id: socialChannelFetchedData?.id,
        data_object: { social_channel_visible: value },
      });

      const indexOfObjectToBeReplaced = await socialChannels?.findIndex(
        (item) => item?.id === response[0]?.id
      );

      const updatedSocialChannels = [...socialChannels];
      updatedSocialChannels.splice(indexOfObjectToBeReplaced, 1, {
        ...socialChannels[indexOfObjectToBeReplaced],
        social_channel_visible: value,
      });

      dispatch(updateSocialChannelsData(updatedSocialChannels));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Social Icon Visibility Update Failed",
        description:
          "Visibility change failed due to a system issue. Refresh and try again.",
      });
      console.error(error.message);
    } finally {
      setSocialChannelsUpdating(false);
    }
  };

  return (
    <li
      style={style}
      className="w-full flex items-center gap-1.5 rounded-md text-sm"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing shrink-0"
      >
        <DotsSixVertical size={20} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="px-2 w-full justify-normal"
        onClick={() =>
          handleEditSocialChannelFormState(
            socialChannelLocalData,
            socialChannelFetchedData
          )
        }
      >
        <div className="flex items-center justify-between gap-2.5 w-full">
          {socialChannelLocalData?.icon}
          <span className="mr-auto">{socialChannelLocalData?.name}</span>

          <Pencil size={24} strokeWidth={1} />
        </div>
      </Button>

      <Switch
        checked={socialChannelVisibility}
        onCheckedChange={handleSocialChannelVisibility}
      />
    </li>
  );
};

export default SocialIconDragDropReorderingListItem;

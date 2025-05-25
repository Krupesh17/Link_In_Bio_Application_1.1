import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocialIconDragDropReorderingListItem } from ".";
import { socialChannelList as localSocialChannelList } from "@/resources/appData";
import { ScrollArea } from "./ui/scroll-area";
import { updateSocialChannelsData } from "../redux/features/dashboardSlice";
import { debounce } from "lodash";
import { useUpsertSocialChannel } from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";

const SocialIconDragDropReorderingList = ({
  setFormState,
  setSocialChannelsUpdating,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { socialChannels: fetchedSocialChannels, isLoading } = useSelector(
    (state) => state?.dashboard
  );

  const { mutateAsync: upsertSocialChannel } = useUpsertSocialChannel();

  const debouncedUpdateSocialChannelIconsPosition = useCallback(
    debounce(async (reorderedSocialChannels) => {
      try {
        setSocialChannelsUpdating(true);
        const response = await upsertSocialChannel(reorderedSocialChannels);
        dispatch(updateSocialChannelsData(response));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops! Social Icon Reordering Failed",
          description: "Unable to reorder social icons. Please try again.",
        });
        console.error(error?.message);
      } finally {
        setSocialChannelsUpdating(false);
      }
    }, 1000),
    []
  );

  const getSocialChannelPosition = (id) => {
    return fetchedSocialChannels.findIndex(
      (socialChannel) => socialChannel.id === id
    );
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const originalPosition = getSocialChannelPosition(active.id);
    const newPosition = getSocialChannelPosition(over.id);
    
    const socialChannelArrayMove = arrayMove(
      fetchedSocialChannels,
      originalPosition,
      newPosition
    );

    const reorderedSocialChannelsPosition = socialChannelArrayMove?.map(
      (socialChannel, index) => {
        return { ...socialChannel, social_channel_index: index };
      }
    );

    dispatch(updateSocialChannelsData(reorderedSocialChannelsPosition));

    debouncedUpdateSocialChannelIconsPosition(reorderedSocialChannelsPosition);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <ScrollArea
      className={`max-h-64 w-full ${
        !isLoading && fetchedSocialChannels && "mb-4"
      } `}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {!isLoading && fetchedSocialChannels && (
          <ul className="flex flex-col gap-2">
            <SortableContext
              items={fetchedSocialChannels}
              strategy={verticalListSortingStrategy}
            >
              {fetchedSocialChannels?.map((fetchedSocialChannel) => {
                const localSocialChannelData =
                  localSocialChannelList.find((item) =>
                    item.slug.includes(
                      fetchedSocialChannel?.social_channel_slug
                    )
                  ) || {};

                return (
                  <SocialIconDragDropReorderingListItem
                    key={fetchedSocialChannel?.id}
                    socialChannelLocalData={localSocialChannelData}
                    socialChannelFetchedData={fetchedSocialChannel}
                    setFormState={setFormState}
                    setSocialChannelsUpdating={setSocialChannelsUpdating}
                  />
                );
              })}
            </SortableContext>
          </ul>
        )}
      </DndContext>
    </ScrollArea>
  );
};

export default SocialIconDragDropReorderingList;

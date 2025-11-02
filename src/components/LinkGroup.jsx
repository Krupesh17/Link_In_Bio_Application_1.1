import React, { useCallback } from "react";
import { LinkChainPlaceholderIcon, LinkGroupItem } from ".";
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
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateLinksData } from "@/redux/features/dashboardSlice";
import { useUpsertLink } from "@/tanstack-query/queries";
import { debounce } from "lodash";

const LinkGroup = ({ setLinksNewPositionUpdating }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { links: fetchedLinks, isLoading } = useSelector(
    (state) => state.dashboard
  );

  const { mutateAsync: upsertLink } = useUpsertLink();

  const debouncedUpdateLinksPosition = useCallback(
    debounce(async (reorderedLinks) => {
      try {
        setLinksNewPositionUpdating(true);
        const response = await upsertLink(reorderedLinks);
        dispatch(updateLinksData(response));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops! Link Reordering Failed",
          description: "Unable to reorder links. Please try again.",
        });
        console.error(error?.message);
      } finally {
        setLinksNewPositionUpdating(false);
      }
    }, 1000),
    []
  );

  const getLinkPosition = (id) => {
    return fetchedLinks?.findIndex((link) => link.id === id) ?? -1;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const originalPosition = getLinkPosition(active.id);
    const newPosition = getLinkPosition(over.id);

    if (originalPosition === -1 || newPosition === -1) return;

    const linksArrayMove = arrayMove(
      fetchedLinks,
      originalPosition,
      newPosition
    );

    const reorderedLinksPosition = linksArrayMove?.map((link, index) => {
      return { ...link, link_index: index };
    });

    dispatch(updateLinksData(reorderedLinksPosition));

    debouncedUpdateLinksPosition(reorderedLinksPosition);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Ensure fetchedLinks is always an array
  const links = Array.isArray(fetchedLinks) ? fetchedLinks : [];
  const activeLinks = links.filter((link) => link?.link_archived === false);

  return (
    <section className="max-w-[650px] mx-auto mb-5">
      {!isLoading && !activeLinks.length ? (
        <section className="max-w-[400px] mx-auto p-4">
          <LinkChainPlaceholderIcon className="h-32 w-32 mx-auto text-copy-lighter/20" />

          <h3 className="text-center font-semibold max-w-60 mx-auto mt-4 text-copy-lighter/40">
            Make your presence known. Drop a link and get started!
          </h3>
        </section>
      ) : (
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          {!isLoading && links.length > 0 && (
            <ul className="flex flex-col gap-4">
              <SortableContext
                items={links}
                strategy={verticalListSortingStrategy}
              >
                {links.map((link) => {
                  if (link?.link_archived) return null;
                  return <LinkGroupItem key={link?.id} linkData={link} />;
                })}
              </SortableContext>
            </ul>
          )}
        </DndContext>
      )}
    </section>
  );
};

export default LinkGroup;
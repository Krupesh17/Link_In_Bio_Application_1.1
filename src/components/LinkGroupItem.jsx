import React, { useState } from "react";
import { DotsSixVertical } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  LinkGroupItemActionButtonBox,
  LinkGroupItemActionExtension,
  LinkGroupItemPublishSwitch,
} from ".";
import { LinkTitleURLUpdateForm } from "./forms";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LinkGroupItem = ({ linkData }) => {
  const [isLoading, setLoading] = useState(false);
  const [visibleActionExtension, setVisibleActionExtension] = useState(false);
  const [actionState, setActionState] = useState(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: linkData?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      style={style}
      className="bg-background border border-border rounded-md overflow-hidden"
    >
      <section className="relative p-4 flex items-center gap-2">
        {isLoading && (
          <Loader2
            size={16}
            className="animate-spin absolute top-2 left-2 text-copy-light"
          />
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="hover:cursor-grab active:cursor-grabbing shrink-0"
        >
          <DotsSixVertical size={20} />
        </Button>

        <div className="w-full">
          <div className="flex items-center gap-2 mb-2">
            <LinkTitleURLUpdateForm
              linkData={linkData}
              setLoading={setLoading}
            />

            <LinkGroupItemPublishSwitch
              linkData={linkData}
              setLoading={setLoading}
            />
          </div>

          <LinkGroupItemActionButtonBox
            visible={visibleActionExtension}
            setVisible={setVisibleActionExtension}
            actionState={actionState}
            setActionState={setActionState}
            linkData={linkData}
          />
        </div>
      </section>

      <LinkGroupItemActionExtension
        linkData={linkData}
        visible={visibleActionExtension}
        setVisible={setVisibleActionExtension}
        setLoading={setLoading}
        actionState={actionState}
        setActionState={setActionState}
      />
    </li>
  );
};

export default LinkGroupItem;

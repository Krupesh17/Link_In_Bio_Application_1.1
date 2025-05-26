import React from "react";
import { Button } from "./ui/button";
import { ArchiveRestore, Trash2 } from "lucide-react";

// Here I should add analytics button in future. 

const LinkArchiveGroupItemActionButtonBox = ({
  visible,
  setVisible,
  actionState,
  setActionState,
}) => {
  const handleActionButtonClick = ({ action_form_title, action_form_slug }) => {
    if (visible && actionState?.action_form_slug === action_form_slug) {
      setVisible(false);
      setActionState(null);
    } else {
      setVisible(true);
      setActionState({
        action_form_title: action_form_title,
        action_form_slug: action_form_slug,
      });
    }
  };

  const linkArchiveItemActionButtons = [
    {
      name: "Restore",
      slug: "restore",
      icon: <ArchiveRestore strokeWidth={1.5} />,
      className: `${
        visible && actionState?.action_form_slug === "restore" && "bg-accent"
      }`,
      handleOnClick: () =>
        handleActionButtonClick({
          action_form_title: "Restore",
          action_form_slug: "restore",
        }),
    },
    {
      name: "Delete",
      slug: "delete",
      icon: <Trash2 strokeWidth={1.5} />,
      className: `${
        visible && actionState?.action_form_slug === "delete" && "bg-accent"
      }`,
      handleOnClick: () =>
        handleActionButtonClick({
          action_form_title: "Delete",
          action_form_slug: "delete",
        }),
    },
  ];

  return (
    <div className="flex items-center gap-1">
      <ul className="w-full flex items-center gap-1">
        {linkArchiveItemActionButtons?.map((actionButton, index) => (
          <li key={index}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`shrink-0 ${actionButton?.className}`}
              onClick={actionButton?.handleOnClick}
            >
              {actionButton?.icon}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkArchiveGroupItemActionButtonBox;

import React from "react";
import {
  Image,
  LayoutDashboard,
  LockKeyhole,
  MousePointerClick,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";

// Work on this other action buttons and their form's. Maybe start working on "Lock" Feature.
const LinkGroupItemActionButtonBox = ({
  visible,
  setVisible,
  actionState,
  setActionState,
  linkData,
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

  const linkItemActionButtons = [
    {
      name: "Layout",
      slug: "layout",
      icon: <LayoutDashboard strokeWidth={1.5} />,
      className: `${
        visible &&
        actionState?.action_form_slug === "link_layout" &&
        "bg-accent"
      }`,
      handleOnClick: () =>
        handleActionButtonClick({
          action_form_title: "Layout",
          action_form_slug: "link_layout",
        }),
    },
    {
      name: "Thumbnail",
      slug: "thumbnail",
      icon: <Image strokeWidth={1.5} />,
      className: `${
        visible &&
        actionState?.action_form_slug === "link_thumbnail" &&
        "bg-accent"
      } ${
        (linkData?.link_thumbnail_url || linkData?.link_thumbnail_icon) &&
        "text-success"
      }`,
      handleOnClick: () =>
        handleActionButtonClick({
          action_form_title: "Add Thumbnail",
          action_form_slug: "link_thumbnail",
        }),
    },
    {
      name: "Lock",
      slug: "lock",
      icon: <LockKeyhole strokeWidth={1.5} />,
      className: `${
        visible && actionState?.action_form_slug === "link_lock" && "bg-accent"
      } ${
        (linkData?.link_lock_sensitive_content ||
          linkData?.link_lock_date_of_birth) &&
        "text-success"
      }`,
      handleOnClick: () =>
        handleActionButtonClick({
          action_form_title: "Link Lock",
          action_form_slug: "link_lock",
        }),
    },
    {
      name: "Clicks",
      slug: "clicks",
      icon: <MousePointerClick strokeWidth={1.5} />,
      className: ``,
      handleOnClick: () => console.log("Clicks"),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <ul className="w-full flex items-center gap-1">
        {linkItemActionButtons?.map((actionButton, index) => (
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

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`shrink-0 ${
          visible &&
          actionState?.action_form_slug === "link_delete_archive" &&
          "bg-accent"
        }`}
        onClick={() => {
          handleActionButtonClick({
            action_form_title: "Delete",
            action_form_slug: "link_delete_archive",
          });
        }}
      >
        <Trash2 strokeWidth={1} />
      </Button>
    </div>
  );
};

export default LinkGroupItemActionButtonBox;

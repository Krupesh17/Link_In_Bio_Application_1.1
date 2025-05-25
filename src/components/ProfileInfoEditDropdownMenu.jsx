import React from "react";
import { Image, MoreHorizontal, User, Waypoints } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const editMenuDropdownItemList = [
  {
    menuItemIcon: <Image />,
    menuItemName: "Edit profile image",
    menuItemSlug: "edit-profile-image",
  },
  {
    menuItemIcon: <User />,
    menuItemName: "Edit display name and bio",
    menuItemSlug: "edit-display-name-and-bio",
  },
  {
    menuItemIcon: <Waypoints />,
    menuItemName: "Edit social icons",
    menuItemSlug: "edit-social-icons",
  },
];

const ProfileInfoEditDropdownMenu = ({
  setSocialIconsDialogOpen,
  setEditDisplayNameBioDialogOpen,
  setEditProfileImageDialogOpen,
}) => {
  const handleMenuItemClick = (menuItemSlug) => {
    switch (menuItemSlug) {
      case "edit-profile-image":
        setEditProfileImageDialogOpen(true);
        break;
      case "edit-display-name-and-bio":
        setEditDisplayNameBioDialogOpen(true);
        break;
      case "edit-social-icons":
        setSocialIconsDialogOpen(true);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="rounded-full shrink-0 max-sm:w-8 max-sm:h-8"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          {editMenuDropdownItemList.map((item, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="h-10"
                onClick={() => handleMenuItemClick(item.menuItemSlug)}
              >
                {item.menuItemIcon}
                <span>{item.menuItemName}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfoEditDropdownMenu;

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Loader2, LogOut, Moon, Sun, SwatchBook, User } from "lucide-react";
import { AccountAvatar } from ".";
import { useNavigate } from "react-router-dom";
import { useSignOut, useUpdateUserProfile } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "./ui/switch";
import { updateProfileData } from "@/redux/features/userSlice";

const dropDownMenuItemList = [
  {
    menuItemIcon: <User />,
    menuItemName: "Account",
    menuItemSlug: "account",
  },
];

const AccountDropdownMenu = () => {
  const { profile } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);
  const [isDarkModeActive, setDarkModeActive] = useState(
    profile?.dark_mode_status
  );

  const { mutateAsync: signOut, isPending: isSignOutPending } = useSignOut();
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error.message);
      toast({
        variant: "destructive",
        title: "Oops! Sign Out Failed",
        description: error.message,
      });
    }
  };

  const handleThemeToggleSwitch = async (value) => {
    try {
      setDarkModeActive(value);
      setLoading(true);

      const response = await updateUserProfile({
        user_profile_data: { dark_mode_status: value },
        user_profile_id: profile?.id,
      });

      if (!response?.length) {
        throw new Error("Something went wrong while updating dashboard theme.");
      }

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Dashboard Theme Update Failed",
        description:
          "Dashboard theme change failed due to a system issue. Please try again.",
      });
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="icon" className="w-10 h-10 rounded-full">
          <AccountAvatar
            name={profile?.name}
            username={profile?.username}
            profileImageURL={profile?.profile_image_url}
            className="bg-black"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="flex items-center gap-2 relative">
          <AccountAvatar
            name={profile?.name}
            username={profile?.username}
            profileImageURL={profile?.profile_image_url}
            className="bg-black"
          />
          <div>
            <h4 className="text-sm font-semibold">{profile?.name}</h4>
            <small className="text-xs text-copy-lighter flex items-center gap-1">
              @{profile?.username}
            </small>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropDownMenuItemList.map((item, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="h-10"
                onClick={() => navigate(item.menuItemSlug)}
              >
                {item.menuItemIcon}
                <span>{item.menuItemName}</span>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem
            className="h-10"
            onSelect={(e) => e.preventDefault()}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : profile?.dark_mode_status ? (
              <Moon />
            ) : (
              <Sun />
            )}
            <span className="mr-auto">Dark Mode</span>
            <Switch
              checked={isDarkModeActive}
              onCheckedChange={handleThemeToggleSwitch}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="h-10">
          {isSignOutPending ? <Loader2 className="animate-spin" /> : <LogOut />}
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdownMenu;

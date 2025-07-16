import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, LogOut, ReceiptText, User } from "lucide-react";
import { AccountAvatar } from ".";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "@/tanstack-query/queries";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const dropDownMenuItemList = [
  {
    menuItemIcon: <User />,
    menuItemName: "Account",
    menuItemSlug: "account",
  },
];

const AccountDropdownMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { profile } = useSelector((state) => state.user);

  const { mutateAsync: signOut, isPending: isSignOutPending } = useSignOut();

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

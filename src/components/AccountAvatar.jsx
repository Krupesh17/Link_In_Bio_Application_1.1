import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const AccountAvatar = ({ className }) => {
  const { profile } = useSelector((state) => state.user);

  return (
    <Avatar className={`border border-border ${className}`}>
      <AvatarImage
        src={profile?.profile_image_url}
        alt={profile?.username}
        className="object-cover"
      />
      <AvatarFallback className="text-2xl text-white bg-black">
        {profile?.name?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AccountAvatar;

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AccountAvatar = ({
  username,
  name,
  profileImageURL,
  className,
  ...props
}) => {
  return (
    <Avatar className={`border border-border ${className}`} {...props}>
      <AvatarImage
        src={profileImageURL}
        alt={username}
        className="object-cover"
      />
      <AvatarFallback className="text-2xl text-white bg-inherit rounded-[inherit]">
        {name?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AccountAvatar;

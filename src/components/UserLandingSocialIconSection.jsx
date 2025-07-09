import React from "react";
import { socialChannelList } from "@/resources/appData";
import { Button } from "./ui/button";

const UserLandingSocialIconSection = ({ socialChannels }) => {
  return (
    <>
      {socialChannels.length > 0 && (
        <ul className="flex items-center justify-center flex-wrap gap-2.5 mt-5">
          {socialChannels.map((socialChannel) => {
            if (!socialChannel?.social_channel_visible) return null;
            const socialIcon =
              socialChannelList.find((item) => {
                return item.slug.includes(socialChannel?.social_channel_slug);
              }) || {};

            return (
              <li key={socialChannel?.id} className="flex items-center">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 [&_svg]:size-8 hover:bg-transparent hover:text-inherit hover:scale-105 focus-visible:scale-105"
                  onClick={() => {
                    socialIcon?.onClick(socialChannel?.social_channel_value);
                  }}
                >
                  {socialIcon?.icon}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default UserLandingSocialIconSection;

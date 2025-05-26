import React from "react";
import { socialChannelList } from "@/resources/appData";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const SocialIconBox = ({ setSocialIconsDialogOpen }) => {
  const { socialChannels, isLoading } = useSelector(
    (state) => state?.dashboard
  );

  return (
    <div className="flex items-center max-w-[20rem]">
      <ul className="text-copy-lighter/40 flex items-center flex-wrap gap-2.5 mr-2.5">
        {!isLoading && socialChannels.length > 0
          ? socialChannels?.map((socialChannel) => {
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
                    className="h-6 w-6 text-copy [&_svg]:size-6"
                    onClick={() => {
                      setSocialIconsDialogOpen(true);
                      setSocialIconsFormState({
                        step: 3,
                        addIconFormData: {
                          name: socialIcon?.name,
                          slug: socialIcon?.slug,
                          placeholder: socialIcon?.placeholder,
                          example: socialIcon?.example,
                          form_type: "update",
                          form_value: socialChannel?.social_channel_value,
                          social_channel_id: socialChannel?.id,
                          validation: socialIcon?.validation,
                        },
                      });
                    }}
                  >
                    {socialIcon?.icon}
                  </Button>
                </li>
              );
            })
          : socialChannelList.slice(0, 5).map((item, index) => (
              <li
                key={index}
                className="hover:cursor-pointer"
                onClick={() => setSocialIconsDialogOpen(true)}
              >
                {item?.icon}
              </li>
            ))}

        {socialChannelList.length > socialChannels.length && (
          <li>
            <Button
              variant="secondary"
              size="icon"
              className="w-6 h-6 shrink-0 [&_svg]:size-4"
              onClick={() => setSocialIconsDialogOpen(true)}
            >
              <Plus weight="bold" />
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SocialIconBox;

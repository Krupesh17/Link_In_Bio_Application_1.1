import React, { useEffect, useState } from "react";
import {
  useGetAppearanceByUsername,
  useGetLinksByUsername,
  useGetSocialChannelsByUsername,
  useGetUserProfileByUsername,
} from "@/tanstack-query/queries";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserLandingContentProtectionSection,
  UserLandingLinkButtonSection,
  UserLandingPrivatePageSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from "@/components";

const UserLanding = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [contentProtectionStatus, setContentProtectionStatus] = useState(false);

  const {
    data: userProfileData,
    isPending: isUserProfileDataLoading,
    isError: isUserProfileError,
  } = useGetUserProfileByUsername(username);

  const {
    data: appearanceData,
    isPending: isAppearanceDataLoading,
    isError: isAppearanceError,
  } = useGetAppearanceByUsername(username);

  const { data: socialChannels, isPending: isSocialChannelsLoading } =
    useGetSocialChannelsByUsername(username);

  const { data: linksData, isPending: isLinksDataLoading } =
    useGetLinksByUsername(username);

  const getPageBackgroundStyle = () => {
    let backgroundStyle;
    if (appearanceData?.hero_profile_layout_wallpaper_setup) {
      backgroundStyle =
        appearanceData?.hero_profile_layout_wallpaper_setup?.style;
    } else {
      backgroundStyle = appearanceData?.wallpaper_setup?.style;
    }

    return { color: appearanceData?.font_color, ...backgroundStyle };
  };

  useEffect(() => {
    if (
      (!isUserProfileDataLoading && (!userProfileData || isUserProfileError)) ||
      (!isAppearanceDataLoading && (!appearanceData || isAppearanceError))
    ) {
      navigate("/404", { replace: true });
      return;
    }
  }, [
    userProfileData,
    isUserProfileDataLoading,
    isUserProfileError,
    appearanceData,
    isAppearanceDataLoading,
    isAppearanceError,
    navigate,
  ]);

  useEffect(() => {
    if (userProfileData) {
      if (
        userProfileData?.sensitive_content_page_protection ||
        userProfileData?.age_restriction_page_protection
      ) {
        setContentProtectionStatus(true);
      } else {
        setContentProtectionStatus(false);
      }
    }
  }, [userProfileData]);

  return isAppearanceDataLoading || isUserProfileDataLoading ? (
    <div className="flex items-center justify-center w-full h-dvh">
      <Loader2 size={24} className="animate-spin" />
    </div>
  ) : userProfileData?.profile_page_visibility_status === "private" ? (
    <UserLandingPrivatePageSection />
  ) : (
    <div
      className="w-full h-dvh overflow-hidden"
      style={getPageBackgroundStyle()}
    >
      {contentProtectionStatus ? (
        <UserLandingContentProtectionSection
          userProfileData={userProfileData}
          setContentProtectionStatus={setContentProtectionStatus}
        />
      ) : (
        <div className="w-full h-full overflow-y-auto">
          <div className="max-w-[500px] h-full mx-auto">
            <UserLandingProfileInfoSection
              userProfileData={userProfileData}
              profileLayoutData={{
                layout: appearanceData?.profile_image_layout || "classic",
                dominatingColor:
                  appearanceData?.hero_profile_layout_wallpaper_setup?.color,
              }}
            />

            {!isSocialChannelsLoading &&
              appearanceData?.social_icons_position === "top" &&
              userProfileData?.profile_social_icons_visible && (
                <UserLandingSocialIconSection socialChannels={socialChannels} />
              )}

            {!isLinksDataLoading && (
              <UserLandingLinkButtonSection
                linksData={linksData}
                buttonAppearance={appearanceData?.button_setup}
              />
            )}

            {!isSocialChannelsLoading &&
              appearanceData?.social_icons_position === "bottom" &&
              userProfileData?.profile_social_icons_visible && (
                <UserLandingSocialIconSection socialChannels={socialChannels} />
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLanding;

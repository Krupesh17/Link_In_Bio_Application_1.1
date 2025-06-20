import React, { useEffect } from "react";
import {
  useGetAppearanceByUsername,
  useGetLinksByUsername,
  useGetSocialChannelsByUsername,
  useGetUserProfileByUsername,
} from "@/tanstack-query/queries";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserLandingLinkButtonSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from "@/components";

const UserLanding = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  // I have to add invalidate query code which fetches user's LinkChain data in
  // 'updateProfileData'(Didn't Exist Yet) function from 'userSlice'.

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

  return isAppearanceDataLoading || isUserProfileDataLoading ? (
    <div className="flex items-center justify-center w-full h-dvh">
      <Loader2 size={24} className="animate-spin" />
    </div>
  ) : (
    <div
      className="w-full h-dvh overflow-hidden"
      style={getPageBackgroundStyle()}
    >
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
            appearanceData?.social_icons_position === "top" && (
              <UserLandingSocialIconSection socialChannels={socialChannels} />
            )}

          {!isLinksDataLoading && (
            <UserLandingLinkButtonSection
              linksData={linksData}
              buttonAppearance={appearanceData?.button_setup}
            />
          )}

          {!isSocialChannelsLoading &&
            appearanceData?.social_icons_position === "bottom" && (
              <UserLandingSocialIconSection socialChannels={socialChannels} />
            )}
        </div>
      </div>
    </div>
  );
};

export default UserLanding;

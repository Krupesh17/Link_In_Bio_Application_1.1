import React from "react";
import { useSelector } from "react-redux";
import {
  UserLandingLinkButtonSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from ".";

const MobilePreview = () => {
  const { profile } = useSelector((state) => state?.user);
  const { appearance, socialChannels, links } = useSelector(
    (state) => state?.dashboard
  );

  const getPageBackgroundStyle = () => {
    let backgroundStyle;
    if (appearance?.hero_profile_layout_wallpaper_setup) {
      backgroundStyle = appearance?.hero_profile_layout_wallpaper_setup?.style;
    } else {
      backgroundStyle = appearance?.wallpaper_setup?.style;
    }

    return { color: appearance?.font_color, ...backgroundStyle };
  };

  return (
    <div className="relative flex aspect-[393/852] max-h-[100vh] w-[340px] max-w-[394px] scale-[1] flex-col items-center gap-10 md:min-w-[394px] md:scale-[0.45] lg:scale-[0.6] xl:scale-[0.7] [@media(min-width:1536px)_and_(min-height:1000px)]:scale-[0.85] [@media(min-width:1536px)_and_(min-height:1200px)]:scale-[0.9]">
      <div className="h-full w-full">
        <div className="relative h-full w-full overflow-hidden bg-background shadow-[0_121px_49px_#00000005,0_68px_41px_#00000014,0_30px_30px_#00000024,0_8px_17px_#00000029] rounded-[3rem] border-[8px] border-[#000000]">
          <div className="relative h-full w-full">
            <div
              className="h-full w-full overflow-y-auto custom-scrollable-div"
              style={getPageBackgroundStyle()}
            >
              <UserLandingProfileInfoSection
                userProfileData={profile}
                profileLayoutData={{
                  layout: appearance?.profile_image_layout || "classic",
                  dominatingColor:
                    appearance?.hero_profile_layout_wallpaper_setup?.color,
                }}
              />

              {appearance?.social_icons_position === "top" &&
                profile?.profile_social_icons_visible && (
                  <UserLandingSocialIconSection
                    socialChannels={socialChannels}
                  />
                )}

              <UserLandingLinkButtonSection
                linksData={links}
                buttonAppearance={appearance?.button_setup}
              />

              {appearance?.social_icons_position === "bottom" &&
                profile?.profile_social_icons_visible && (
                  <UserLandingSocialIconSection
                    socialChannels={socialChannels}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;

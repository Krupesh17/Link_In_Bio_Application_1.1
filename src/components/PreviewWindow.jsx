import React from "react";
import { useSelector } from "react-redux";
import {
  UserLandingLinkButtonSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from ".";

const PreviewWindow = () => {
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
    <div
      className="absolute inset-0 bg-background z-30"
      style={getPageBackgroundStyle()}
    >
      <section className="w-full h-full overflow-y-auto">
        <div className="max-w-[500px] h-full mx-auto">
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
              <UserLandingSocialIconSection socialChannels={socialChannels} />
            )}

          <UserLandingLinkButtonSection
            linksData={links}
            buttonAppearance={appearance?.button_setup}
          />

          {appearance?.social_icons_position === "bottom" &&
            profile?.profile_social_icons_visible && (
              <UserLandingSocialIconSection socialChannels={socialChannels} />
            )}
        </div>
      </section>
    </div>
  );
};

export default PreviewWindow;

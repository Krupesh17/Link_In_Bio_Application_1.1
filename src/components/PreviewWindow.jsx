import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserLandingLinkSection,
  UserLandingProductSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from ".";
import Switcher from "./Switcher";
import { useLocation } from "react-router-dom";

const PreviewWindow = () => {
  const { profile } = useSelector((state) => state?.user);
  const { appearance, socialChannels, links } = useSelector(
    (state) => state?.dashboard
  );
  const { products } = useSelector((state) => state?.shop);

  const { pathname } = useLocation();

  const [isShopSectionActive, setShopSectionActive] = useState(false);

  const getPageBackgroundStyle = () => {
    let backgroundStyle;
    if (appearance?.hero_profile_layout_wallpaper_setup) {
      backgroundStyle = appearance?.hero_profile_layout_wallpaper_setup?.style;
    } else {
      backgroundStyle = appearance?.wallpaper_setup?.style;
    }

    return { color: appearance?.font_color, ...backgroundStyle };
  };

  const getShopVisibilityStatus = (products) => {
    try {
      if (!products) {
        throw new Error("Product's Data is missing. Please try again.");
      }

      if (products?.length === 0) {
        return false;
      }
      const filteredProductData = products?.filter((product) => {
        return product?.product_published === true;
      });

      if (filteredProductData?.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error?.message);
      return false;
    }
  };

  useEffect(() => {
    if (
      pathname === "/dashboard/shop" &&
      getShopVisibilityStatus(products) &&
      profile?.shop_published
    ) {
      setShopSectionActive(true);
    } else {
      setShopSectionActive(false);
    }
  }, [pathname, profile?.shop_published, products]);

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

          {getShopVisibilityStatus(products) && profile?.shop_published && (
            <section className="mt-4 w-full flex items-center">
              <Switcher
                isChecked={isShopSectionActive}
                setIsChecked={setShopSectionActive}
                backgroundColor={appearance?.button_setup?.button_color}
                color={appearance?.button_setup?.button_font_color}
                firstOption="Link"
                secondOption="Shop"
                className="mx-auto"
              />
            </section>
          )}

          {!isShopSectionActive && (
            <UserLandingLinkSection
              linksData={links}
              buttonAppearance={appearance?.button_setup}
            />
          )}

          {isShopSectionActive &&
            getShopVisibilityStatus(products) &&
            profile?.shop_published && (
              <UserLandingProductSection
                productsData={products}
                buttonAppearance={appearance?.button_setup}
              />
            )}

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

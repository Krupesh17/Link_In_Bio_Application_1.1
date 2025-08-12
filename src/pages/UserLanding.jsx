import React, { useEffect, useState } from "react";
import {
  useGetAppearanceByUsername,
  useGetLinksByUsername,
  useGetProductsByUsername,
  useGetSocialChannelsByUsername,
  useGetUserProfileByUsername,
} from "@/tanstack-query/queries";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserLandingContentProtectionSection,
  UserLandingLinkSection,
  UserLandingPrivatePageSection,
  UserLandingProductSection,
  UserLandingProfileInfoSection,
  UserLandingSocialIconSection,
} from "@/components";
import Switcher from "@/components/Switcher";
import { Button } from "@/components/ui/button";

const UserLanding = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [contentProtectionStatus, setContentProtectionStatus] = useState(false);
  const [isShopSectionActive, setShopSectionActive] = useState(false);

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

  const { data: productsData, isPending: isProductsDataLoading } =
    useGetProductsByUsername(username);

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

  useEffect(() => {
    if (userProfileData) {
      document.title = `${userProfileData?.name} - LinkChain`;
    } else {
      document.title = "LinkChain";
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
      className="relative w-full h-dvh overflow-hidden"
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

            {getShopVisibilityStatus(productsData) &&
              userProfileData?.shop_published && (
                <section className="mt-4 w-full flex items-center">
                  <Switcher
                    isChecked={isShopSectionActive}
                    setIsChecked={setShopSectionActive}
                    backgroundColor={appearanceData?.button_setup?.button_color}
                    color={appearanceData?.button_setup?.button_font_color}
                    firstOption="Link"
                    secondOption="Shop"
                    className="mx-auto"
                  />
                </section>
              )}

            {!isShopSectionActive && !isLinksDataLoading && (
              <UserLandingLinkSection
                linksData={linksData}
                buttonAppearance={appearanceData?.button_setup}
              />
            )}

            {isShopSectionActive &&
              getShopVisibilityStatus(productsData) &&
              userProfileData?.shop_published &&
              !isProductsDataLoading && (
                <UserLandingProductSection
                  productsData={productsData}
                  buttonAppearance={appearanceData?.button_setup}
                />
              )}

            {!isSocialChannelsLoading &&
              appearanceData?.social_icons_position === "bottom" &&
              userProfileData?.profile_social_icons_visible && (
                <UserLandingSocialIconSection socialChannels={socialChannels} />
              )}
          </div>

          <Button
            type="button"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 rounded-full text-black bg-white hover:bg-[#f2f2f2] hover:scale-105 focus-visible:scale-105"
            onClick={() => window.open(`${window.location.origin}/`, "_blank")}
          >
            <img
              src="/assets/icons/link_chain_logo.svg"
              className="w-6 h-6 shrink-0"
            />
            <span className="font-medium">Join LinkChain</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserLanding;

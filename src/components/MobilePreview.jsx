import React from "react";
import { useSelector } from "react-redux";
import AppearanceCustomButtons from "./AppearanceCustomButtons";

const MobilePreview = () => {
  const { appearance } = useSelector((state) => state?.dashboard);

  return (
    <div
      className="w-80 min-h-[640px] mx-auto p-2.5 rounded-[40px] border-[8px] border-black shadow-[0px_0px_40px_5px] shadow-border bg-background"
      style={
        appearance?.wallpaper_setup ? appearance?.wallpaper_setup?.style : null
      }
    >
      <AppearanceCustomButtons
        imageSource="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_Unsplash.svg/1200px-Logo_of_Unsplash.svg.png"
        variant={
          appearance?.button_setup?.button_type
            ? appearance?.button_setup?.button_type
            : "fill_flat"
        }
        backgroundColor={
          appearance?.button_setup?.button_color
            ? appearance?.button_setup?.button_color
            : "#3A4147"
        }
        foregroundColor={
          appearance?.button_setup?.button_font_color
            ? appearance?.button_setup?.button_font_color
            : "#FFFFFF"
        }
        shadowColor={
          appearance?.button_setup?.button_shadow
            ? appearance?.button_setup?.button_shadow
            : "#9CA0A3"
        }
      />
    </div>
  );
};

export default MobilePreview;

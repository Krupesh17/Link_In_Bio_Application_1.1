import React from "react";
import { useSelector } from "react-redux";

const MobilePreview = () => {
  const { appearance } = useSelector((state) => state?.dashboard);

  return (
    <div
      className="w-80 min-h-[640px] mx-auto rounded-[40px] border-[8px] border-black shadow-[0px_0px_40px_5px] shadow-border bg-background"
      style={
        appearance?.wallpaper_setup ? appearance?.wallpaper_setup?.style : null
      }
    ></div>
  );
};

export default MobilePreview;

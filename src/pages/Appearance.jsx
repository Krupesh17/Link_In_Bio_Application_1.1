import React from "react";
import {
  AppearanceButtonSection,
  AppearanceFontSection,
  AppearanceProfileSection,
  AppearanceWallpaperSection,
} from "@/components";

const Appearance = () => {
  return (
    <div>
      <AppearanceProfileSection />
      <AppearanceWallpaperSection />
      <AppearanceButtonSection />
      <AppearanceFontSection />
      {/* Hide the LinkChain logo */}
    </div>
  );
};

export default Appearance;

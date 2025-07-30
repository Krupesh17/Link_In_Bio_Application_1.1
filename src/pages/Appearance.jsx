import React, { useEffect } from "react";
import {
  AppearanceButtonSection,
  AppearanceFontSection,
  AppearanceProfileSection,
  AppearanceWallpaperSection,
} from "@/components";

const Appearance = () => {
  useEffect(() => {
    document.title = "Appearance - LinkChain";
  }, []);

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

import React from "react";
import {
  AppearanceButtonSection,
  AppearanceProfileSection,
  AppearanceWallpaperSection,
} from "@/components";

const Appearance = () => {
  return (
    <div>
      <AppearanceProfileSection />
      <AppearanceWallpaperSection />
      <AppearanceButtonSection />
    </div>
  );
};

export default Appearance;

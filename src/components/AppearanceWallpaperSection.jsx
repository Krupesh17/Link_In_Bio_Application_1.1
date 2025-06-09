import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppearanceWallpaperConfigForm } from "./forms";

const AppearanceWallpaperSection = () => {
  const [isWallpaperConfigUpdating, setWallpaperConfigUpdating] =
    useState(false);

  return (
    <section className="max-w-[650px] mx-auto mb-8">
      <h2 className="text-xl max-sm:text-lg font-semibold mb-2">
        Custom appearance
      </h2>
      <p className="text-base mb-4">
        Customize your LinkChain profile! Update your wallpaper with colors,
        gradients, or images, and choose a button style that fits your style.
      </p>

      <h2 className="text-xl max-sm:text-lg font-semibold flex items-center gap-2 mt-8 mb-4">
        Wallpaper
        {isWallpaperConfigUpdating && (
          <Loader2 size={20} className="text-copy-light animate-spin" />
        )}
      </h2>

      <div className="relative p-4 border border-border rounded-md bg-background">
        <AppearanceWallpaperConfigForm
          setWallpaperConfigUpdating={setWallpaperConfigUpdating}
        />
      </div>
    </section>
  );
};

export default AppearanceWallpaperSection;

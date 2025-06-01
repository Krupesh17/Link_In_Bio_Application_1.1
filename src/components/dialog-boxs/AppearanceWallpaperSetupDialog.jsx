import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  AppearanceWallpaperFlatColorForm,
  AppearanceWallpaperGradientForm,
  AppearanceWallpaperImageForm,
  AppearanceWallpaperSVGPatternForm,
} from "../forms";

const ColoredWallpaperSetupDialog = ({
  isDialogOpen,
  setDialogOpen,
  wallpaperType,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        {wallpaperType === "flat-color" && (
          <AppearanceWallpaperFlatColorForm setDialogOpen={setDialogOpen} />
        )}

        {wallpaperType === "gradient" && (
          <AppearanceWallpaperGradientForm setDialogOpen={setDialogOpen} />
        )}

        {wallpaperType === "image" && (
          <AppearanceWallpaperImageForm setDialogOpen={setDialogOpen} />
        )}

        {(wallpaperType === "polka" ||
          wallpaperType === "strips" ||
          wallpaperType === "zig-zag") && (
          <AppearanceWallpaperSVGPatternForm
            setDialogOpen={setDialogOpen}
            patternType={wallpaperType}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ColoredWallpaperSetupDialog;

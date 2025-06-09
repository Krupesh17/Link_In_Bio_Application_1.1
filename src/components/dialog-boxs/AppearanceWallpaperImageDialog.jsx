import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { AppearanceWallpaperImageForm } from "../forms";

const AppearanceWallpaperImageDialog = ({ isDialogOpen, setDialogOpen }) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <AppearanceWallpaperImageForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AppearanceWallpaperImageDialog;

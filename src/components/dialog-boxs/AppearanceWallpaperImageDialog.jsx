import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { AppearanceWallpaperImageForm } from "../forms";

const AppearanceWallpaperImageDialog = ({ 
  isDialogOpen, 
  setDialogOpen, 
  onImageUploadSuccess 
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <AppearanceWallpaperImageForm 
          setDialogOpen={setDialogOpen}
          onImageUploadSuccess={onImageUploadSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppearanceWallpaperImageDialog;
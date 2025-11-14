import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { AppearanceWallpaperImageForm } from "../forms";

const AppearanceWallpaperImageDialog = ({
  isDialogOpen,
  setDialogOpen,
  onImageUploadSuccess,
}) => {
  const [isDialogCloseBlock, setDialogCloseBlock] = useState(false);

  const handleDialogVisibility = (value) => {
    if (isDialogCloseBlock) return;
    setDialogOpen(value);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogVisibility}>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <AppearanceWallpaperImageForm
          setDialogOpen={setDialogOpen}
          onImageUploadSuccess={onImageUploadSuccess}
          isDialogCloseBlock={isDialogCloseBlock}
          setDialogCloseBlock={setDialogCloseBlock}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppearanceWallpaperImageDialog;

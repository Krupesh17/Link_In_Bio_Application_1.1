import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileDragDropBox } from "..";

const AddProductThumbnailImageDialog = ({
  isAddProductThumbnailImageDialogOpen,
  setAddProductThumbnailImageDialogOpen,
  file,
  setFile,
  imageURL,
  setImageURL,
}) => {
  return (
    <Dialog
      open={isAddProductThumbnailImageDialogOpen}
      onOpenChange={setAddProductThumbnailImageDialogOpen}
    >
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-copy text-center">
            Upload product image
          </DialogTitle>
        </DialogHeader>

        <FileDragDropBox
          file={file}
          setFile={setFile}
          imageURL={imageURL}
          setImageURL={setImageURL}
          afterImageCrop={() => setAddProductThumbnailImageDialogOpen(false)}
          terminateImageCrop={() => {
            setFile(null);
            setImageURL(null);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductThumbnailImageDialog;

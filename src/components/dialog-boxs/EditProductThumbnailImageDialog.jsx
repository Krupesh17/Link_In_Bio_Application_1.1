import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileDragDropBox } from "..";

const EditProductThumbnailImageDialog = ({
  isEditProductThumbnailImageDialogOpen,
  setEditProductThumbnailImageDialogOpen,
  file,
  setFile,
  imageURL,
  setImageURL,
  productData,
}) => {
  return (
    <Dialog
      open={isEditProductThumbnailImageDialogOpen}
      onOpenChange={() => {
        setFile(null);
        setImageURL(productData?.product_image_url);
        setEditProductThumbnailImageDialogOpen(false);
      }}
    >
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-copy text-center">
            Update product image
          </DialogTitle>
        </DialogHeader>

        <FileDragDropBox
          file={file}
          setFile={setFile}
          imageURL={imageURL}
          setImageURL={setImageURL}
          afterImageCrop={() => setEditProductThumbnailImageDialogOpen(false)}
          terminateImageCrop={() => {
            setFile(null);
            setImageURL(productData?.product_image_url);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductThumbnailImageDialog;

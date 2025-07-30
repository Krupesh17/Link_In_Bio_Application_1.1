import React from "react";
import { EditProductForm } from "../forms";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const EditProductDialog = ({
  isEditProductDialogOpen,
  setEditProductDialogOpen,
  productDataToBeUpdated,
  setProductDataToBeUpdated,
}) => {
  return (
    <Dialog
      open={isEditProductDialogOpen}
      onOpenChange={() => {
        setEditProductDialogOpen(false);
        setProductDataToBeUpdated(null);
      }}
    >
      <DialogContent aria-describedby={undefined} className="max-w-[600px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-copy text-center">
            Edit product details
          </DialogTitle>
        </DialogHeader>
        <EditProductForm
          productDataToBeUpdated={productDataToBeUpdated}
          setEditProductDialogOpen={setEditProductDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;

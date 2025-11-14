import React, { useState } from "react";
import { EditProductForm } from "../forms";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const EditProductDialog = ({
  isEditProductDialogOpen,
  setEditProductDialogOpen,
  productDataToBeUpdated,
  setProductDataToBeUpdated,
}) => {
  const [isDialogCloseBlock, setDialogCloseBlock] = useState(false);

  return (
    <Dialog
      open={isEditProductDialogOpen}
      onOpenChange={() => {
        if (isDialogCloseBlock) return;

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
          setDialogCloseBlock={setDialogCloseBlock}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;

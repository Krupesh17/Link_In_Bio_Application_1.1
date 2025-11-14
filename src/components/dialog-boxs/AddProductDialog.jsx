import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { InsertProductForm } from "../forms";

const AddProductDialog = ({
  isAddNewProductDialogOpen,
  setAddNewProductDialogOpen,
}) => {
  const [isDialogCloseBlock, setDialogCloseBlock] = useState(false);

  const handleAddNewProductDialogVisibility = (value) => {
    if (isDialogCloseBlock) return;
    setAddNewProductDialogOpen(value);
  };

  return (
    <Dialog
      open={isAddNewProductDialogOpen}
      onOpenChange={handleAddNewProductDialogVisibility}
    >
      <DialogContent aria-describedby={undefined} className="max-w-[600px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-copy text-center">
            Product details
          </DialogTitle>
        </DialogHeader>
        <InsertProductForm
          setAddNewProductDialogOpen={setAddNewProductDialogOpen}
          setDialogCloseBlock={setDialogCloseBlock}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

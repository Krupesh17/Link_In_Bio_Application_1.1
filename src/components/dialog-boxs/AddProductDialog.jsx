import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { InsertProductForm } from "../forms";

const AddProductDialog = ({
  isAddNewProductDialogOpen,
  setAddNewProductDialogOpen,
}) => {
  return (
    <Dialog
      open={isAddNewProductDialogOpen}
      onOpenChange={setAddNewProductDialogOpen}
    >
      <DialogContent aria-describedby={undefined} className="max-w-[600px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-copy text-center">
            Product details
          </DialogTitle>
        </DialogHeader>
        <InsertProductForm
          setAddNewProductDialogOpen={setAddNewProductDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

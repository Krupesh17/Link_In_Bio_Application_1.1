import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { AddProductDialog } from "./dialog-boxs";

const ShopAddProductSection = ({ isProductsNewPositionUpdating }) => {
  const [isAddNewProductDialogOpen, setAddNewProductDialogOpen] =
    useState(false);

  return (
    <>
      <AddProductDialog
        isAddNewProductDialogOpen={isAddNewProductDialogOpen}
        setAddNewProductDialogOpen={setAddNewProductDialogOpen}
      />

      <section className="max-w-[650px] mx-auto mt-8 mb-4">
        <h4 className="text-lg text-copy font-bold mb-1">Add Your Listings</h4>
        <p className="text-sm text-copy-lighter text-wrap mb-4">
          Promote products you're proud of. Share your listings from any
          e-commerce platform with just a few clicks.
        </p>

        <Button
          type="button"
          variant="contrast"
          className="w-full h-10 font font-semibold"
          onClick={() => setAddNewProductDialogOpen(true)}
        >
          <Plus className="text-contrast-foreground" /> <span>Add</span>
        </Button>

        {isProductsNewPositionUpdating && (
          <Loader2 className="animate-spin text-copy-lighter mt-4" />
        )}
      </section>
    </>
  );
};

export default ShopAddProductSection;

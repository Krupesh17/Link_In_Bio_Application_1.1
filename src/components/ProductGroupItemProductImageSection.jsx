import React from "react";
import { ImageOff, Pencil } from "lucide-react";
import { Button } from "./ui/button";

const ProductGroupItemProductImageSection = ({
  productData,
  setEditProductDialogOpen,
  setProductDataToBeUpdated,
}) => {
  return (
    <div className="group relative h-24 w-24 aspect-square mx-auto border border-border rounded-md overflow-hidden shrink-0 max-[480px]:h-40 max-[480px]:w-40">
      <div className="absolute inset-0 hidden group-hover:flex items-center justify-center rounded-md">
        <Button
          size="icon"
          className="bg-black/50 text-white hover:bg-black/50"
          onClick={() => {
            setProductDataToBeUpdated(productData);
            setEditProductDialogOpen(true);
          }}
        >
          <Pencil />
        </Button>
      </div>

      {productData?.product_image_url ? (
        <img
          src={productData?.product_image_url}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-accent">
          <ImageOff
            className="w-10 h-10 text-copy-lighter/50"
            strokeWidth={1}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGroupItemProductImageSection;

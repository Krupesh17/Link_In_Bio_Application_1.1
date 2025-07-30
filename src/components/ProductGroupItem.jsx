import React, { useState } from "react";
import { GripVertical, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ProductGroupItemProductImageSection,
  ProductGroupItemPublishDeleteButtonSection,
  ProductGroupItemTitlePriceSection,
} from ".";

const ProductGroupItem = ({
  productData,
  setEditProductDialogOpen,
  setProductDataToBeUpdated,
}) => {
  const [isLoading, setLoading] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: productData?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      style={style}
      className="relative flex items-center bg-background border border-border rounded-md overflow-hidden"
    >
      {isLoading && (
        <Loader2
          size={16}
          className="animate-spin absolute top-2 left-2 text-copy-light"
        />
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="text-copy-lighter hover:bg-transparent hover:cursor-grab active:cursor-grabbing shrink-0"
      >
        <GripVertical strokeWidth={1.5} size={20} />
      </Button>

      <div className="w-full h-full">
        <section className="flex gap-2 py-4 pr-4 min-[480px]:items-center max-[480px]:flex-col">
          <ProductGroupItemProductImageSection
            productData={productData}
            setEditProductDialogOpen={setEditProductDialogOpen}
            setProductDataToBeUpdated={setProductDataToBeUpdated}
          />

          <ProductGroupItemTitlePriceSection
            productData={productData}
            setEditProductDialogOpen={setEditProductDialogOpen}
            setProductDataToBeUpdated={setProductDataToBeUpdated}
          />

          <ProductGroupItemPublishDeleteButtonSection
            setLoading={setLoading}
            productData={productData}
          />
        </section>
      </div>
    </li>
  );
};

export default ProductGroupItem;

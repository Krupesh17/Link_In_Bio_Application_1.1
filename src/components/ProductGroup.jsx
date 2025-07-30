import React, { useCallback, useState } from "react";
import { ProductGroupItem } from ".";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useUpsertProduct } from "@/tanstack-query/queries";
import { updateProductsData } from "@/redux/features/shopSlice";
import { debounce } from "lodash";
import { EditProductDialog } from "./dialog-boxs";

const ProductGroup = ({ setProductsNewPositionUpdating }) => {
  const { products: fetchedProducts, isLoading } = useSelector(
    (state) => state?.shop
  );

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isEditProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [productDataToBeUpdated, setProductDataToBeUpdated] = useState({});

  const { mutateAsync: upsertProduct } = useUpsertProduct();

  const debouncedUpdateProductsPosition = useCallback(
    debounce(async (reorderedProducts) => {
      try {
        setProductsNewPositionUpdating(true);
        const response = await upsertProduct(reorderedProducts);
        dispatch(updateProductsData(response));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops! Product Reordering Failed",
          description: "Unable to reorder products. Please try again.",
        });
        console.error(error?.message);
      } finally {
        setProductsNewPositionUpdating(false);
      }
    }, 1000),
    []
  );

  const getProductPosition = (id) => {
    return fetchedProducts?.findIndex((product) => product?.id === id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const originalPosition = getProductPosition(active.id);
    const newPosition = getProductPosition(over.id);

    const productsArrayMove = arrayMove(
      fetchedProducts,
      originalPosition,
      newPosition
    );

    const reorderedProductsPosition = productsArrayMove?.map(
      (product, index) => {
        return { ...product, product_index: index };
      }
    );

    dispatch(updateProductsData(reorderedProductsPosition));

    debouncedUpdateProductsPosition(reorderedProductsPosition);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <>
      <EditProductDialog
        isEditProductDialogOpen={isEditProductDialogOpen}
        setEditProductDialogOpen={setEditProductDialogOpen}
        productDataToBeUpdated={productDataToBeUpdated}
        setProductDataToBeUpdated={setProductDataToBeUpdated}
      />

      <section className="max-w-[650px] mx-auto mb-5">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          {!isLoading && fetchedProducts && (
            <ul className="flex flex-col gap-4">
              <SortableContext
                items={fetchedProducts}
                strategy={verticalListSortingStrategy}
              >
                {fetchedProducts?.map((product) => {
                  return (
                    <ProductGroupItem
                      key={product?.id}
                      productData={product}
                      setEditProductDialogOpen={setEditProductDialogOpen}
                      setProductDataToBeUpdated={setProductDataToBeUpdated}
                    />
                  );
                })}
              </SortableContext>
            </ul>
          )}
        </DndContext>
      </section>
    </>
  );
};

export default ProductGroup;

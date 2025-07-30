import React, { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  useDeleteFile,
  useDeleteProduct,
  useUpdateProduct,
} from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateProductsData } from "@/redux/features/shopSlice";
import { Trash2 } from "lucide-react";

const ProductGroupItemPublishDeleteButtonSection = ({ productData, setLoading }) => {
  const { products } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [productVisibility, setProductVisibility] = useState(
    productData ? productData?.product_published : false
  );

  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProductImageFile } = useDeleteFile();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const handleProductVisibility = async (value) => {
    try {
      setProductVisibility(value);
      setLoading(true);

      const response = await updateProduct({
        product_id: productData?.id,
        data_object: { product_published: value },
      });

      const indexOfProductToBeUpdated = await products?.findIndex(
        (product) => product?.id === response?.at(0)?.id
      );

      const updatedProducts = [...products];
      updatedProducts?.splice(indexOfProductToBeUpdated, 1, response?.at(0));

      dispatch(updateProductsData(updatedProducts));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Product Visibility Update Failed",
        description:
          "Product visibility change failed due to a system issue. Refresh and try again.",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDelete = async () => {
    try {
      setLoading(true);
      if (!productData?.id) {
        throw new Error("Product Id is missing. Please try again.");
      }

      const path = productData?.product_image_url?.match(
        /users-storage-bucket\/(.+)/
      )[1];

      await deleteProductImageFile(path);

      const response = await deleteProduct(productData?.id);

      const indexOfProductToBeDeleted = await products?.findIndex(
        (product) => product?.id === response?.at(0)?.id
      );

      const updatedProducts = [...products];
      updatedProducts?.splice(indexOfProductToBeDeleted, 1);

      dispatch(updateProductsData(updatedProducts));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Product Deletion Failed",
        description:
          "The product couldn't be deleted due to a technical issue. Please try again.",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 min-[480px]:h-24 min-[480px]:flex-col max-[480px]:justify-end">
      <Switch
        checked={productVisibility}
        onCheckedChange={handleProductVisibility}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleProductDelete}
      >
        <Trash2 strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default ProductGroupItemPublishDeleteButtonSection;

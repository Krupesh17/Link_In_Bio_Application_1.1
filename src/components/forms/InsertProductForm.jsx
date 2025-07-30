import React, { useState } from "react";
import { Image, Loader2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { currencyList } from "../../resources/appData";
import { AddProductThumbnailImageDialog } from "../dialog-boxs";
import { useDispatch, useSelector } from "react-redux";
import { useInsertProduct, useUploadFile } from "@/tanstack-query/queries";
import { v4 as uuidV4 } from "uuid";
import { supabaseUrl } from "@/utils/supabase";
import { updateProductsData } from "@/redux/features/shopSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { insertProductValidation } from "@/validations";

const InsertProductForm = ({ setAddNewProductDialogOpen }) => {
  const { user, profile } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.shop);

  const [productTitleLength, setProductTitleLength] = useState(0);
  const [isProductImageError, setProductImageError] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [
    isAddProductThumbnailImageDialogOpen,
    setAddProductThumbnailImageDialogOpen,
  ] = useState(false);

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(insertProductValidation),
    defaultValues: {
      product_url: "",
      product_title: "",
      product_price: "",
      product_currency: "USD",
    },
  });

  const { mutateAsync: uploadProductImageFile } = useUploadFile();

  const { mutateAsync: insertProduct } = useInsertProduct();

  const handleSubmit = async (value) => {
    try {
      setLoading(true);

      if (!file && !imageURL) {
        setProductImageError(true);
        throw new Error(
          "Please ensure the product thumbnail image is provided before submitting the form."
        );
      }

      const image_id = uuidV4();

      await uploadProductImageFile({
        path: `${profile?.user_id}/product-thumbnail-images/${image_id}`,
        file: file,
      });

      const productImageURL = `${supabaseUrl}/storage/v1/object/public/users-storage-bucket/${profile?.user_id}/product-thumbnail-images/${image_id}`;

      const product_index = !products.length
        ? 0
        : Math.max(...products?.map((product) => product?.product_index)) + 1;

      const response = await insertProduct({
        user_id: user?.id,
        username: profile?.username,
        product_url: value?.product_url,
        product_title: value?.product_title,
        product_image_url: productImageURL,
        product_price: value?.product_price,
        product_currency: value?.product_currency,
        product_index: product_index,
      });

      dispatch(updateProductsData([...products, response[0]]));
      setAddNewProductDialogOpen(false);
    } catch (error) {
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductTitleInput = (e, field) => {
    let inputValue = e.target.value;
    if (inputValue.length > 250) {
      form.setError("product_title", {
        message: "Product title cannot be longer then 250 characters",
      });
    } else {
      field.onChange(inputValue);
      setProductTitleLength(inputValue.length);
    }

    if (inputValue.length < 250) {
      form.clearErrors("product_title");
    }
  };

  return (
    <>
      <AddProductThumbnailImageDialog
        isAddProductThumbnailImageDialogOpen={
          isAddProductThumbnailImageDialogOpen
        }
        setAddProductThumbnailImageDialogOpen={
          setAddProductThumbnailImageDialogOpen
        }
        file={file}
        setFile={setFile}
        imageURL={imageURL}
        setImageURL={setImageURL}
      />

      <section className="w-full">
        <div className="relative w-48 h-48 bg-background border border-border rounded-2xl mx-auto overflow-hidden mb-4">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="absolute bottom-2 right-2 text-copy-lighter rounded-full"
            onClick={() => {
              setAddProductThumbnailImageDialogOpen(true);
            }}
          >
            <Pencil />
          </Button>
          {imageURL ? (
            <img
              src={imageURL}
              alt="product_image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image size={80} strokeWidth={0.5} className="text-border" />
            </div>
          )}
        </div>

        {isProductImageError && (
          <p className="max-w-[280px] p-1 mx-auto text-xs text-center text-red-600 bg-red-600/10 rounded-md border border-red-600/20">
            Please ensure the product thumbnail image is provided before
            submitting the form.
          </p>
        )}
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="product_url"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="URL"
                    className="h-10 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-2">
            <FormField
              control={form.control}
              name="product_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    onChange={(e) => handleProductTitleInput(e, field)}
                  >
                    <Input
                      type="text"
                      placeholder="Title"
                      className="h-10 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-copy-light text-right mt-1">
              {productTitleLength}/250
            </p>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 mb-4 gap-2">
            <FormField
              control={form.control}
              name="product_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price{" "}
                    <span className="text-xs text-copy-lighter">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      className="h-10 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue("product_currency", value)
                      }
                      className="w-full"
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>

                      <SelectContent>
                        {currencyList?.map((item, index) => {
                          return (
                            <SelectItem
                              key={index}
                              className="hover:bg-accent"
                              value={`${item?.currency}`}
                            >
                              {`${item?.currency} (${item?.currency_symbol})`}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="contrast" className="h-10 w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Add Product"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default InsertProductForm;

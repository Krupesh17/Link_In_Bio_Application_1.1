import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { HEXCodeColorPicker } from "../HEXCodeColorPicker";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDeleteFile, useUpdateAppearance } from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { Loader2 } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { appearanceWallpaperColorValidation } from "@/validations";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const AppearanceWallpaperFlatColorForm = ({ setDialogOpen }) => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(appearanceWallpaperColorValidation),
    defaultValues: {
      color:
        !isLoading && appearance?.wallpaper_setup
          ? appearance?.wallpaper_setup?.color
          : "#FF0000",
    },
  });

  const {
    mutateAsync: deleteWallpaperImageFile,
    isPending: isWallpaperImageFileDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateAppearance, isPending: isAppearanceUpdating } =
    useUpdateAppearance();

  const handleSubmit = async (value) => {
    try {
      if (!value?.color) {
        throw new Error(
          "HEX code required, please provide a valid color value."
        );
      }

      if (appearance?.wallpaper_setup?.wallpaper_image_url) {
        const path = appearance?.wallpaper_setup?.wallpaper_image_url.match(
          /users-storage-bucket\/(.+)/
        )[1];
        await deleteWallpaperImageFile(path);
      }

      const response = await updateAppearance({
        id: appearance?.id,
        data_object: {
          wallpaper_setup: {
            type: "flat-color",
            color: value?.color,
            wallpaper_image_url: null,
            style: { background: value?.color },
          },
        },
      });

      dispatch(updateAppearanceData(response));
      setDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Wallpaper Color Update Unsuccessful",
        description: "Couldn't update wallpaper color. Please try again.",
      });

      console.error(error?.message);
    }
  };

  return (
    <>
      <DialogHeader className="mb-2.5">
        <DialogTitle className="text-copy text-center mb-2.5">
          Flat Color Wallpaper
        </DialogTitle>
        <DialogDescription>
          Express yourself through color! Choose a background that matches your
          vibe and style.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <HEXCodeColorPicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full"
              onClick={() => setDialogOpen(false)}
            >
              Chancel
            </Button>
            <Button variant="contrast" className="h-10 w-full">
              {isWallpaperImageFileDeleting || isAppearanceUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AppearanceWallpaperFlatColorForm;

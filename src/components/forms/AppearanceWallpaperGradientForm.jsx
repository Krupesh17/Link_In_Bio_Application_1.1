import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useDeleteFile, useUpdateAppearance } from "@/tanstack-query/queries";
import { HEXCodeColorPicker } from "../HEXCodeColorPicker";
import { appearanceWallpaperColorValidation } from "@/validations";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import { generateSpectrumGradient } from "@/helpers/colorGradientGenerator";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const AppearanceWallpaperGradientForm = ({ setDialogOpen }) => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [gradient, setGradient] = useState(null);

  const form = useForm({
    resolver: yupResolver(appearanceWallpaperColorValidation),
    defaultValues: {
      color:
        !isLoading && appearance?.wallpaper_setup
          ? appearance?.wallpaper_setup?.color
          : "#FF0000",
    },
  });

  const handleGenerateGradient = () => {
    try {
      if (!form.getValues("color")) {
        throw new Error(
          "HEX code required, please provide a valid color value."
        );
      }

      const response = generateSpectrumGradient(form.getValues("color"), 30);

      if (!response)
        throw new Error("The gradient could not be created. Please try again.");

      setGradient(response?.linear_gradient);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Generate Gradient Wallpaper",
        description:
          "The gradient was not successfully created. Please try again.",
      });

      console.error(error?.message);
    }
  };

  const {
    mutateAsync: deleteWallpaperImageFile,
    isPending: isWallpaperImageFileDeleting,
  } = useDeleteFile();

  const { mutateAsync: updateAppearance, isPending: isAppearanceUpdating } =
    useUpdateAppearance();

  const handleGradientApply = async () => {
    try {
      if (!form.getValues("color")) {
        throw new Error(
          "HEX code required, please provide a valid color value."
        );
      }

      if (!gradient) {
        throw new Error(
          "Gradient required, please provide a valid gradient value."
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
            type: "gradient",
            color: form.getValues("color"),
            wallpaper_image_url: null,
            style: { background: gradient },
          },
        },
      });

      dispatch(updateAppearanceData(response));
      setDialogOpen(false);
      setGradient(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Update the Wallpaper Gradient",
        description:
          "Failed to update the gradient wallpaper. Please try again.",
      });

      console.error(error?.message);
    }
  };

  return (
    <>
      <DialogHeader className="relative mb-2.5">
        {gradient && (
          <Button
            size="icon"
            variant="link"
            className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
            onClick={() => {
              setGradient(null);
            }}
          >
            <MoveLeft />
          </Button>
        )}
        <DialogTitle className="text-copy text-center mb-2.5">
          Gradient Wallpaper
        </DialogTitle>
        <DialogDescription>
          Blend your style with a seamless gradient! Choose a background that
          flows with your vibe and creates a stunning effect.
        </DialogDescription>
      </DialogHeader>

      {!gradient && (
        <Form {...form}>
          <form>
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
              <Button
                type="button"
                variant="contrast"
                className="h-10 w-full"
                onClick={handleGenerateGradient}
              >
                Generate
              </Button>
            </div>
          </form>
        </Form>
      )}

      {gradient && (
        <section>
          <div
            className="w-[228px] h-[228px] bg-accent rounded-md mb-4 mx-auto"
            style={{
              background: gradient ? gradient : null,
            }}
          ></div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full"
              onClick={() => {
                setDialogOpen(false);
                setGradient(null);
              }}
            >
              Chancel
            </Button>
            <Button
              type="button"
              variant="contrast"
              className="h-10 w-full"
              onClick={handleGradientApply}
            >
              {isWallpaperImageFileDeleting || isAppearanceUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default AppearanceWallpaperGradientForm;

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { InputColor } from "..";
import { debounce } from "lodash";
import { useDeleteFile, useUpdateAppearance } from "@/tanstack-query/queries";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { generateSpectrumGradient } from "@/helpers/colorGradientGenerator";
import {
  generatePolkaDotSVG,
  generateStripsSVG,
  generateZigZagSVG,
} from "@/helpers/backgroundPatternGenerators";
import { AppearanceWallpaperImageDialog } from "../dialog-boxs";
import { yupResolver } from "@hookform/resolvers/yup";
import { appearanceWallpaperConfigValidation } from "@/validations";

const wallpaperTypeList = [
  {
    name: "Flat Color",
    slug: "flat-color",
    className: `bg-[#4C555E] overflow-hidden`,
    style: null,
    content: null,
  },
  {
    name: "Gradient",
    slug: "gradient",
    className: `bg-gradient-to-b from-[#7E838B] to-[#4C555E] overflow-hidden`,
    style: null,
    content: null,
  },
  {
    name: "Image",
    slug: "image",
    className: `flex items-center justify-center bg-[#4C555E] [&_svg]:size-auto text-accent overflow-hidden`,
    style: null,
    content: <Image strokeWidth={1} size={60} />,
  },
  {
    name: "Polka",
    slug: "polka",
    className: `bg-[#4C555E] overflow-hidden`,
    style: {
      backgroundImage: `url("/assets/images/polka_pattern.svg")`,
      backgroundSize: "cover",
    },
    content: null,
  },
  {
    name: "Strips",
    slug: "strips",
    className: `bg-[#4C555E] overflow-hidden`,
    style: {
      backgroundImage: `url("/assets/images/strips_pattern.svg")`,
      backgroundSize: "cover",
    },
    content: null,
  },
  {
    name: "Zig Zag",
    slug: "zig-zag",
    className: `bg-[#4C555E] overflow-hidden`,
    style: {
      backgroundImage: `url("/assets/images/zig_zag_pattern.svg")`,
      backgroundSize: "cover",
    },
    content: null,
  },
];

const AppearanceWallpaperConfigForm = ({ setWallpaperConfigUpdating }) => {
  const { appearance } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isImageWallpaperDialogOpen, setImageWallpaperDialogOpen] =
    useState(false);

  // Store the previous wallpaper type to revert to if dialog is cancelled
  const previousWallpaperTypeRef = useRef(
    appearance?.wallpaper_setup?.type || "flat-color"
  );

  const form = useForm({
    resolver: yupResolver(appearanceWallpaperConfigValidation),
    defaultValues: {
      wallpaperType: appearance?.wallpaper_setup?.type
        ? appearance?.wallpaper_setup?.type
        : "flat-color",
      wallpaperColor: appearance?.wallpaper_setup?.color
        ? appearance?.wallpaper_setup?.color
        : "#4C555E",
    },
  });

  const { mutateAsync: deleteWallpaperImageFile } = useDeleteFile();

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const handleFlatColorWallpaper = async (value) => {
    try {
      if (!value?.wallpaperColor) {
        throw new Error(
          "Wallpaper color is required, please provide a valid color value."
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
            color: value?.wallpaperColor,
            wallpaper_image_url: null,
            style: { background: value?.wallpaperColor },
          },
        },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Wallpaper Color Update Unsuccessful",
        description: "Couldn't update wallpaper color. Please try again.",
      });

      console.error(error?.message);
    } finally {
      setWallpaperConfigUpdating(false);
    }
  };

  const handleGradientWallpaper = async (value) => {
    try {
      if (!value?.wallpaperColor) {
        throw new Error(
          "Wallpaper color is required, please provide a valid color value."
        );
      }

      const gradient = generateSpectrumGradient(value?.wallpaperColor, 30);

      if (!gradient) {
        throw new Error("The gradient could not be created. Please try again.");
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
            color: value?.wallpaperColor,
            wallpaper_image_url: null,
            style: { background: gradient?.linear_gradient },
          },
        },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Update the Wallpaper Gradient",
        description:
          "Failed to update the gradient wallpaper. Please try again.",
      });

      console.error(error?.message);
    } finally {
      setWallpaperConfigUpdating(false);
    }
  };

  const handleSVGPatternWallpaper = async (value) => {
    try {
      if (!value?.wallpaperColor) {
        throw new Error(
          "Wallpaper color is required, please provide a valid color value."
        );
      }

      const wallpaperConfig = { pattern: null, backgroundSize: null };

      if (value?.wallpaperType === "polka") {
        wallpaperConfig["pattern"] = await generatePolkaDotSVG(
          value?.wallpaperColor
        );
        wallpaperConfig["backgroundSize"] = "270px 405px";
      } else if (value?.wallpaperType === "strips") {
        wallpaperConfig["pattern"] = await generateStripsSVG(
          value?.wallpaperColor
        );
        wallpaperConfig["backgroundSize"] = "270px 270px";
      } else if (value?.wallpaperType === "zig-zag") {
        wallpaperConfig["pattern"] = await generateZigZagSVG(
          value?.wallpaperColor
        );
        wallpaperConfig["backgroundSize"] = "250px 250px";
      } else {
        throw new Error("Invalid wallpaper type provided.");
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
            type: value?.wallpaperType,
            color: value?.wallpaperColor,
            wallpaper_image_url: null,
            style: {
              backgroundImage: `url("${wallpaperConfig?.pattern}")`,
              backgroundRepeat: "repeat",
              backgroundSize: wallpaperConfig?.backgroundSize,
            },
          },
        },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Update the Wallpaper Pattern",
        description:
          "Failed to update the pattern wallpaper. Please try again.",
      });

      console.error(error?.message);
    } finally {
      setWallpaperConfigUpdating(false);
    }
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      let wallpaperType = form.getValues("wallpaperType");

      if (wallpaperType === "gradient") {
        form.handleSubmit(handleGradientWallpaper)();
      } else if (
        wallpaperType === "polka" ||
        wallpaperType === "strips" ||
        wallpaperType === "zig-zag"
      ) {
        form.handleSubmit(handleSVGPatternWallpaper)();
      } else if (wallpaperType === "flat-color") {
        form.handleSubmit(handleFlatColorWallpaper)();
      }
    }, 1000),
    []
  );

  // Handle dialog close - revert to previous wallpaper type
  const handleImageDialogClose = (dialogOpen) => {
    if (!dialogOpen) {
      // Dialog is being closed, revert to previous wallpaper type
      form.setValue("wallpaperType", previousWallpaperTypeRef.current);
    }
    setImageWallpaperDialogOpen(dialogOpen);
  };

  // Handle successful image upload - update the previous type reference
  const handleImageUploadSuccess = () => {
    // Update the previous type to 'image' since it was successfully set
    previousWallpaperTypeRef.current = "image";
    setImageWallpaperDialogOpen(false);
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      const currentWallpaperType = form.getValues("wallpaperType");

      if (currentWallpaperType === "image") {
        // Store the current type as previous before opening dialog
        const currentType = form.getValues("wallpaperType");
        if (currentType !== "image") {
          previousWallpaperTypeRef.current = currentType;
        } else {
          // If current type is already image, use the appearance state
          previousWallpaperTypeRef.current =
            appearance?.wallpaper_setup?.type || "flat-color";
        }
        setImageWallpaperDialogOpen(true);
      } else {
        // Update previous type reference for non-image types
        previousWallpaperTypeRef.current = currentWallpaperType;
        setWallpaperConfigUpdating(true);
        debouncedSubmit();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit, appearance?.wallpaper_setup?.type]);

  // Update previous type reference when appearance changes
  useEffect(() => {
    if (appearance?.wallpaper_setup?.type && !isImageWallpaperDialogOpen) {
      previousWallpaperTypeRef.current = appearance.wallpaper_setup.type;
    }
  }, [appearance?.wallpaper_setup?.type, isImageWallpaperDialogOpen]);

  return (
    <>
      <AppearanceWallpaperImageDialog
        isDialogOpen={isImageWallpaperDialogOpen}
        setDialogOpen={handleImageDialogClose}
        onImageUploadSuccess={handleImageUploadSuccess}
      />

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="wallpaperType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {wallpaperTypeList?.map((item) => (
                        <li
                          className="relative flex flex-col gap-2"
                          key={item?.slug}
                        >
                          <FormItem className="absolute -top-2 -left-1 z-10">
                            <FormControl>
                              <RadioGroupItem
                                value={item?.slug}
                                className="bg-background"
                              />
                            </FormControl>
                          </FormItem>
                          <div
                            className={`h-auto aspect-[2/3] rounded-md ${item?.className}`}
                            style={item?.style}
                          >
                            {item?.content}
                          </div>
                          <p className="text-sm font-medium text-center">
                            {item?.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={`${
              form.getValues("wallpaperType") === "image"
                ? "hidden"
                : "grid grid-cols-2 max-sm:grid-cols-1 gap-4 mt-4"
            }`}
          >
            <FormField
              control={form.control}
              name="wallpaperColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallpaper color</FormLabel>
                  <FormControl>
                    <InputColor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default AppearanceWallpaperConfigForm;

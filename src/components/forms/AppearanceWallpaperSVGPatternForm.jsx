import React, { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appearanceWallpaperColorValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { HEXCodeColorPicker } from "../HEXCodeColorPicker";
import { Button } from "../ui/button";
import {
  generatePolkaDotSVG,
  generateStripsSVG,
  generateZigZagSVG,
} from "@/helpers/backgroundPatternGenerators";
import { Loader2, MoveLeft } from "lucide-react";
import { useDeleteFile, useUpdateAppearance } from "@/tanstack-query/queries";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";

const AppearanceWallpaperSVGPatternForm = ({ setDialogOpen, patternType }) => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [pattern, setPattern] = useState(null);
  const [backgroundSize, setBackgroundSize] = useState(null);

  const form = useForm({
    resolver: yupResolver(appearanceWallpaperColorValidation),
    defaultValues: {
      color:
        !isLoading && appearance?.wallpaper_setup
          ? appearance?.wallpaper_setup?.color
          : "#FF0000",
    },
  });

  const handleGeneratePattern = () => {
    try {
      if (!form.getValues("color")) {
        throw new Error(
          "HEX code required, please provide a valid color value."
        );
      }

      let response;

      if (patternType === "polka") {
        response = generatePolkaDotSVG(form.getValues("color"));
        setBackgroundSize("270px 405px");
      } else if (patternType === "strips") {
        response = generateStripsSVG(form.getValues("color"));
        setBackgroundSize("270px 270px");
      } else if (patternType === "zig-zag") {
        response = generateZigZagSVG(form.getValues("color"));
        setBackgroundSize("250px 250px");
      }

      setPattern(response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Generate Pattern Wallpaper",
        description:
          "The pattern was not successfully created. Please try again.",
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

  const handlePatternApply = async () => {
    try {
      if (!form.getValues("color")) {
        throw new Error("HEX code missing, please try again.");
      }

      if (!pattern) {
        throw new Error("Pattern missing, please try again.");
      }

      if (!backgroundSize) {
        throw new Error("background size missing, please try again.");
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
            type: patternType,
            color: form.getValues("color"),
            wallpaper_image_url: null,
            style: {
              backgroundImage: `url("${pattern}")`,
              backgroundRepeat: "repeat",
              backgroundSize: backgroundSize,
            },
          },
        },
      });

      dispatch(updateAppearanceData(response));
      setDialogOpen(false);
      setPattern(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Update the Wallpaper Pattern",
        description:
          "Failed to update the pattern wallpaper. Please try again.",
      });

      console.error(error?.message);
    }
  };

  return (
    <>
      <DialogHeader className="relative mb-2.5">
        {pattern && (
          <Button
            size="icon"
            variant="link"
            className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
            onClick={() => {
              setPattern(null);
            }}
          >
            <MoveLeft />
          </Button>
        )}
        <DialogTitle className="text-copy text-center mb-2.5">
          Pattern Wallpaper
        </DialogTitle>
        <DialogDescription>
          Elevate your digital canvas with seamless patterns—your social links,
          your style, your story!
        </DialogDescription>
      </DialogHeader>

      {!pattern && (
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
                onClick={handleGeneratePattern}
              >
                Generate
              </Button>
            </div>
          </form>
        </Form>
      )}

      {pattern && (
        <section>
          <div
            className="w-[228px] h-[228px] bg-accent rounded-md mb-4 mx-auto"
            style={{
              backgroundImage: pattern ? `url("${pattern}")` : null,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full"
              onClick={() => {
                setDialogOpen(false);
                setPattern(null);
              }}
            >
              Chancel
            </Button>
            <Button
              type="button"
              variant="contrast"
              className="h-10 w-full"
              onClick={handlePatternApply}
            >
              {isAppearanceUpdating ? (
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

export default AppearanceWallpaperSVGPatternForm;

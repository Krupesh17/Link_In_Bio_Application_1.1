import { Check, Image } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { AppearanceWallpaperSetupDialog } from "./dialog-boxs";

const AppearanceWallpaperSection = () => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const [isFlatColorWallpaperDialogOpen, setFlatColorWallpaperDialogOpen] =
    useState(false);
  const [wallpaperType, setWallpaperType] = useState(
    !isLoading && appearance?.wallpaper_setup
      ? appearance?.wallpaper_setup?.type
      : null
  );

  const wallpaperButtonList = [
    {
      name: "Flat Color",
      slug: "flat-color",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-secondary overflow-hidden ${
        appearance?.wallpaper_setup?.type === "flat-color" && "border-success"
      }`,
      style: null,
      content: null,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("flat-color");
      },
    },
    {
      name: "Gradient",
      slug: "gradient",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-gradient-to-b from-secondary/10 to-secondary overflow-hidden ${
        appearance?.wallpaper_setup?.type === "gradient" && "border-success"
      }`,
      style: null,
      content: null,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("gradient");
      },
    },
    {
      name: "Image",
      slug: "image",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-background [&_svg]:size-auto text-accent overflow-hidden ${
        appearance?.wallpaper_setup?.type === "image" && "border-success"
      }`,
      style: null,
      content: <Image strokeWidth={1} size={60} />,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("image");
      },
    },
    {
      name: "Polka",
      slug: "polka",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-background hover:brightness-125 overflow-hidden ${
        appearance?.wallpaper_setup?.type === "polka" && "border-success"
      }`,
      style: {
        backgroundImage: `url("/assets/images/polka_pattern.svg")`,
        backgroundSize: "cover",
      },
      content: null,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("polka");
      },
    },
    {
      name: "Strips",
      slug: "strips",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-background hover:brightness-125 overflow-hidden ${
        appearance?.wallpaper_setup?.type === "strips" && "border-success"
      }`,
      style: {
        backgroundImage: `url("/assets/images/strips_pattern.svg")`,
        backgroundSize: "cover",
      },
      content: null,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("strips");
      },
    },
    {
      name: "Zig Zag",
      slug: "zig-zag",
      className: `relative h-auto p-0 aspect-[2/3] rounded-md bg-background hover:brightness-125 overflow-hidden ${
        appearance?.wallpaper_setup?.type === "zig-zag" && "border-success"
      }`,
      style: {
        backgroundImage: `url("/assets/images/zig_zag_pattern.svg")`,
        backgroundSize: "cover",
      },
      content: null,
      onClick: () => {
        setFlatColorWallpaperDialogOpen(true);
        setWallpaperType("zig-zag");
      },
    },
  ];

  return (
    <>
      <AppearanceWallpaperSetupDialog
        isDialogOpen={isFlatColorWallpaperDialogOpen}
        setDialogOpen={setFlatColorWallpaperDialogOpen}
        wallpaperType={wallpaperType}
      />

      <section className="max-w-[650px] mx-auto mb-8">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-2">
          Custom appearance
        </h2>
        <p className="text-base mb-4">
          Customize your LinkChain profile! Update your wallpaper with colors,
          gradients, or images, and choose a button style that fits your style.
        </p>

        <h2 className="text-xl max-sm:text-lg font-semibold mt-8 mb-4">
          Wallpaper
        </h2>

        <div className="relative p-4 border border-border rounded-md bg-background">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wallpaperButtonList?.map((item, index) => (
              <div className="relative flex flex-col gap-2" key={index}>
                <Button
                  type="button"
                  variant="outline"
                  style={item?.style}
                  className={item?.className}
                  onClick={item?.onClick}
                >
                  {appearance?.wallpaper_setup?.type === item?.slug && (
                    <div className="absolute top-0 left-0 bg-success p-2 rounded-ee-2xl">
                      <Check size={20} className="text-copy" />
                    </div>
                  )}
                  {item?.content}
                </Button>
                <p className="text-sm text-center">{item?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AppearanceWallpaperSection;

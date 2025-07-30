import React, { forwardRef } from "react";
import { currencyList } from "@/resources/appData";
import { Image } from "lucide-react";

const UserLandingProductButton = forwardRef(
  ({ productData, buttonAppearanceData, className = "", ...props }, ref) => {
    const customButtonVariants = {
      fill_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      fill_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      fill_rounded_full: {
        className: `rounded-2xl transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      outline_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      outline_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      outline_rounded_full: {
        className: `rounded-2xl transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
      },
      soft_shadow_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
      soft_shadow_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
      soft_shadow_rounded_full: {
        className: `rounded-2xl transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
      hard_shadow_flat: {
        className: `!rounded-none transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
      hard_shadow_rounded_md: {
        className: `rounded-md transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
      hard_shadow_rounded_full: {
        className: `rounded-2xl transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
      },
    };

    const getCurrencySymbol = (currency) => {
      const response = currencyList?.filter(
        (currencyItem) => currencyItem?.currency === currency
      );

      return response[0]?.currency_symbol;
    };

    const handleButtonClick = () => {
      console.log("click");
    };

    return (
      <button
        type="button"
        ref={ref}
        className={`w-full font-medium text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden ${
          customButtonVariants[buttonAppearanceData?.button_type || "fill_flat"]
            ?.className
        } ${className}`}
        style={
          customButtonVariants[buttonAppearanceData?.button_type || "fill_flat"]
            ?.style
        }
        onClick={handleButtonClick}
        {...props}
      >
        <div className="w-full bg-inherit overflow-hidden">
          <div className="w-full aspect-square overflow-hidden">
            {productData?.product_image_url ? (
              <img
                src={productData?.product_image_url}
                alt="Button thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <Image
                  size={80}
                  strokeWidth={0.5}
                  className="text-copy-lighter/80"
                />
                <p className="text-center text-sm text-copy-lighter">
                  No Product image available
                </p>
              </div>
            )}
          </div>

          <div className="w-full h-16 px-4 py-2 flex flex-col justify-center gap-1">
            <p className="w-full font-normal text-center text-wrap text-ellipsis line-clamp-2 overflow-hidden hover:text-wrap">
              {productData?.product_title}
            </p>
            <p className="w-full font-normal text-center text-wrap text-ellipsis line-clamp-1 overflow-hidden hover:text-wrap">
              {getCurrencySymbol(productData?.product_currency)}{" "}
              {productData?.product_price}
            </p>
          </div>
        </div>
      </button>
    );
  }
);

UserLandingProductButton.displayName = "UserLandingProductButton";

export default UserLandingProductButton;

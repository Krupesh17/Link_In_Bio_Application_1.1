import React, { forwardRef } from "react";
import { LockKeyhole } from "lucide-react";

const AppearanceCustomButtons = forwardRef(
  (
    {
      imageSource = "",
      variant = "fill_flat",
      backgroundColor = "#000000",
      foregroundColor = "#ffffff",
      shadowColor = "#000000",
      className = "",
      ...props
    },
    ref
  ) => {
    const customButtonVariants = {
      fill_flat: {
        className: `rounded-none transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-none",
      },
      fill_rounded_md: {
        className: `rounded-md transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-md",
      },
      fill_rounded_full: {
        className: `rounded-full transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-full",
      },
      outline_flat: {
        className: `rounded-none transition-colors duration-300 border border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-none",
      },
      outline_rounded_md: {
        className: `rounded-md transition-colors duration-300 border border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-md",
      },
      outline_rounded_full: {
        className: `rounded-full transition-colors duration-300 border border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: { "--bg-color": backgroundColor, "--fg-color": foregroundColor },
        icon_className: "rounded-full",
      },
      soft_shadow_flat: {
        className: `rounded-none transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-none",
      },
      soft_shadow_rounded_md: {
        className: `rounded-md transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-md",
      },
      soft_shadow_rounded_full: {
        className: `rounded-full transition-colors duration-300 border border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-full",
      },
      hard_shadow_flat: {
        className: `rounded-none transition-all duration-300 border border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-none",
      },
      hard_shadow_rounded_md: {
        className: `rounded-md transition-all duration-300 border border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-md",
      },
      hard_shadow_rounded_full: {
        className: `rounded-full transition-all duration-300 border border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": backgroundColor,
          "--fg-color": foregroundColor,
          "--shadow-color": shadowColor,
        },
        icon_className: "rounded-full",
      },
    };

    return (
      <button
        ref={ref}
        className={`w-full h-12 font-medium text-xs flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden ${customButtonVariants[variant]?.className} ${className}`}
        style={customButtonVariants[variant]?.style}
        {...props}
      >
        <div className="flex items-center justify-between gap-2 w-full p-2">
          <div className="w-8 h-8 shrink-0 overflow-hidden">
            {imageSource && (
              <img
                src={imageSource}
                alt="unsplash_button_icon"
                className={`w-full h-full overflow-hidden bg-cover border-none ${customButtonVariants[variant]?.icon_className}`}
              />
            )}
          </div>
          <p>Unsplash</p>
          <div className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center">
            <LockKeyhole size={16} />
          </div>
        </div>
      </button>
    );
  }
);

AppearanceCustomButtons.displayName = "AppearanceCustomButtons";

export default AppearanceCustomButtons;

import React, { forwardRef, useState } from "react";
import { Image, LockKeyhole } from "lucide-react";
import { TooltipBox } from ".";
import { UserLandingLinkLockDialog } from "./dialog-boxs";

const UserLandingLinkButton = forwardRef(
  ({ linkData, buttonAppearanceData, className = "", ...props }, ref) => {
    const [isUserLandingLinkLockDialog, setUserLandingLinkLockDialog] =
      useState(false);

    const customButtonVariants = {
      fill_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-none",
      },
      fill_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-md",
      },
      fill_rounded_full: {
        className: `rounded-full transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-full",
      },
      outline_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-none",
      },
      outline_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-md",
      },
      outline_rounded_full: {
        className: `rounded-full transition-colors duration-300 border-2 border-[color:var(--bg-color)] bg-transparent text-[color:var(--fg-color)] hover:bg-[color:var(--bg-color)] hover:border-transparent`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
        },
        icon_className: "rounded-full",
      },
      soft_shadow_flat: {
        className: `rounded-none transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-none",
      },
      soft_shadow_rounded_md: {
        className: `rounded-md transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-md",
      },
      soft_shadow_rounded_full: {
        className: `rounded-full transition-colors duration-300 border-2 border-transparent bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-lg shadow-[color:var(--shadow-color)] hover:bg-transparent hover:border-[color:var(--bg-color)]`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-full",
      },
      hard_shadow_flat: {
        className: `!rounded-none transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-none",
      },
      hard_shadow_rounded_md: {
        className: `rounded-md transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-md",
      },
      hard_shadow_rounded_full: {
        className: `rounded-full transition-all duration-300 border-2 border-[color:var(--shadow-color)] bg-[color:var(--bg-color)] text-[color:var(--fg-color)] shadow-[5px_5px_0px_var(--shadow-color)] hover:shadow-[3px_3px_0px_var(--shadow-color)] hover:translate-y-0.5`,
        style: {
          "--bg-color": buttonAppearanceData?.button_color || "#000000",
          "--fg-color": buttonAppearanceData?.button_font_color || "#FFFFFF",
          "--shadow-color": buttonAppearanceData?.button_shadow || "#000000",
        },
        icon_className: "rounded-full",
      },
    };

    const handleRedirectToLockedLink = () => {
      // I should write a logic which can add click record to the database first and then redirect to link.
      window.open(linkData?.link_url, "_blank");
      setUserLandingLinkLockDialog(false);
    };

    return (
      <>
        <UserLandingLinkLockDialog
          isUserLandingLinkLockDialog={isUserLandingLinkLockDialog}
          setUserLandingLinkLockDialog={setUserLandingLinkLockDialog}
          linkData={linkData}
        />

        <button
          ref={ref}
          className={`w-full min-h-12 font-medium text-xs flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden ${
            customButtonVariants[
              buttonAppearanceData?.button_type || "fill_flat"
            ]?.className
          } ${className}`}
          style={
            customButtonVariants[
              buttonAppearanceData?.button_type || "fill_flat"
            ]?.style
          }
          onClick={() => {
            if (
              linkData?.link_lock_sensitive_content ||
              linkData?.link_lock_date_of_birth
            ) {
              setUserLandingLinkLockDialog(true);
            } else {
              handleRedirectToLockedLink();
            }
          }}
          {...props}
        >
          {linkData?.link_layout === "featured" ? (
            <div className="relative w-full h-40 bg-inherit overflow-hidden">
              {linkData?.link_thumbnail_url ? (
                <img
                  src={linkData?.link_thumbnail_url}
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
                    No thumbnail available
                  </p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="w-full font-normal text-left text-nowrap text-ellipsis overflow-hidden hover:text-wrap">
                  {linkData?.link_title}
                </p>

                <div className="w-5 h-5 overflow-hidden shrink-0 flex items-center justify-center">
                  {(linkData?.link_lock_sensitive_content ||
                    linkData?.link_lock_date_of_birth) && (
                    <LockKeyhole size={14} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 w-full p-2">
              <div className="w-8 h-8 shrink-0 overflow-hidden">
                {linkData?.link_thumbnail_url && (
                  <img
                    src={linkData?.link_thumbnail_url}
                    alt="button_icon"
                    className={`w-full h-full object-cover overflow-hidden bg-cover border-none ${
                      customButtonVariants[
                        buttonAppearanceData?.button_type || "fill_flat"
                      ]?.icon_className
                    }`}
                  />
                )}
              </div>
              <p className="w-full font-normal text-nowrap text-ellipsis overflow-hidden">
                <TooltipBox tooltipText={linkData?.link_title}>
                  <span>{linkData?.link_title}</span>
                </TooltipBox>
              </p>
              {/**
               * Have to work on this lock section.
               * So far i have 2 types of link lock 'Sensitive Content' and 'Date of Birth'.
               * For 'Sensitive Content' i will show a Dialog which shows the sensitive content warning.
               * For 'Date of Birth' i will show a Dialog which ask user to enter their date of birth.
               * It will also show a short description about why we need their date of birth.
               */}

              <div className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center">
                {(linkData?.link_lock_sensitive_content ||
                  linkData?.link_lock_date_of_birth) && (
                  <LockKeyhole size={16} />
                )}
              </div>
            </div>
          )}
        </button>
      </>
    );
  }
);

UserLandingLinkButton.displayName = "UserLandingLinkButton";

export default UserLandingLinkButton;

import useForwardedRef from "@/hooks/use-forwarded-ref";
import React, { forwardRef, useMemo } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "./ui/input";

const HEXCodeColorPicker = forwardRef(
  ({ value, onChange, className, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <div className="flex flex-col items-center gap-4">
        <HexColorPicker
          color={parsedValue}
          onChange={onChange}
        />
        <div className="flex items-center gap-2 w-full">
          <div
            className="h-9 w-9 shrink-0 border border-border rounded-md"
            style={{ backgroundColor: parsedValue }}
          ></div>
          <Input
            maxLength={7}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
            className={`${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);
HEXCodeColorPicker.displayName = "HEXCodeColorPicker";
export { HEXCodeColorPicker };

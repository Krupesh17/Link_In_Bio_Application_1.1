import React, { forwardRef } from "react";
import { Input } from "./ui/input";

const isValidHex = (value) => /^#[0-9A-Fa-f]{6}$/.test(value);

const InputColor = forwardRef(({ value = "", onChange, ...props }, ref) => {
  const safeColor = isValidHex(value) ? value : "#000000";

  const handleHexInput = (e) => {
    onChange?.(e.target.value);
  };

  const handleColorInput = (e) => {
    const hex = e.target.value;
    if (isValidHex(hex)) onChange?.(hex);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={safeColor}
        onChange={handleColorInput}
        className="input-color shrink-0"
      />

      <Input
        type="text"
        value={value}
        onChange={handleHexInput}
        className="h-10"
        placeholder="#4C555E"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default InputColor;

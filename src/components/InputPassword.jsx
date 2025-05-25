import React, { useState, forwardRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

const InputPassword = forwardRef(({ className = "", ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div
      className={`flex items-center gap-2.5 border border-input px-3 rounded-md focus-within:ring-1 focus-within:ring-ring ${className}`}
    >
      <Input
        type={passwordVisible ? "text" : "password"}
        className="h-[60px] border-none shadow-none px-0 text-base focus-visible:ring-0"
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="px-2.5 text-copy-lighter"
        onClick={() => setPasswordVisible((prevState) => !prevState)}
      >
        {passwordVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
});

export default InputPassword;

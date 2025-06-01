import { forwardRef, useMemo, useState } from "react";
import useForwardedRef from "@/hooks/use-forwarded-ref";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { HexColorPicker } from "react-colorful";
import { Input } from "./input";

const ColorPicker = forwardRef(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <div className="inline-flex flex-row items-center gap-2">
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
            <Button
              {...props}
              className={cn("block shrink-0", className)}
              name={name}
              onClick={() => {
                setOpen(true);
              }}
              size="icon"
              style={{
                backgroundColor: parsedValue,
              }}
              variant="outline"
            >
              <div />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <HexColorPicker color={parsedValue} onChange={onChange} />
          </PopoverContent>
        </Popover>

        <Input
          maxLength={7}
          onChange={(e) => {
            onChange(e?.currentTarget?.value);
          }}
          ref={ref}
          value={parsedValue}
        />
      </div>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };

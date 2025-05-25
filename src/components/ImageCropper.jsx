import React from "react";
import Cropper from "react-easy-crop";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

const ImageCropper = ({
  image = "",
  crop,
  rotation,
  zoom,
  zoomSpeed = 0.5,
  maxZoom = 3,
  zoomWithScroll = true,
  showGrid = true,
  aspect = 1 / 1,
  onCropChange,
  onZoomChange,
  onRotationChange,
  onCropComplete,
  className = "",
  ...props
}) => {
  const handleZoom = (direction) => {
    if (direction === "in" && zoom < maxZoom) {
      onZoomChange((prev) => prev + zoomSpeed);
    } else if (direction === "out" && zoom > 1) {
      onZoomChange((prev) => prev - zoomSpeed);
    }
  };

  return (
    <section className={`w-full h-80 bg-background relative ${className}`}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        zoomSpeed={zoomSpeed}
        maxZoom={maxZoom}
        zoomWithScroll={zoomWithScroll}
        showGrid={showGrid}
        aspect={aspect}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onRotationChange={onRotationChange}
        onCropComplete={onCropComplete}
        {...props}
      />

      <div className="absolute right-2 bottom-2 flex flex-col gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => handleZoom("in")}
        >
          <Plus />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => handleZoom("out")}
        >
          <Minus />
        </Button>
      </div>
    </section>
  );
};

export default ImageCropper;

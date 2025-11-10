export const cropImageToSquare = (imageSrc, box) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Could not get canvas context"));
      }

      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = img;

      // Convert normalized coordinates to absolute pixel values
      const absX = box.x * imgWidth;
      const absY = box.y * imgHeight;
      const absWidth = box.width * imgWidth;
      const absHeight = box.height * imgHeight;

      // Calculate the center of the bounding box
      const centerX = absX + absWidth / 2;
      let centerY = absY + absHeight / 2;

      // 🌟 THE FIX: Introduce an UPWARD BIAS (shift the center up by 10-15% of the box height)
      // This ensures the square crop favors the head/face region.
      const verticalBias = 0.15; // Shift up by 15%
      centerY = centerY - absHeight * verticalBias;

      // Determine the desired size of the square crop with padding
      const desiredSize = Math.max(absWidth, absHeight) * 1.2; // Add 20% padding

      // Calculate the maximum possible size of a square centered at (centerX, centerY)
      // that fits within the image boundaries.
      const maxRadius = Math.min(
        centerX, // distance to left edge
        imgWidth - centerX, // distance to right edge
        centerY, // distance to top edge
        imgHeight - centerY // distance to bottom edge
      );
      const maxSize = 2 * maxRadius;

      // The final size is the smaller of the desired size and the maximum possible size.
      const finalSize = Math.min(desiredSize, maxSize);

      if (finalSize <= 0) {
        return reject(
          new Error(
            "Could not calculate a valid crop size. Bounding box might be invalid."
          )
        );
      }

      // Calculate the top-left corner of the square crop. This will always be within bounds.
      const cropX = centerX - finalSize / 2;
      const cropY = centerY - finalSize / 2;

      const outputSize = 512;
      canvas.width = outputSize;
      canvas.height = outputSize;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, outputSize, outputSize);

      ctx.drawImage(
        img,
        cropX,
        cropY,
        finalSize,
        finalSize,
        0,
        0,
        outputSize,
        outputSize
      );

      // Convert canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error("Could not create blob from canvas"));
          }
          resolve(blob);
        },
        "image/png",
        0.95
      ); // 0.95 is the quality (only applies to jpeg)
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};

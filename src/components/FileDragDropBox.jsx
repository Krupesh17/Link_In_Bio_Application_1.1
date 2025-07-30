import React, { useCallback, useState } from "react";
import { File } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { ImageCropper } from ".";
import { Button } from "./ui/button";
import getCroppedImg from "@/helpers/cropImage";
import { base64ToFile } from "file64";
import { useSelector } from "react-redux";
import { RectangleDashed, Selection } from "@phosphor-icons/react";

const FileDragDropBox = ({
  file,
  setFile,
  imageURL,
  setImageURL,
  afterImageCrop,
  terminateImageCrop,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const { profile } = useSelector((state) => state.user);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setFile(null);

      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setFileType(acceptedFiles[0]?.type);
        setImageURL(URL.createObjectURL(acceptedFiles[0]));
      }

      if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        if (
          firstRejection.errors.some((error) => error.code === "too-many-files")
        ) {
          console.error("Please select only one file.");
        } else {
          console.error(firstRejection.errors[0].message);
        }
      }
    },
    [file]
  );

  // It should not accept GIF & AVIF images.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".bmp", ".heic", ".heif"],
    },
  });

  const cropImage = async () => {
    try {
      const file = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        fileType,
        rotation
      );

      const imageFile = base64ToFile(file, profile?.user_id, {
        type: fileType,
      });
      imageFile
        .then((file) => {
          setFile(file);
          setImageURL(URL.createObjectURL(file));
          afterImageCrop();
          setFileType(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const imageCropCancel = () => {
    setFile(null);
    setFileType(null);
    setImageURL(null);
    terminateImageCrop();
  };

  return (
    <section>
      {file ? (
        <div>
          <div className="mb-2 border border-border rounded-md p-2 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className={`[&_svg]:size-6 shrink-0 px-2 ${
                aspectRatio === 1 / 1 && "bg-accent"
              }`}
              onClick={() => setAspectRatio(1 / 1)}
            >
              <Selection />
              <span className="text-xs">SQUARE</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`[&_svg]:size-6 shrink-0 px-2 ${
                aspectRatio === 16 / 9 && "bg-accent"
              }`}
              onClick={() => setAspectRatio(16 / 9)}
            >
              <RectangleDashed />
              <span className="text-xs">RECTANGLE</span>
            </Button>
          </div>

          <ImageCropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            aspect={aspectRatio}
            className="border border-border rounded-lg overflow-hidden mb-4"
          />

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={imageCropCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contrast"
              className="w-full"
              onClick={cropImage}
            >
              Crop
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="bg-background rounded-lg cursor-pointer overflow-hidden border border-border focus-within:ring-1 focus-within:ring-ring hover:bg-accent"
        >
          <input {...getInputProps()} className="cursor-pointer" />

          <div className="w-full h-80 text-copy flex flex-col items-center justify-center gap-4 text-center">
            <File size={40} strokeWidth={1} />
            <p className="text-sm">
              Select file to upload, <br /> or drag-and-drop file
            </p>
            <small className="text-xs text-balance text-copy-lighter">
              Allowed file types: JPEG, PNG, WebP, BMP, HEIC, HEIF
            </small>
          </div>
        </div>
      )}
    </section>
  );
};

export default FileDragDropBox;

// After accepting a file we can show image crop tool and then
// we can show cropped image and give upload and chancel button.

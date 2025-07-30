import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import { FileDragDropBox } from "..";

const CropLinkThumbnailImageForm = ({
  file,
  setFile,
  imageURL,
  setImageURL,
  setFormStep,
}) => {
  return (
    <>
      <DialogHeader className="relative mb-2.5">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() => {
            setFormStep(1);
            setFile(null);
            setImageURL(null);
          }}
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          {file ? "Crop Thumbnail image" : "Upload Thumbnail image"}
        </DialogTitle>
      </DialogHeader>

      <FileDragDropBox
        file={file}
        setFile={setFile}
        imageURL={imageURL}
        setImageURL={setImageURL}
        afterImageCrop={() => setFormStep(3)}
        terminateImageCrop={() => setFormStep(1)}
      />
    </>
  );
};

export default CropLinkThumbnailImageForm;

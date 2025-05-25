import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import { FileDragDropBox } from "..";

const CropProfileImageForm = ({
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
          {file ? "Crop profile image" : "Upload profile image"}
        </DialogTitle>
      </DialogHeader>

      <FileDragDropBox
        file={file}
        setFile={setFile}
        setFormStep={setFormStep}
        imageURL={imageURL}
        setImageURL={setImageURL}
      />
    </>
  );
};

export default CropProfileImageForm;

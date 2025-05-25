import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  AddLinkThumbnailImageOptionGroupForm,
  CropLinkThumbnailImageForm,
  UploadLinkThumbnailImageForm,
} from "../forms";

const AddLinkThumbnailImageDialog = ({
  isAddThumbnailImageDialogOpen,
  setAddThumbnailImageDialogOpen,
  linkData,
}) => {
  const [formStep, setFormStep] = useState(1);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleThumbnailImageDialogClose = (open) => {
    setAddThumbnailImageDialogOpen(open);
    if (!open) {
      setFormStep(1);
      setFile(null);
      setImageURL(null);
    }
  };

  return (
    <Dialog
      open={isAddThumbnailImageDialogOpen}
      onOpenChange={handleThumbnailImageDialogClose}
    >
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        {/* 
        ✔ 1. AddThumbnailImageOptionGroupForm.jsx 
        ✔ 2. CropLinkThumbnailImageForm.jsx
        ✔ 3. UploadLinkThumbnailImageForm.jsx
        4. ChooseThumbnailIconFrom.jsx 
        */}

        {formStep === 1 && (
          <AddLinkThumbnailImageOptionGroupForm setFormStep={setFormStep} />
        )}

        {formStep === 2 && (
          <CropLinkThumbnailImageForm
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
          />
        )}

        {formStep === 3 && (
          <UploadLinkThumbnailImageForm
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setDialogClose={setAddThumbnailImageDialogOpen}
            linkData={linkData}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkThumbnailImageDialog;

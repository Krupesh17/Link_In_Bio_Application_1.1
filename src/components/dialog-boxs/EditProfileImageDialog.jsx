import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  CropProfileImageForm,
  ProfileImageEditOptionForm,
  ProfileImageDeleteConfirmation,
  UploadProfileImageForm,
  ProfileImageCropOptionForm,
  CropProfileImageWithAiForm,
} from "../forms";

const EditProfileImageDialog = ({
  isEditProfileImageDialogOpen,
  setEditProfileImageDialogOpen,
}) => {
  const [formStep, setFormStep] = useState(1);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isDialogCloseBlock, setDialogCloseBlock] = useState(false);

  const handleEditProfileImageDialogClose = (open) => {
    if (isDialogCloseBlock) return;

    setEditProfileImageDialogOpen(open);

    if (!open) {
      setFormStep(1);
      setFile(null);
      setImageURL(null);
    }
  };

  return (
    <Dialog
      open={isEditProfileImageDialogOpen}
      onOpenChange={handleEditProfileImageDialogClose}
    >
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        {formStep === 1 && (
          <ProfileImageEditOptionForm setFormStep={setFormStep} />
        )}

        {formStep === 2 && (
          <ProfileImageCropOptionForm setFormStep={setFormStep} />
        )}

        {formStep === 3 && (
          <CropProfileImageWithAiForm
            file={file}
            setFile={setFile}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setFormStep={setFormStep}
            isDialogCloseBlock={isDialogCloseBlock}
            setDialogCloseBlock={setDialogCloseBlock}
            setDialogClose={setEditProfileImageDialogOpen}
          />
        )}

        {formStep === 4 && (
          <CropProfileImageForm // Remove unwanted commented code.
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setDialogClose={setEditProfileImageDialogOpen}
          />
        )}

        {formStep === 5 && (
          <UploadProfileImageForm // Remove unwanted commented code.
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setDialogClose={setEditProfileImageDialogOpen}
            setDialogCloseBlock={setDialogCloseBlock}
          />
        )}

        {formStep === 6 && (
          <ProfileImageDeleteConfirmation
            setFormStep={setFormStep}
            setDialogClose={setEditProfileImageDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileImageDialog;

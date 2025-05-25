import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  CropProfileImageForm,
  EditProfileImageOptionGroupForm,
  ProfileImageDeleteConfirmation,
  UploadProfileImageForm,
} from "../forms";

const EditProfileImageDialog = ({
  isEditProfileImageDialogOpen,
  setEditProfileImageDialogOpen,
}) => {
  const [formStep, setFormStep] = useState(1);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleEditProfileImageDialogClose = (open) => {
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
          <EditProfileImageOptionGroupForm setFormStep={setFormStep} />
        )}

        {formStep === 2 && (
          <CropProfileImageForm
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
          />
        )}

        {formStep === 3 && (
          <UploadProfileImageForm
            file={file}
            setFile={setFile}
            setFormStep={setFormStep}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setDialogClose={setEditProfileImageDialogOpen}
          />
        )}
        
        {formStep === 4 && (
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

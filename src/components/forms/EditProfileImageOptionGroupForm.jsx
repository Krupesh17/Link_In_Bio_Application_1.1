import React from "react";
import { Button } from "../ui/button";
import { ChevronRight, Trash2 } from "lucide-react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
const menuList = [
  {
    title: "Upload your profile image",
    description: "Choose an image from your device.",
    formStep: 2,
    prefix: (
      <img
        src="/assets/images/profile_image_example.avif"
        alt="Upload profile image"
        className="rounded-md w-10 h-10"
      />
    ),
  },
  {
    title: "Delete",
    description: "Delete current image.",
    formStep: 4,
    prefix: (
      <div className="flex items-center justify-center w-10 h-10 rounded-md text-red-600 bg-red-600/20">
        <Trash2 />
      </div>
    ),
  },
];

// Add "Delete current profile image" function.
const EditProfileImageOptionGroupForm = ({ setFormStep }) => {
  return (
    <>
      <DialogHeader className="gap-2.5">
        <DialogTitle className="text-copy text-center">
          Profile Avatar
        </DialogTitle>
      </DialogHeader>

      <ul className="flex flex-col gap-2">
        {menuList.map((item, index) => (
          <li key={index}>
            <Button
              type="button"
              variant="ghost"
              size="block"
              className="justify-start gap-5 px-2.5 text-left"
              onClick={() => setFormStep(item?.formStep)}
            >
              {item?.prefix}
              <div>
                <h4 className="text-base text-balance max-sm:text-sm">
                  {item?.title}
                </h4>
                <small className="text-copy-lighter text-balance text-sm max-sm:text-xs">
                  {item?.description}
                </small>
              </div>
              <span className="ml-auto">
                <ChevronRight />
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EditProfileImageOptionGroupForm;

import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronRight, Crop, MoveLeft, Stars } from "lucide-react";

const menuList = [
  {
    title: (
      <>
        <span>AI Crop</span>
        <span className="text-xs inline-block ml-1.5 font-normal bg-blue-500 text-white px-2 py-0.5 rounded-md">
          BETA
        </span>
      </>
    ),
    description: "One-click smart cropping",
    formStep: 3,
    prefix: (
      <div className="flex items-center justify-center w-10 h-10 rounded-md text-orange-600 bg-orange-600/20">
        <Stars />
      </div>
    ),
  },
  {
    title: "Manual Crop",
    description: "Open the cropper for user control",
    formStep: 4,
    prefix: (
      <div className="flex items-center justify-center w-10 h-10 rounded-md text-green-600 bg-green-600/20">
        <Crop />
      </div>
    ),
  },
];

const ProfileImageCropOptionForm = ({ setFormStep }) => {
  return (
    <>
      <DialogHeader className="relative">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() => {
            setFormStep(1);
          }}
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          Edit Profile Avatar
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

export default ProfileImageCropOptionForm;

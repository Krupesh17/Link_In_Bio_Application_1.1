import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const optionList = [
  {
    title: "Upload your own thumbnail",
    description: "Choose an image from your device.",
    formStep: 2,
    prefix: (
      <img
        src="/assets/images/profile_image_example.avif"
        alt="Upload thumbnail image"
        className="rounded-md w-10 h-10"
      />
    ),
  },
];

const AddLinkThumbnailImageOptionGroupForm = ({ setFormStep }) => {
  return (
    <>
      <DialogHeader className="gap-2.5">
        <DialogTitle className="text-copy text-center">
          Add Thumbnail
        </DialogTitle>
      </DialogHeader>

      <ul className="flex flex-col gap-2">
        {optionList.map((item, index) => (
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

export default AddLinkThumbnailImageOptionGroupForm;

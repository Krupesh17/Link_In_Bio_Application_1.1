import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserLandingLinkLockDateOfBirthForm } from "../forms";

const UserLandingLinkLockDialog = ({
  isUserLandingLinkLockDialog,
  setUserLandingLinkLockDialog,
  linkData,
}) => {
  const [formStep, setFormStep] = useState(1);

  const handleRedirectToLockedLink = (url) => {
    // I should write a logic which can add click record to the database first and then redirect to link.
    window.open(url, "_blank");
    setUserLandingLinkLockDialog(false);
    setFormStep(1)
  };

  useEffect(() => {
    if (linkData?.link_lock_sensitive_content) {
      setFormStep(1);
      return;
    } else if (linkData?.link_lock_date_of_birth) {
      setFormStep(2);
      return;
    }
  }, [
    linkData?.link_lock_sensitive_content,
    linkData?.link_lock_date_of_birth,
  ]);

  return (
    <Dialog
      open={isUserLandingLinkLockDialog}
      onOpenChange={setUserLandingLinkLockDialog}
    >
      <DialogContent aria-describedby={undefined} className="sm:max-w-[450px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-copy text-center">
            {formStep === 1
              ? "Sensitive Content"
              : "Unlock link with your Date of Birth"}
          </DialogTitle>
        </DialogHeader>

        {formStep === 1 && (
          <>
            <p className="text-sm text-copy-light text-center">
              This link may contain content that is not appropriate for all
              audiences.
            </p>
            <Button
              className="h-10"
              onClick={() => {
                if (linkData?.link_lock_date_of_birth) {
                  setFormStep(2);
                } else {
                  handleRedirectToLockedLink(linkData?.link_url);
                }
              }}
            >
              Continue
            </Button>
          </>
        )}

        {/**
         * I have to create a form to accept date of birth and function to calculate and determine
         * that entered date is fit in the age criteria or not.
         */}
        {formStep === 2 && (
          <UserLandingLinkLockDateOfBirthForm
            linkData={linkData}
            handleRedirectToLockedLink={handleRedirectToLockedLink}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserLandingLinkLockDialog;

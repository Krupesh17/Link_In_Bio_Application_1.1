import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserLandingLinkLockDateOfBirthForm } from "../forms";
import { useCreateClick } from "@/tanstack-query/queries";
import { Loader2 } from "lucide-react";

const UserLandingLinkLockDialog = ({
  isUserLandingLinkLockDialog,
  setUserLandingLinkLockDialog,
  linkData,
}) => {
  const [formStep, setFormStep] = useState(1);

  const { mutateAsync: createClick, isPending: isCreatingClick } =
    useCreateClick();

  const handleRedirectToLockedLink = async (url, link_id, user_id) => {
    try {
      await createClick({ link_id, user_id });
      window.open(url, "_blank");
      setUserLandingLinkLockDialog(false);
      setFormStep(1);
    } catch (error) {
      console.error(error?.message);
    }
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
                  handleRedirectToLockedLink(
                    linkData?.link_url,
                    linkData?.id,
                    linkData?.user_id
                  );
                }
              }}
            >
              {isCreatingClick ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </>
        )}

        {formStep === 2 && (
          <UserLandingLinkLockDateOfBirthForm
            linkData={linkData}
            handleRedirectToLockedLink={handleRedirectToLockedLink}
            isCreatingClick={isCreatingClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserLandingLinkLockDialog;

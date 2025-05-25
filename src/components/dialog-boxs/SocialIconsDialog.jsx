import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";
import {
  AddSocialIconForm,
  SocialIconOptionGroupForm,
  SocialIconsForm,
} from "../forms";

const SocialIconsDialog = ({
  isSocialIconsDialogOpen,
  setSocialIconsDialogOpen,
  socialIconsFormState,
  setSocialIconsFormState,
}) => {
  const handleSocialIconDialogClose = (open) => {
    setSocialIconsDialogOpen(open);
    if (!open) {
      setSocialIconsFormState({
        step: 1,
        addIconFormData: null,
      });
    }
  };
  return (
    <Dialog
      open={isSocialIconsDialogOpen}
      onOpenChange={handleSocialIconDialogClose}
    >
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="w-6 h-6 shrink-0 [&_svg]:size-4"
        >
          <Plus weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        {socialIconsFormState.step === 1 && (
          <SocialIconsForm setFormState={setSocialIconsFormState} />
        )}
        {socialIconsFormState.step === 2 && (
          <SocialIconOptionGroupForm setFormState={setSocialIconsFormState} />
        )}
        {socialIconsFormState.step === 3 && (
          <AddSocialIconForm
            formState={socialIconsFormState}
            setFormState={setSocialIconsFormState}
            setSocialIconsDialogOpen={setSocialIconsDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SocialIconsDialog;

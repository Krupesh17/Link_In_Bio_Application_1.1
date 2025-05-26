import React, { useState } from "react";
import { Button } from "./ui/button";
import { Image, User, Waypoints } from "lucide-react";
import {
  EditDisplayNameBioDialog,
  EditProfileImageDialog,
  SocialIconsDialog,
} from "./dialog-boxs";

const AppearanceProfileSection = () => {
  const [isEditProfileImageDialogOpen, setEditProfileImageDialogOpen] =
    useState(false);
  const [isEditDisplayNameBioDialogOpen, setEditDisplayNameBioDialogOpen] =
    useState(false);
  const [isSocialIconsDialogOpen, setSocialIconsDialogOpen] = useState(false);
  const [socialIconsFormState, setSocialIconsFormState] = useState({
    step: 1,
    addIconFormData: null,
  });

  const profileSectionButtonList = [
    {
      icon: <Image />,
      name: "Edit profile image",
      onClick: () => {
        setEditProfileImageDialogOpen(true);
      },
    },
    {
      icon: <User />,
      name: "Edit display name and bio",
      onClick: () => {
        setEditDisplayNameBioDialogOpen(true);
      },
    },
    {
      icon: <Waypoints />,
      name: "Edit social icons",
      onClick: () => {
        setSocialIconsDialogOpen(true);
      },
    },
  ];
  return (
    <section className="max-w-[650px] mx-auto mb-4 mt-8">
      <EditProfileImageDialog
        isEditProfileImageDialogOpen={isEditProfileImageDialogOpen}
        setEditProfileImageDialogOpen={setEditProfileImageDialogOpen}
      />

      <EditDisplayNameBioDialog
        isEditDisplayNameBioDialogOpen={isEditDisplayNameBioDialogOpen}
        setEditDisplayNameBioDialogOpen={setEditDisplayNameBioDialogOpen}
      />

      <SocialIconsDialog
        isSocialIconsDialogOpen={isSocialIconsDialogOpen}
        setSocialIconsDialogOpen={setSocialIconsDialogOpen}
        socialIconsFormState={socialIconsFormState}
        setSocialIconsFormState={setSocialIconsFormState}
      />

      <h2 className="text-xl max-sm:text-lg font-semibold mb-4">Profile</h2>
      <div className="p-4 border border-border rounded-md bg-background">
        <ul className="flex flex-col gap-2">
          {profileSectionButtonList.map((item, index) => {
            return (
              <li key={index}>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full"
                  onClick={item?.onClick}
                >
                  {item?.icon} <span>{item?.name}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AppearanceProfileSection;

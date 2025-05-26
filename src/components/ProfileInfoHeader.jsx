import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AccountAvatar, ProfileInfoEditDropdownMenu, SocialIconBox } from ".";
import { Button } from "./ui/button";
import { Archive, ChevronRight, Loader2, Pencil, Plus } from "lucide-react";
import {
  AddNewLinkDialog,
  EditDisplayNameBioDialog,
  EditProfileImageDialog,
} from "./dialog-boxs";

const ProfileInfoHeader = ({ linksUpdating, setDashboardContentState }) => {
  const { profile } = useSelector((state) => state.user);

  const [isSocialIconsDialogOpen, setSocialIconsDialogOpen] = useState(false);
  const [isEditDisplayNameBioDialogOpen, setEditDisplayNameBioDialogOpen] =
    useState(false);
  const [isEditProfileImageDialogOpen, setEditProfileImageDialogOpen] =
    useState(false);
  const [isAddNewLinkDialogOpen, setAddNewLinkDialogOpen] = useState(false);

  return (
    <section className="max-w-[650px] mx-auto mb-4">
      <EditDisplayNameBioDialog
        isEditDisplayNameBioDialogOpen={isEditDisplayNameBioDialogOpen}
        setEditDisplayNameBioDialogOpen={setEditDisplayNameBioDialogOpen}
      />

      <EditProfileImageDialog
        isEditProfileImageDialogOpen={isEditProfileImageDialogOpen}
        setEditProfileImageDialogOpen={setEditProfileImageDialogOpen}
      />

      <AddNewLinkDialog
        isAddNewLinkDialogOpen={isAddNewLinkDialogOpen}
        setAddNewLinkDialogOpen={setAddNewLinkDialogOpen}
      />

      <div className="flex items-center gap-5 max-sm:gap-2.5 mb-5">
        <div className="relative">
          <AccountAvatar className="w-20 h-20 max-sm:w-16 max-sm:h-16" />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 w-8 h-8 max-sm:w-7 max-sm:h-7 [&_svg]:size-4 rounded-full text-copy-lighter"
            onClick={() => setEditProfileImageDialogOpen(true)}
          >
            <Pencil size={14} />
          </Button>
        </div>

        <div className="mr-auto">
          <Button
            variant="link"
            className="text-xl max-sm:text-lg font-bold p-0"
            onClick={() => setEditDisplayNameBioDialogOpen(true)}
          >
            {profile?.profile_title}
          </Button>

          <a
            className="block text-copy-lighter text-sm max-sm:text-xs mb-2 cursor-pointer hover:underline"
            onClick={() => setEditDisplayNameBioDialogOpen(true)}
          >
            {profile?.bio ? (
              <span className="text-wrap">{profile?.bio}</span>
            ) : (
              <span className="text-current">Add bio</span>
            )}
          </a>

          <SocialIconBox
            isSocialIconsDialogOpen={isSocialIconsDialogOpen}
            setSocialIconsDialogOpen={setSocialIconsDialogOpen}
          />
        </div>
        <ProfileInfoEditDropdownMenu
          setSocialIconsDialogOpen={setSocialIconsDialogOpen}
          setEditDisplayNameBioDialogOpen={setEditDisplayNameBioDialogOpen}
          setEditProfileImageDialogOpen={setEditProfileImageDialogOpen}
        />
      </div>

      <Button
        type="button"
        variant="contrast"
        className="w-full h-10 font font-semibold mb-4"
        onClick={() => setAddNewLinkDialogOpen(true)}
      >
        <Plus className="text-contrast-foreground" /> <span>Add New Link</span>
      </Button>

      <div className="flex items-center gap-1">
        {linksUpdating && (
          <Loader2 className="animate-spin text-copy-lighter" />
        )}
        <Button
          type="button"
          variant="link"
          className="h-10 text-sm px-0 ml-auto"
          onClick={() => setDashboardContentState("archive")}
        >
          <Archive /> <span>View archive</span> <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfoHeader;

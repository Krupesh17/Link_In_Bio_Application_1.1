import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import {
  LinkAddThumbnailImageForm,
  LinkButtonLayoutForm,
  LinkDeleteArchiveForm,
  LinkLockForm,
} from "./forms";

const LinkGroupItemActionExtension = ({
  linkData,
  visible,
  setVisible,
  setLoading,
  actionState,
  setActionState,
}) => {
  return (
    <div className={visible ? "block" : "hidden"}>
      <section className="bg-secondary flex items-center gap-1 py-1 px-4  mb-5">
        <div className="w-full font-medium leading-normal">
          {actionState?.action_form_title}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-6 h-6 shrink-0"
          onClick={() => {
            setVisible(false);
            setActionState(null);
          }}
        >
          <X />
        </Button>
      </section>

      {actionState?.action_form_slug === "link_layout" && (
        <LinkButtonLayoutForm
          linkData={linkData}
          setLoading={setLoading}
          setActionState={setActionState}
        />
      )}

      {actionState?.action_form_slug === "link_thumbnail" && (
        <LinkAddThumbnailImageForm linkData={linkData} />
      )}

      {actionState?.action_form_slug === "link_lock" && (
        <LinkLockForm linkData={linkData} setLoading={setLoading} />
      )}

      {actionState?.action_form_slug === "link_delete_archive" && (
        <LinkDeleteArchiveForm linkData={linkData} setLoading={setLoading} />
      )}
    </div>
  );
};

export default LinkGroupItemActionExtension;

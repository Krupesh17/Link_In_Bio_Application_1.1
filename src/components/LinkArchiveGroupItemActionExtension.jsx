import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { LinkArchivedDeleteForm, LinkArchivedRestoreForm } from "./forms";

const LinkArchiveGroupItemActionExtension = ({
  linkData,
  visible,
  setVisible,
  actionState,
  setActionState,
}) => {
  return (
    <div className={visible ? "block" : "hidden"}>
      <section className="bg-secondary flex items-center gap-1 py-1 px-4 mb-5">
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

      {actionState?.action_form_slug === "restore" && (
        <LinkArchivedRestoreForm linkData={linkData} setVisible={setVisible} />
      )}
      {actionState?.action_form_slug === "delete" && (
        <LinkArchivedDeleteForm linkData={linkData} setVisible={setVisible} />
      )}
    </div>
  );
};

export default LinkArchiveGroupItemActionExtension;

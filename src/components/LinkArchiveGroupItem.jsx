import React, { useState } from "react";
import {
  LinkArchiveGroupItemActionButtonBox,
  LinkArchiveGroupItemActionExtension,
} from ".";

const LinkArchiveGroupItem = ({ linkData }) => {
  const [visibleActionExtension, setVisibleActionExtension] = useState(false);
  const [actionState, setActionState] = useState(null);

  return (
    <li className="bg-background border border-border rounded-md overflow-hidden">
      <section className="p-4 flex items-center gap-2">
        <div className="flex flex-col gap-1 text-sm mr-auto">
          <h4 className="text-copy">{linkData.link_title}</h4>
          <p className="text-copy-lighter">{linkData?.link_url}</p>
        </div>

        <LinkArchiveGroupItemActionButtonBox
          visible={visibleActionExtension}
          setVisible={setVisibleActionExtension}
          actionState={actionState}
          setActionState={setActionState}
          linkData={linkData}
        />
      </section>

      <LinkArchiveGroupItemActionExtension
        linkData={linkData}
        visible={visibleActionExtension}
        setVisible={setVisibleActionExtension}
        actionState={actionState}
        setActionState={setActionState}
      />
    </li>
  );
};

export default LinkArchiveGroupItem;

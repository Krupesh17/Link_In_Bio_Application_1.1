import React from "react";
import { UserLandingLinkButton } from ".";

const UserLandingLinkButtonSection = ({ linksData, buttonAppearance }) => {
  return (
    <div className="mt-5 min-h-10">
      <ul className="flex flex-col gap-4 px-2.5">
        {linksData?.map((link) => {
          if (link?.link_archived || !link?.link_published) return;
          return (
            <li key={link?.id}>
              <UserLandingLinkButton
                linkData={link}
                buttonAppearanceData={buttonAppearance}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserLandingLinkButtonSection;

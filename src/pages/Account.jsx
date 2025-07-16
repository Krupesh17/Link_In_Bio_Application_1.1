import React from "react";
import {
  AccountSettingsMyInformationSection,
  AccountSettingsSecurityAndPrivacySection,
} from "@/components";

const Account = () => {
  return (
    <div>
      <AccountSettingsMyInformationSection />
      <AccountSettingsSecurityAndPrivacySection />
    </div>
  );
};

export default Account;

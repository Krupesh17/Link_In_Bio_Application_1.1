import React, { useEffect } from "react";
import {
  AccountSettingsMyInformationSection,
  AccountSettingsSecurityAndPrivacySection,
} from "@/components";

const Account = () => {
  useEffect(() => {
    document.title = "Account Settings - LinkChain";
  }, []);

  return (
    <div>
      <AccountSettingsMyInformationSection />
      <AccountSettingsSecurityAndPrivacySection />
    </div>
  );
};

export default Account;

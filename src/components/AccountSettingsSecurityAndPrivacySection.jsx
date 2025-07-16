import React from "react";
import { AccountSettingsResetPasswordForm } from "./forms";

const AccountSettingsSecurityAndPrivacySection = () => {
  return (
    <section className="max-w-[650px] mx-auto mb-8">
      <div className="mb-4">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-2">
          Security and privacy
        </h2>
      </div>

      <AccountSettingsResetPasswordForm />
    </section>
  );
};

export default AccountSettingsSecurityAndPrivacySection;

import React from "react";
import { AccountSettingsProfileInfoForm } from "./forms";

const AccountSettingsMyInformationSection = () => {
  return (
    <section className="max-w-[650px] mx-auto my-8">
      <div className="mb-4">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-2">
          My information
        </h2>
      </div>

      <AccountSettingsProfileInfoForm />
    </section>
  );
};

export default AccountSettingsMyInformationSection;

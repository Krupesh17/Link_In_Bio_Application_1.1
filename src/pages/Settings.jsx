import React from "react";
import {
  SettingsUserLandingPageContentProtectionForm,
  SettingsUserLandingPageElementsVisibilityForm,
  SettingsUserLandingPageVisibilityForm,
} from "@/components/forms";

const Settings = () => {
  return (
    <div>
      <SettingsUserLandingPageVisibilityForm />
      <SettingsUserLandingPageElementsVisibilityForm />
      <SettingsUserLandingPageContentProtectionForm />
    </div>
  );
};

export default Settings;

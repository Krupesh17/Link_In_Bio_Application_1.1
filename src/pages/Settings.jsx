import React, { useEffect } from "react";
import {
  SettingsUserLandingPageContentProtectionForm,
  SettingsUserLandingPageElementsVisibilityForm,
  SettingsUserLandingPageShopForm,
  SettingsUserLandingPageVisibilityForm,
} from "@/components/forms";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings - LinkChain";
  }, []);

  return (
    <div>
      <SettingsUserLandingPageVisibilityForm />
      <SettingsUserLandingPageElementsVisibilityForm />
      <SettingsUserLandingPageContentProtectionForm />
      <SettingsUserLandingPageShopForm />
    </div>
  );
};

export default Settings;

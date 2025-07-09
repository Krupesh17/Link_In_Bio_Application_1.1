import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserLandingAgeRestrictionContentProtectionForm } from "./forms";

const UserLandingContentProtectionSection = ({
  userProfileData,
  setContentProtectionStatus,
}) => {
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    if (userProfileData?.sensitive_content_page_protection) {
      setFormStep(1);
      return;
    } else if (userProfileData?.age_restriction_page_protection) {
      setFormStep(2);
      return;
    }
  }, [userProfileData]);

  return (
    <section className="w-full h-full flex items-center">
      <div className="max-w-[450px] w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg mx-auto p-6 space-y-4 shadow-lg overflow-hidden">
        {formStep === 1 && (
          <>
            <h4 className="text-lg text-center font-semibold text-wrap text-white">
              Sensitive Content
            </h4>
            <p className="text-sm text-wrap text-gray-300">
              This LinkChain contains sensitive content which some people may
              find offensive or disturbing.
            </p>
            <Button
              type="button"
              className="w-full h-10 bg-black text-white hover:bg-[#101010]"
              onClick={() => {
                if (userProfileData?.age_restriction_page_protection) {
                  setFormStep(2);
                } else {
                  setContentProtectionStatus(false);
                }
              }}
            >
              Continue
            </Button>
          </>
        )}

        {/* Write a age restriction form component here. */}
        {formStep === 2 && (
          <UserLandingAgeRestrictionContentProtectionForm
            setContentProtectionStatus={setContentProtectionStatus}
          />
        )}
      </div>
    </section>
  );
};

export default UserLandingContentProtectionSection;

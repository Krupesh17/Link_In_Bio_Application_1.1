import React, { useEffect } from "react";
import {
  LandingFeatureSection,
  LandingFooter,
  LandingHeader,
  LandingHowItWorksSection,
  LandingIntroSection,
  LandingPricingSection,
  LandingReadyToChainSection,
} from "@/components";

const Landing = () => {
  useEffect(() => {
    document.title = "LinkChain";
  }, []);

  return (
    <div className="">
      <LandingHeader />
      <LandingIntroSection />
      <LandingFeatureSection />
      <LandingHowItWorksSection />
      <LandingPricingSection />
      <LandingReadyToChainSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;

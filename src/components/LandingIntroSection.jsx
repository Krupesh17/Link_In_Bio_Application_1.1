import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingIntroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="container-box mx-auto px-2.5 py-16 max-lg:text-center lg:flex lg:items-center lg:gap-10">
      <h1 className="font-syne font-bold text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl max-lg:mb-5">
        One Link to Simplify Your Bio.
      </h1>

      <div className="lg:max-w-[500px]">
        <h3 className="text-2xl font-semibold mb-2.5">
          The Custom Landing Page for All Your Links
        </h3>
        <p className="text-copy-lighter mb-5 text-lg">
          Create a landing page to gather all your essential links in one place,
          perfect for enhancing your social media profiles.
        </p>
        <div className="flex lg:items-center max-lg:flex-col gap-2.5">
          <Button
            variant="contrast"
            size="block"
            onClick={() => navigate("/sign-up")}
          >
            Get Started - For Free!
          </Button>
          <p className="text-copy-lighter text-sm">
            Get started in under a minute, absolutely free.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingIntroSection;

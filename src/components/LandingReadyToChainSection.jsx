import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingReadyToChainSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-background w-full overflow-hidden">
      <div className="container-box mx-auto px-2.5 py-16">
        <div className="flex items-center flex-col gap-5">
          <h1 className="text-6xl max-sm:text-5xl font-syne font-bold text-center text-copy text-wrap">
            Ready to Chain Your Links?
          </h1>
          <p className="text-2xl max-sm:text-xl text-copy-light font-medium text-center text-wrap max-w-[1000px]">
            Join thousands of creators, entrepreneurs, and influencers who are
            already using LinkChain. Start free and grow your online presence
            today.
          </p>
          <Button
            type="button"
            variant="contrast"
            className="h-[60px] px-8 font-semibold text-base"
            onClick={() => navigate("/sign-up")}
          >
            Get Started - For Free!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingReadyToChainSection;

import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingReadyToChainSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-background w-full overflow-hidden">
      <div className="container-box mx-auto px-4 lg:py-28 py-20">
        <div className="flex items-center flex-col gap-5 max-w-[700px] mx-auto space-y-4">
          <div className="space-y-2">
            <h1 className="text-5xl max-sm:text-4xl font-medium text-copy text-wrap text-center">
              Ready to Chain Your Links?
            </h1>
            <p className="text-copy-light text-wrap text-center">
              Join thousands of creators, entrepreneurs, and influencers who are
              already using LinkChain to grow their presence.
            </p>
          </div>
          <Button
            type="button"
            variant="contrast"
            className="h-[60px] px-8 font-semibold text-base rounded-full shadow-xl shadow-contrast/20"
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

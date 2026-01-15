import React from "react";
import { CheckCircle2Icon, CircleFadingPlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const freePlanFeatureList = [
  {
    featureTitle: "Unlimited links and products",
    featureAvailable: true,
  },
  {
    featureTitle: "Social media integration",
    featureAvailable: true,
  },
  {
    featureTitle: "Advanced analytics dashboard",
    featureAvailable: true,
  },
  {
    featureTitle: "Content protection & privacy",
    featureAvailable: true,
  },
  {
    featureTitle: "Custom domain (Coming soon)",
    featureAvailable: false,
  },
];

const LandingPricingSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="w-full bg-secondary/40 min-h-[calc(100dvh-80px)] flex"
    >
      <div className="container-box mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="py-12">
          <div className="space-y-5 sm:text-center sm:mb-20 mb-6">
            <h1 className="text-5xl max-sm:text-4xl font-medium text-copy text-wrap">
              Simple, Transparent Pricing
            </h1>
            <p className="text-copy-light text-wrap">
              Everything you need to get started is completely free while we're
              in beta.
            </p>
          </div>
        

        <div className="bg-secondary/80 p-8 w-full max-w-[500px] mx-auto rounded-3xl space-y-4 border border-border/40">
          <span className="text-contrast text-xs bg-contrast/15 py-1 px-2 rounded-full">
            Beta Access
          </span>
          <h4 className="text-6xl font-semibold">Free</h4>
          <p className="text-copy-light">
            Unlimited links and products for all users during our early access
            period.
          </p>
          <div className="space-y-4">
            {freePlanFeatureList?.map((item, index) => (
              <div key={index} className="flex items-center gap-2.5">
                {item?.featureAvailable ? (
                  <CheckCircle2Icon className="text-contrast" />
                ) : (
                  <CircleFadingPlusIcon className="text-copy-lighter/35" />
                )}
                <p
                  className={`text-base ${
                    item?.featureAvailable
                      ? "text-copy"
                      : "text-copy-lighter/35"
                  }`}
                >
                  {item?.featureTitle}
                </p>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="contrast"
            className="h-10 w-full font-semibold"
            onClick={() => navigate("/sign-up")}
          >
            Start Your Free Beta
          </Button>

          <p className="text-sm text-center text-copy-lighter font-medium">
            No credit card required • Setup in 2 minutes
          </p>
        </div></div>
      </div>
    </section>
  );
};

export default LandingPricingSection;

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, X } from "lucide-react";
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
    featureTitle: "Drag & drop customization",
    featureAvailable: true,
  },
  {
    featureTitle: "Custom thumbnails",
    featureAvailable: true,
  },
];

const LandingPricingSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="w-full overflow-hidden"
      style={{
        background: "url('/assets/images/pattern_eyes_3.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
        backgroundPosition: "center",
        backgroundColor: "#780016",
      }}
    >
      <div className="container-box mx-auto px-2.5 py-16">
        <div className="space-y-4 mb-10">
          <h1 className="text-6xl max-sm:text-5xl font-syne font-bold text-center text-[#E9C0E9] text-wrap">
            Start Free Today
          </h1>
          <p className="text-2xl max-sm:text-xl text-white font-medium text-center text-wrap">
            Get full access to all features at no cost while we're in beta
          </p>
        </div>

        <Card className="max-w-[450px] mx-auto py-10 border-none rounded-3xl shadow-xl">
          <CardContent className="p-0">
            <div className="space-y-5 px-10 pb-5 mb-5 border-b border-border">
              <Badge className="bg-contrast text-sm text-contrast-foreground rounded-full shadow-none">
                Beta Access
              </Badge>
              <h2 className="text-6xl font-semibold">Free</h2>
              <p className="text-xl">Unlimited links and products</p>
            </div>

            <div className="space-y-5 px-10">
              <ul className="space-y-5">
                {freePlanFeatureList?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5">
                    <span className="w-8 aspect-square bg-accent flex items-center justify-center rounded-full">
                      {feature?.featureAvailable ? (
                        <Check size={20} />
                      ) : (
                        <X size={20} />
                      )}
                    </span>
                    <span>{feature?.featureTitle}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                variant="contrast"
                className="h-10 w-full font-semibold"
                onClick={() => navigate("/sign-up")}
              >
                Start Your Free Beta
              </Button>

              <p className="text-sm text-center font-medium">
                No credit card required • Setup in 2 minutes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LandingPricingSection;

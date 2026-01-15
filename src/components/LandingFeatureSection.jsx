import React from "react";
import {
  ChartColumnIcon,
  EarthIcon,
  LockKeyholeIcon,
  PaletteIcon,
  Share2Icon,
  ShoppingBagIcon,
} from "lucide-react";

const features = [
  {
    icon: <EarthIcon size={20} className="text-contrast" />,
    title: "Custom Personal URL",
    description:
      "Claim your unique handle and build your brand. One URL that links to everything you do.",
  },
  {
    icon: <ChartColumnIcon size={20} className="text-contrast" />,
    title: "Advanced Analytics",
    description:
      "Track views, clicks, and conversion rates. Understand your audience with detailed insights.",
  },
  {
    icon: <PaletteIcon size={20} className="text-contrast" />,
    title: "Highly Customizable",
    description:
      "Express your style with custom themes, background images, and stylish patterns.",
  },
  {
    icon: <ShoppingBagIcon size={20} className="text-contrast" />,
    title: "Shop Integration",
    description:
      "Directly sell digital products or link your store. Turn your traffic into revenue effortlessly.",
  },
  {
    icon: <LockKeyholeIcon size={20} className="text-contrast" />,
    title: "Safe & Secure",
    description:
      "Your data is protected. Verified API connections ensures your accounts stay safe.",
  },
  {
    icon: <Share2Icon size={20} className="text-contrast" />,
    title: "Add Unlimited Links",
    description:
      "Add as many links as you want. Reorder them anytime with a simple drag-and-drop.",
  },
];

const LandingFeatureSection = () => {
  return (
    <section
      id="features"
      className="w-full bg-secondary/40 min-h-[calc(100dvh-80px)] flex"
    >
      <div className="container-box mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="py-12">
          <div className="space-y-5 sm:text-center sm:mb-20 mb-10">
            <h1 className="text-5xl max-sm:text-4xl font-medium text-copy text-wrap">
              Everything you need to grow
            </h1>
            <p className="text-copy-light text-wrap">
              Powerful tools designed for creators. Minimal setup, maximum
              impact.
            </p>
          </div>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
            {features?.map((item, index) => (
              <div
                key={index}
                className="p-8 bg-card border border-border/40 rounded-3xl space-y-5"
              >
                <div className="bg-accent size-10 rounded-full flex items-center justify-center">
                  {item?.icon}
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-medium text-copy text-xl">
                    {item?.title}
                  </h4>
                  <p className="text-copy-light">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatureSection;

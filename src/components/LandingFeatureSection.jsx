import React from "react";
import {
  ChartColumn,
  Earth,
  Handshake,
  Link,
  Link2,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const featureList = [
  {
    title: "WEB-BASED",
    description:
      "No need to install anything, just access anytime via browser from any device.",
    icon: <Earth strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "PERSONAL URL",
    description:
      "Create your own personalized URL and showcase it proudly in your bio for easy access.",
    icon: <Link2 strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "ELEGANT AND PERFECT",
    description:
      "With a cutting-edge interface, followers clicking on your Url will experience a great visual.",
    icon: <Sparkles strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "UNLIMITED LINKS",
    description:
      "Add as many as links as you wish, change them as often as you want.",
    icon: <Link strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "SOCIAL FIRST",
    description:
      "Cross-link all your social profiles and optimize the engagement across your different channels.",
    icon: <Handshake strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "CUSTOMIZABLE",
    description:
      "Express your style with custom themes, background images, and stylish patterns.",
    icon: <Palette strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "ANALYTICS",
    description:
      "Track clicks on each link with detailed analytics to understand your audience better.",
    icon: <ChartColumn strokeWidth={1} size={60} className="text-contrast" />,
  },
  {
    title: "SAFE",
    description:
      "Your privacy matters. We connect through a verified API and won't ask for your password.",
    icon: <ShieldCheck strokeWidth={1} size={60} className="text-contrast" />,
  },
];

const LandingFeatureSection = () => {
  return (
    <section
      id="features"
      className="w-full"
      style={{
        background: "url('/assets/images/pattern_rope.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
        backgroundPosition: "center",
        backgroundColor: "#00351C",
      }}
    >
      <div className="container-box h-full mx-auto px-2.5 py-16">
        <section className="space-y-4 max-lg:text-center mb-5 lg:hidden">
          <h1 className="text-6xl max-sm:text-5xl font-syne font-bold text-contrast text-wrap">
            Features
          </h1>
          <p className="text-2xl max-sm:text-xl text-white font-medium text-wrap">
            A lot of amazing & cool features
          </p>
        </section>

        <section className="w-full h-full flex items-center justify-center gap-10 max-lg:flex-col max-lg:gap-5">
          <img
            src="/assets/images/iphone.svg"
            className="bg-cover bg-center bg-no-repeat w-[400px] aspect-[10/18]"
          />
          <div className="space-y-10">
            <div className="space-y-4 max-lg:text-center max-lg:hidden">
              <h1 className="text-6xl max-sm:text-5xl font-syne font-bold text-contrast text-wrap">
                Features
              </h1>
              <p className="text-2xl max-sm:text-xl text-white font-medium text-wrap">
                A lot of amazing & cool features
              </p>
            </div>

            <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-[60px]">
              {featureList?.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-20 aspect-square flex items-center justify-center shrink-0 rounded-lg bg-[#00351C] shadow-[-6px_-6px_12px_3px_#00391E,6px_6px_12px_3px_#002D18]">
                    {feature?.icon}
                  </div>
                  <div className="">
                    <h5 className="font-semibold text-[#ffffff]">
                      {feature?.title}
                    </h5>
                    <p className="text-sm text-[#d0d0d0]">
                      {feature?.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
};

export default LandingFeatureSection;

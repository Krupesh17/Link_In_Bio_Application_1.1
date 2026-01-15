import { ArrowRightIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const steps = [
  {
    step: "01",
    title: "Sign Up Free",
    description:
      "Create your account in seconds. No credit card required, no hidden fees. Just choose your unique LinkChain handle.",
    text_content_left: true,
    link_label: "Get started now",
    card: (
      <div className="h-full max-w-[500px] mx-auto bg-secondary/80 rounded-3xl p-8 space-y-4 border border-border/40">
        <div className="space-y-2">
          <span className="bg-accent/40 h-3 rounded-md w-28 block"></span>
          <div className="w-full h-10 rounded-lg bg-accent/40"></div>
        </div>
        <div className="space-y-2">
          <span className="bg-accent/40 h-3 rounded-md w-28 block"></span>
          <div className="w-full h-10 rounded-lg bg-accent/40"></div>
        </div>
        <div className="w-full h-10 rounded-lg bg-contrast text-contrast-foreground flex items-center justify-center font-semibold">
          Create Account
        </div>
      </div>
    ),
  },
  {
    step: "02",
    title: "Add Your Links",
    description:
      "Add your social media profile, resent blog posts, music playlists, or products. Customize with thumbnails and descriptions.",
    text_content_left: false,
    link_label: "Explore customizations",
    card: (
      <div className="h-full max-w-[500px] mx-auto bg-secondary/80 rounded-3xl p-8 space-y-4 border border-border/40">
        <div className="w-full h-10 rounded-lg bg-contrast text-contrast-foreground flex items-center justify-center gap-2 font-semibold">
          <PlusIcon size={20} /> Add
        </div>
        <div className="w-full h-14 rounded-lg border flex items-center gap-2.5 p-3">
          <div className="bg-accent/40 size-8 shrink-0 rounded-md"></div>
          <div className="space-y-1.5 w-full">
            <span className="bg-accent/40 h-3 rounded-md max-w-28 block"></span>
            <span className="bg-accent/40 h-3 rounded-md max-w-60 block"></span>
          </div>
        </div>
        <div className="w-full h-14 rounded-lg border flex items-center gap-2.5 p-3">
          <div className="bg-accent/40 size-8 shrink-0 rounded-md"></div>
          <div className="space-y-1.5 w-full">
            <span className="bg-accent/40 h-3 rounded-md max-w-28 block"></span>
            <span className="bg-accent/40 h-3 rounded-md max-w-60 block"></span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    title: "Share & Grow",
    description:
      "Share your LinkChain URL everywhere and watch your engagement grow with detailed real-time analytics.",
    text_content_left: true,
    link_label: "View dashboard",
    card: (
      <div className="h-full max-w-[500px] mx-auto bg-secondary/80 rounded-3xl p-8 space-y-4 border border-border/40">
        <div className="w-full h-14 rounded-lg border flex items-center justify-between gap-2.5 p-3">
          <span className="bg-accent/40 h-3 rounded-md w-full max-w-60 block"></span>
          <div className="bg-accent/40 h-8 shrink-0 px-3 py-2 text-xs rounded-md">
            Copy
          </div>
        </div>
        <div className="w-full h-14 rounded-lg flex items-center gap-2.5 p-3">
          <div className="w-full flex items-center gap-2.5">
            <div className="bg-accent/40 size-8 shrink-0 rounded-md"></div>
            <span className="bg-accent/40 h-3 rounded-md w-full max-w-60 block"></span>
          </div>
          <ChevronRightIcon size={20} className="text-border" />
        </div>
        <div className="w-full h-14 rounded-lg flex items-center gap-2.5 p-3">
          <div className="w-full flex items-center gap-2.5">
            <div className="bg-accent/40 size-8 shrink-0 rounded-md"></div>
            <span className="bg-accent/40 h-3 rounded-md w-full max-w-60 block"></span>
          </div>
          <ChevronRightIcon size={20} className="text-border" />
        </div>
      </div>
    ),
  },
];
const LandingHowItWorksSection = () => {
  const isScreenLg = useMediaQuery("(max-width: 1023px)");

  return (
    <section
      id="how-it-works"
      className="w-full min-h-[calc(100dvh-80px)] flex"
    >
      <div className="container-box mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="py-28 max-lg:py-12">
          <div className="space-y-5 sm:text-center sm:mb-20 mb-10">
            <h1 className="text-5xl max-sm:text-4xl font-medium text-copy text-wrap">
              Get Started in Minutes
            </h1>
            <p className="text-copy-light text-wrap">
              The simplest way to centralize your online presence.
            </p>
          </div>

          <div className="space-y-20">
            {steps?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 max-lg:grid-cols-1 gap-10"
              >
                <div
                  className={`space-y-3 ${
                    isScreenLg
                      ? "order-1"
                      : item?.text_content_left
                      ? "order-1"
                      : "order-2"
                  } !max-sm:order-1`}
                >
                  <h1 className="text-8xl max-md:text-7xl font-bold text-copy-lighter/10">
                    {item?.step}
                  </h1>
                  <div className="space-y-2">
                    <h4 className="text-2xl max-sm:text-lg font-bold text-copy">
                      {item?.title}
                    </h4>
                    <p className="text-base max-sm:text-sm text-copy-lighter">
                      {item?.description}
                    </p>
                  </div>
                  <Link
                    to={"/sign-up"}
                    className="inline-flex items-center gap-2 text-sm max-sm:text-xs text-contrast hover:underline hover:text-contrast/80 focus-visible:underline"
                  >
                    {item?.link_label} <ArrowRightIcon size={20} />
                  </Link>
                </div>
                <div
                  className={`${
                    isScreenLg
                      ? "order-1"
                      : item?.text_content_left
                      ? "order-2"
                      : "order-1"
                  }`}
                >
                  {item?.card}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorksSection;

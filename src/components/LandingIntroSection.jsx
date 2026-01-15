import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { DotIcon } from "lucide-react";

const joinedUserImages = [
  {
    src: "https://mockmind-api.uifaces.co/content/human/218.jpg",
    alt: "User 1",
  },
  {
    src: "https://mockmind-api.uifaces.co/content/human/221.jpg",
    alt: "User 2",
  },
  {
    src: "https://mockmind-api.uifaces.co/content/human/217.jpg",
    alt: "User 3",
  },
];

const LandingIntroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="container-box mx-auto px-4 min-h-[calc(100dvh-80px)] flex"
    >
      <div className="w-full flex-1 grid grid-cols-2 max-lg:grid-cols-1 gap-2.5 max-lg:gap-16 py-12">
        <div className="w-full h-full flex items-center">
          <div className="space-y-5">
            <div className="bg-muted/50 pr-3 rounded-full inline-flex items-center">
              <DotIcon size={32} className="text-contrast animate-ping" />
              <span className="text-xs">JOIN THE BETA</span>
            </div>
            <h1 className="font-semibold text-7xl max-lg:text-6xl max-md:text-5xl">
              One Link, <span className="text-contrast">Infinite</span>{" "}
              Possibilities
            </h1>
            <p className="text-copy-lighter text-lg">
              Create a stunning, personalized landing page to gather all your
              essential links in one place. Perfect for social media, creators,
              and brands.
            </p>
            <div className="flex items-center max-sm:items-start gap-4 max-sm:gap-8 max-sm:flex-col">
              <Button
                variant="contrast"
                className="h-[60px] max-sm:w-full text-base font-semibold px-8 rounded-full shadow-xl shadow-contrast/20"
                onClick={() => navigate("/sign-up")}
              >
                Get Started - For Free
              </Button>
              <div className="flex items-center space-x-2.5 rounded-lg shadow-md">
                <div className="flex items-center -space-x-2">
                  {joinedUserImages?.map((item, index) => (
                    <img
                      key={index}
                      className="bg-accent size-10 shrink-0 rounded-full border"
                      src={item?.src}
                      alt={item?.alt}
                    />
                  ))}
                </div>
                <span className="font-medium text-base">
                  10k+ creators joined
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <picture>
            {/* WebP for modern browsers */}
            <source
              type="image/webp"
              srcSet="
                /assets/images/mockup-sm.webp 400w,
                /assets/images/mockup-md.webp 600w,
                /assets/images/mockup-lg.webp 800w
              "
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 350px"
            />

            {/* JPG/PNG fallback for old browsers */}
            <source
              type="image/png"
              srcSet="
                /assets/images/mockup-sm.png 400w,
                /assets/images/mockup-md.png 600w,
                /assets/images/mockup-lg.png 800w
              "
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 350px"
            />

            {/* Final fallback */}
            <img
              src="/assets/images/mockup.png"
              alt="Phone mockup showing the LinkChain page interface"
              fetchpriority="high"
              decoding="async"
              className="w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[350px] aspect-[9/18] drop-shadow-[0px_0px_20px_rgba(21,_66,_50,_0.4)]"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default LandingIntroSection;

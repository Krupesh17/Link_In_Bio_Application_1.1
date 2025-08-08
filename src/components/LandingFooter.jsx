import React from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const featureList = [
  {
    featureTitle: "Unlimited Links",
  },
  {
    featureTitle: "Shop Integration",
  },
  {
    featureTitle: "Analytics Dashboard",
  },
  {
    featureTitle: "Content Protection",
  },
];

const buildWithList = [
  {
    title: "React JS",
    slug: "react_js",
    icon_path: "/assets/icons/react_js_icon.svg",
  },
  {
    title: "Supabase",
    slug: "supabase",
    icon_path: "/assets/icons/supabase_icon.svg",
  },
  {
    title: "Tailwind CSS",
    slug: "tailwind_css",
    icon_path: "/assets/icons/tailwind_css_icon.svg",
  },
];

// Work on this 'Footer' component then add 'Dropdown' in Navbar for mobile devices.

const LandingFooter = () => {
  return (
    <footer
      className="w-full overflow-hidden"
      style={{
        background: "url('/assets/images/pattern_squiggle.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
        backgroundPosition: "center",
        backgroundColor: "#502274",
      }}
    >
      <div className="container-box mx-auto px-2.5 pt-10 grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <section className="space-y-4 md:max-w-[450px]">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/icons/link_chain_logo.svg"
              alt="link-chain-logo"
              width={36}
              height={36}
            />
            <h4 className="font-semibold text-xl text-white">LinkChain</h4>
          </div>
          <p className="text-xl text-[#D0D0D0] max-sm:text-lg">
            The modern Link in Bio platform built with React JS and Supabase.
            Create, customize, and share your links effortlessly.
          </p>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-5">
          <div className="text-white">
            <h5 className="text-lg font-semibold mb-5">Features</h5>

            <ul className="space-y-2.5">
              {featureList?.map((feature, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <Check
                    size={20}
                    strokeWidth={2}
                    className="text-success shrink-0"
                  />
                  <span className="text-nowrap">{feature?.featureTitle}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-white space-y-5">
            <h5 className="text-lg font-semibold">Built With</h5>

            <ul className="space-y-2.5">
              {buildWithList?.map((item, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <img
                    src={item?.icon_path}
                    alt={item?.slug}
                    width={20}
                    height={20}
                  />
                  <span className="text-nowrap">{item?.title}</span>
                </li>
              ))}
            </ul>

            <Button
              type="button"
              className="bg-[#121212] hover:bg-[#181818] focus-visible:ring-white"
              onClick={() =>
                window.open(
                  "https://github.com/Krupesh17/Link_In_Bio_Application_1.1",
                  "_blank"
                )
              }
            >
              <img
                src="/assets/icons/git_hub_icon.svg"
                alt="git_hub_icon"
                width={20}
                height={20}
              />
              <span>View on GitHub</span>
            </Button>
          </div>
        </section>
      </div>

      <p className="container-box mx-auto text-[#A0A0A0] font-medium py-5 px-2.5">
        © 2025 LinkChain. A React JS portfolio project.
      </p>
    </footer>
  );
};

export default LandingFooter;

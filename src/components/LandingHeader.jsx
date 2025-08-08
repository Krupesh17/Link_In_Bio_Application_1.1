import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const navbarLinks = [
  {
    name: "Features",
    slug: "features",
  },
  {
    name: "How it Works",
    slug: "how-it-works",
  },
  {
    name: "Pricing",
    slug: "pricing",
  },
];

const LandingHeader = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm">
      <nav className="h-20 container-box mx-auto px-2.5 overflow-hidden flex items-center justify-between">
        <Link
          className="mr-10 flex items-center gap-2.5"
          onClick={() => scrollToSection("hero")}
        >
          <img
            src="/assets/icons/link_chain_logo.svg"
            alt="link-chain-logo"
            width={36}
            height={36}
          />
          <h4 className="font-semibold text-xl">LinkChain</h4>
        </Link>

        <ul className="flex items-center gap-10 max-md:gap-5 max-sm:hidden">
          {navbarLinks?.map((nav_link, index) => (
            <li key={index}>
              <Button
                type="button"
                variant="link"
                className={`p-0 text-sm text-copy-lighter hover:text-copy`}
                onClick={() => scrollToSection(nav_link?.slug)}
              >
                {nav_link?.name}
              </Button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="ghost"
            className="font-semibold"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant="contrast"
            className="font-semibold"
            onClick={() => navigate("/sign-up")}
          >
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;

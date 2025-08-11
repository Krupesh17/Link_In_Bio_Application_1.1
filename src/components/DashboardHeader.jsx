import React from "react";
import { Link as Chain, Settings, Store, Wand2 } from "lucide-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { AccountDropdownMenu, ShareDropdownMenu } from ".";

const navigationLinks = [
  {
    path: "/dashboard",
    slug: "/dashboard",
    link: "Links",
    icon: <Chain size={20} />,
  },
  {
    path: "shop",
    slug: "/shop",
    link: "Shop",
    icon: <Store size={20} />,
  },
  {
    path: "appearance",
    slug: "/appearance",
    link: "Appearance",
    icon: <Wand2 size={20} />,
  },
  {
    path: "settings",
    slug: "/settings",
    link: "Settings",
    icon: <Settings size={20} />,
  },
];

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const match = pathname?.match(/\/[a-z]*$/);
  const currentPath = match[0] === "/" ? "/dashboard" : match[0];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-background border-b border-border">
      <nav className="h-20 px-5 max-sm:px-2.5 overflow-hidden flex items-center relative">
        <Link to="/dashboard" className="mr-10 flex items-center gap-2.5">
          <img
            src="/assets/icons/link_chain_logo.svg"
            alt="link-chain-logo"
            width={36}
            height={36}
          />
          <h4 className="font-semibold text-xl">LinkChain</h4>
        </Link>

        <ul className="flex items-center gap-5 max-md:hidden">
          {navigationLinks?.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={`text-sm flex items-center gap-2 hover:text-copy ${
                    currentPath === item.slug
                      ? "text-copy"
                      : "text-copy-lighter"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.link}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5 ml-auto">
          <ShareDropdownMenu />
          <AccountDropdownMenu />
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;

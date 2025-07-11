import { ChartColumnBig, Eye, Link, Settings, Wand2 } from "lucide-react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipBox } from ".";

const bottomBarTabs = [
  {
    type: "link",
    path: "/dashboard",
    slug: "/dashboard",
    name: "Links",
    icon: <Link size={20} />,
  },
  {
    type: "link",
    path: "appearance",
    slug: "/appearance",
    name: "Appearance",
    icon: <Wand2 size={20} />,
  },
  {
    type: "button",
  },
  {
    type: "link",
    path: "analytics",
    slug: "/analytics",
    name: "Analytics",
    icon: <ChartColumnBig size={20} />,
  },
  {
    type: "link",
    path: "settings",
    slug: "/settings",
    name: "Settings",
    icon: <Settings size={20} />,
  },
];

const BottomTabBar = ({ isPreviewWindowActive, setPreviewWindowActive }) => {
  const { pathname } = useLocation();
  const match = pathname?.match(/\/[a-z]*$/);
  const currentPath = match[0] === "/" ? "/dashboard" : match[0];
  const navigate = useNavigate();

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-background h-[3.75rem] border-t border-border py-2.5 md:hidden">
      <div className="h-10 w-full">
        <ul className="flex items-center gap-1">
          {bottomBarTabs?.map((item, index) => {
            return item.type === "link" ? (
              <li key={index} className="w-full">
                <TooltipBox tooltipText={item.name}>
                  <NavLink
                    to={item.path}
                    className={`text-sm flex items-center justify-center h-10 hover:text-copy ${
                      currentPath === item.slug
                        ? "text-copy"
                        : "text-copy-lighter"
                    }`}
                    onClick={() => {
                      if (isPreviewWindowActive) {
                        setPreviewWindowActive(false);
                      }
                    }}
                  >
                    {item.icon}
                  </NavLink>
                </TooltipBox>
              </li>
            ) : (
              <li
                key={index}
                className="w-full flex items-center justify-center"
              >
                <TooltipBox tooltipText="Preview">
                  <Button
                    className={`rounded-full h-10`}
                    type="button"
                    onClick={() =>
                      setPreviewWindowActive((prevState) => !prevState)
                    }
                  >
                    <Eye />
                  </Button>
                </TooltipBox>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomTabBar;

import React from "react";
import { Outlet } from "react-router-dom";
import { BottomTabBar, DashboardHeader, MobilePreview } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = () => {
  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <DashboardHeader />
      <div className="flex-1 w-full grid grid-cols-[1fr_550px] max-xl:grid-cols-1 overflow-hidden">
        <ScrollArea className="h-full w-full px-5 max-sm:px-2.5">
          <Outlet />
        </ScrollArea>
        <aside className="relative h-full w-full border-l border-l-border flex items-center max-xl:hidden">
          <MobilePreview />
        </aside>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default DashboardLayout;

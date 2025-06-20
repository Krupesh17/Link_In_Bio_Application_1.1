import React from "react";
import { Outlet } from "react-router-dom";
import { BottomTabBar, DashboardHeader, MobilePreview } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = () => {
  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden bg-background">
      <DashboardHeader />
      <div className="flex-1 w-full grid md:grid-cols-[minmax(314px,1fr)_minmax(180px,280px)] lg:grid-cols-[minmax(484px,1fr)_minmax(200px,400px)] xl:grid-cols-[minmax(570px,1fr)_minmax(200px,460px)] overflow-hidden">
        <ScrollArea className="h-full w-full px-5 max-sm:px-2.5">
          <Outlet />
        </ScrollArea>
        <aside className="sticky hidden items-center justify-center gap-6 border-l border-border bg-background md:flex md:p-0 xl:p-12 top-[80px] max-h-[calc(100dvh-80px)]">
          <MobilePreview />
        </aside>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default DashboardLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import { BottomTabBar, DashboardHeader } from "@/components";

const DashboardLayout = () => {
  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <DashboardHeader />
      <Outlet />
      <BottomTabBar />
    </div>
  );
};

export default DashboardLayout;

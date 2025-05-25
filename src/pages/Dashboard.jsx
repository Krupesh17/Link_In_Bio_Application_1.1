import React, { useState } from "react";
import {
  MobilePreview,
  ProfileInfoHeader,
  URLBox,
  LinkGroup,
} from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const [linksNewPositionUpdating, setLinksNewPositionUpdating] =
    useState(false);

  return (
    <div className="flex-1 w-full grid grid-cols-[1fr_550px] max-xl:grid-cols-1 overflow-hidden">
      <ScrollArea className="h-full w-full px-5 max-sm:px-2.5">
        <URLBox />
        <ProfileInfoHeader linksUpdating={linksNewPositionUpdating} />
        <LinkGroup setLinksNewPositionUpdating={setLinksNewPositionUpdating} />
      </ScrollArea>

      <aside className="relative h-full w-full border-l border-l-border flex items-center max-xl:hidden">
        <MobilePreview />
      </aside>
    </div>
  );
};

export default Dashboard;

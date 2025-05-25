import React, { useState } from "react";
import { ProfileInfoHeader, URLBox, LinkGroup } from "@/components";

const Dashboard = () => {
  const [linksNewPositionUpdating, setLinksNewPositionUpdating] =
    useState(false);

  return (
    <div>
      <URLBox />
      <ProfileInfoHeader linksUpdating={linksNewPositionUpdating} />
      <LinkGroup setLinksNewPositionUpdating={setLinksNewPositionUpdating} />
    </div>
  );
};

export default Dashboard;

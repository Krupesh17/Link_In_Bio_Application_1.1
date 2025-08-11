import React, { useEffect, useState } from "react";
import {
  ProfileInfoHeader,
  LinkGroup,
  LinkArchiveGroup,
} from "@/components";

const Dashboard = () => {
  const [linksNewPositionUpdating, setLinksNewPositionUpdating] =
    useState(false);
  const [dashboardContentState, setDashboardContentState] = useState(null);

  useEffect(() => {
    document.title = "Dashboard - LinkChain";
  }, []);

  return (
    <div>
      {!dashboardContentState && (
        <>
          <ProfileInfoHeader
            linksUpdating={linksNewPositionUpdating}
            setDashboardContentState={setDashboardContentState}
          />
          <LinkGroup
            setLinksNewPositionUpdating={setLinksNewPositionUpdating}
          />
        </>
      )}

      {dashboardContentState === "archive" && (
        <LinkArchiveGroup setDashboardContentState={setDashboardContentState} />
      )}
    </div>
  );
};

export default Dashboard;

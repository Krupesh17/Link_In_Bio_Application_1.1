import React, { useState } from "react";
import {
  ProfileInfoHeader,
  URLBox,
  LinkGroup,
  LinkArchiveGroup,
} from "@/components";

// I can fix the issue which happen when we are on Archive, Setting, Appearance page.
// What I have to do is i have to edit code in 'PublicRoute'. 
// The 'PublicRoute' by default send user to '/dashboard' so what i am think is i need 
// to find out from which page user is on before refresh and if there is a previous page 
// then i should send user to that page there is no previous page then i will send user to "/dashboard"

const Dashboard = () => {
  const [linksNewPositionUpdating, setLinksNewPositionUpdating] =
    useState(false);
  const [dashboardContentState, setDashboardContentState] = useState(null);

  return (
    <div>
      <URLBox />
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

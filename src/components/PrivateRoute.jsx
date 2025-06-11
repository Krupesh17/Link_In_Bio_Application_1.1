import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PrivateRoute = () => {
  const { isLoading, user, profile } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return (
      <section className="h-dvh flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </section>
    );
  }

  return user && profile ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

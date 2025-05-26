import React, { useEffect, useRef } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  AccountSetup,
  Appearance,
  ChangePassword,
  Dashboard,
  Error404,
  Landing,
  ResetPassword,
  Settings,
  SignIn,
  SignUp,
} from "./pages";
import { RouterProvider } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./utils/supabase";
import { fetchUserData, clearUserData } from "./redux/features/userSlice";
import { PublicRoute, PrivateRoute } from "./components";
import { DashboardLayout } from "./layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/account-setup",
        element: <AccountSetup />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "appearance",
            element: <Appearance />,
          },
          {
            path: "analytics",
            element: <div>Analytics</div>,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);
  const authListenerRef = useRef(null);

  useEffect(() => {
    if (!authListenerRef.current) {
      authListenerRef.current = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            if (!user && !profile) {
              dispatch(fetchUserData());
            }
          }

          if (event === "SIGNED_OUT" || !session) {
            dispatch(clearUserData());
          }
        }
      );

      return () => {
        authListenerRef.current?.data.subscription.unsubscribe();
        authListenerRef.current = null;
      };
    }
  }, [dispatch, user, profile]);

  // useEffect(() => {
  //   if (!user && !profile) {
  //     dispatch(fetchUserData());
  //   }
  // }, [dispatch, user, profile]);

  return <RouterProvider router={router} />;
}

export default App;

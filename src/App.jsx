import React, { useEffect, useRef } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  AccountSetup,
  Appearance,
  ChangePassword,
  Dashboard,
  Error404,
  Landing,
  UserLanding,
  ResetPassword,
  Settings,
  SignIn,
  SignUp,
  Account,
  VerifyEmailChange,
} from "./pages";
import { RouterProvider } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import supabase from "./utils/supabase";
import {
  fetchUserData,
  clearUserData,
  setInitialized,
} from "./redux/features/userSlice";
import { PublicRoute, PrivateRoute } from "./components";
import { DashboardLayout } from "./layouts";
import { Loader2 } from "lucide-react";

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
    path: "/:username",
    element: <UserLanding />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/verify-email-change",
    element: <VerifyEmailChange />,
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
            path: "account",
            element: <Account />,
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
  {
    path: "/404",
    element: <Error404 />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user, profile, isInitialized } = useSelector((state) => state.user);
  const authListenerRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Check for existing session on app start
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          dispatch(fetchUserData());
        } else {
          dispatch(setInitialized());
        }
      } catch (error) {
        console.error("Error checking session:", error);
        dispatch(setInitialized());
      }
    };

    // Only check session once on app start
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      checkSession();
    }

    // Set up auth listener
    if (!authListenerRef.current) {
      authListenerRef.current = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            if (session && (!user || !profile)) {
              dispatch(fetchUserData());
            }
          }

          if (event === "SIGNED_OUT" || !session) {
            dispatch(clearUserData());
          }
        }
      );
    }

    return () => {
      if (authListenerRef.current) {
        authListenerRef.current.data.subscription.unsubscribe();
        authListenerRef.current = null;
      }
    };
  }, [dispatch, user, profile]);

  // Don't render router until authentication state is determined
  if (!isInitialized) {
    return (
      <section className="h-dvh flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </section>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;

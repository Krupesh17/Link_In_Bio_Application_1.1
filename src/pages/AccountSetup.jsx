import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateAppearance,
  useCreateUserProfile,
} from "@/tanstack-query/queries";
import { fetchUserData } from "@/redux/features/userSlice";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state?.user);

  const { mutateAsync: createUserProfile, isPending: isCreatingUserProfile } =
    useCreateUserProfile();

  const { mutateAsync: createAppearance, isPending: isCreatingAppearance } =
    useCreateAppearance();

  const initiateNewUserProfile = useCallback(async () => {
    try {
      if (!username) {
        throw new Error(
          "Username parameter is missing. Please check the URL and try again."
        );
      }

      //📌 To be safe we can create new method which fetches current session and use it here
      // which will return us user-data which we can use for creating new profile.

      const userProfileData = await createUserProfile({
        user_id: user?.id,
        name: user?.user_metadata?.name,
        username: username,
        profile_title: user?.user_metadata?.name,
      });

      const userLinkChainPageAppearanceData = await createAppearance({
        user_id: user?.id,
        social_icons_position: "top",
        username: username,
      });

      if (userProfileData && userLinkChainPageAppearanceData) {
        dispatch(fetchUserData());
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      setError(error.message);
    }
  }, [username, createUserProfile, navigate, dispatch]);

  useEffect(() => {
    initiateNewUserProfile();
  }, [username, initiateNewUserProfile]);

  return (
    <section className="h-dvh flex items-center px-5">
      <div className="max-w-[440px] mx-auto text-center flex items-center justify-center flex-col gap-1">
        {error ? (
          <>
            <CircleAlert className="text-error mb-2" size={32} />
            <p className="font-medium mb-2">
              Error: <span>{error}</span>
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full"
              onClick={() => navigate("/", { replace: true })}
            >
              Back to LinkChain
            </Button>
          </>
        ) : isCreatingUserProfile || isCreatingAppearance ? (
          <>
            <Loader2 className="animate-spin" />
            <p className="font-medium">
              Profile setup is currently in progress.
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 className="text-success" size={32} />
            <p className="font-medium">Profile setup has been completed.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default AccountSetup;

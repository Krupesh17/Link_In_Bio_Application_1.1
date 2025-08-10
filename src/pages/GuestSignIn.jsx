import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignIn } from "@/tanstack-query/queries";

const GuestSignIn = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const [isError, setIsError] = useState(false);

  const { mutateAsync: signIn, isPending: isSignInPending } = useSignIn();

  const handleGuestSignIn = async (email, password) => {
    try {
      const user = await signIn({
        email: email,
        password: password,
      });

      if (user) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(`Sign in failed: ${error?.message}`);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (email && password) {
      handleGuestSignIn(email, password);
    } else {
      setIsError(true);
      navigate("/sign-in", { replace: true });
    }
  }, [email, password, navigate]);

  return (
    <section className="relative h-dvh w-full flex items-center px-5">
      <div className="absolute top-5 flex items-center gap-2.5">
        <img
          src="/assets/icons/link_chain_logo.svg"
          alt="link-chain-logo"
          width={36}
          height={36}
        />
        <h4 className="font-semibold text-xl">LinkChain</h4>
      </div>

      <div className="max-w-[440px] mx-auto text-center flex items-center justify-center flex-col gap-1">
        {isSignInPending ? (
          <>
            <Loader2 className="animate-spin text-copy" />
            <p className="text-center text-lg font-medium text-copy-light">
              Guest sign-in is underway. Please wait while the authentication
              process completes.
            </p>
          </>
        ) : isError ? (
          <>
            <img
              src="/assets/icons/pensive_face.svg"
              alt="pensive_face"
              className="w-12 h-12"
            />
            <h3 className="text-xl font-semibold">Guest Sign-In Error</h3>
            <p className="text-center text-lg font-medium text-copy-light">
              Guest sign-in attempt failed. Please check credentials and try
              again.
            </p>
          </>
        ) : (
          <>
            <img
              src="/assets/icons/star_eye_face.svg"
              alt="star_eye_face"
              className="w-12 h-12"
            />
            <h3 className="text-xl font-semibold">Guest Sign-In Successful</h3>
            <p className="text-center text-lg font-medium text-copy-light">
              You've signed in successfully. Enjoy your session!
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default GuestSignIn;

import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailChange = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const updateEmailToken = searchParams.get("change_email_token");

  const changeEmailToken = localStorage.getItem("changeEmailToken");

  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/", { replace: true });
    } else {
      if (
        !updateEmailToken ||
        !changeEmailToken ||
        updateEmailToken !== changeEmailToken
      ) {
        localStorage.removeItem("changeEmailToken");
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoading, user, updateEmailToken, changeEmailToken]);

  useEffect(() => {
    document.title = "Email Verification - LinkChain";
  }, []);

  return (
    <section className="w-full h-dvh bg-background flex items-center">
      {isLoading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="max-w-[440px] mx-auto px-5 text-center flex items-center justify-center flex-col">
          <img
            src="/assets/icons/star_eye_face.svg"
            width={60}
            height={60}
            className="mb-2.5"
          />
          <h4 className="font-semibold text-xl text-copy mb-1">
            Email Change Successful
          </h4>
          <p className="text-base text-copy-light">
            Your Email has been changed successfully.
            <br />
            You may now close this browser window.
          </p>
        </div>
      )}
    </section>
  );
};

export default VerifyEmailChange;

import React, { useEffect, useState } from "react";
import { ChangePasswordForm } from "@/components/forms";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");

  const changePasswordToken = localStorage.getItem("changePasswordToken");

  const { user, profile } = useSelector((state) => state.user);

  const [changePasswordState, setChangePasswordState] = useState({
    isSubmitted: false,
    isError: false,
  });

  useEffect(() => {
    if (
      !resetToken ||
      !changePasswordToken ||
      resetToken !== changePasswordToken
    ) {
      localStorage.removeItem("changePasswordToken");
      if (!changePasswordState?.isSubmitted) {
        navigate(user && profile ? "/dashboard" : "/", { replace: true });
      }
    }
  }, [resetToken, changePasswordToken]);

   useEffect(() => {
      document.title = "Change Password - LinkChain";
    }, []);

  return (
    <div
      className={`min-h-dvh ${
        changePasswordState?.isSubmitted ? "flex items-center" : "pt-10"
      }`}
    >
      <section
        className={`max-w-[440px] mx-auto px-2.5 ${
          changePasswordState?.isSubmitted && "hidden"
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2.5">Change Password</h2>
          <p className="text-sm font-medium text-copy-lighter">
            Enter a new password below to change your password.
          </p>
        </div>

        <ChangePasswordForm setChangePasswordState={setChangePasswordState} />
      </section>

      <section
        className={`max-w-[440px] mx-auto px-5 ${
          !changePasswordState?.isSubmitted && "hidden"
        }`}
      >
        <div className="text-center flex items-center justify-center flex-col">
          {changePasswordState?.isError ? (
            <>
              <img
                src="/assets/icons/pensive_face.svg"
                width={60}
                height={60}
                className="mb-2.5"
              />
              <h4 className="font-semibold text-xl text-copy mb-1">
                Oops! Password Change Failed
              </h4>
              <p className="text-base text-copy-light">
                Password change failed. An unexpected error occurred. Please try
                again later.
              </p>
            </>
          ) : (
            <>
              <img
                src="/assets/icons/star_eye_face.svg"
                width={60}
                height={60}
                className="mb-2.5"
              />
              <h4 className="font-semibold text-xl text-copy mb-1">
                Password Change Successful
              </h4>
              <p className="text-base text-copy-light">
                Your password has been changed successfully.
                <br />
                You may now close this browser window.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;

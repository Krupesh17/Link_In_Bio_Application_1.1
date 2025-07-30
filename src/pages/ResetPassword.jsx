import React, { useEffect } from "react";
import { ResetPasswordForm } from "@/components/forms";
import { Link } from "react-router-dom";

const ResetPassword = () => {

   useEffect(() => {
      document.title = "Reset Password - LinkChain";
    }, []);

  return (
    <section className="min-h-dvh pt-10">
      <div className="max-w-[440px] mx-auto px-2.5">
        <div className="text-center mb-8">
          <img
            src="/assets/icons/link_chain_logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="mx-auto mb-2.5"
          />

          <h3 className="text-3xl font-bold mb-2.5">Reset Password</h3>
          
          <p className="text-sm font-medium text-copy-lighter">
            Enter your account email for password reset instructions.
          </p>
        </div>

        <ResetPasswordForm />

        <div className="text-sm text-center mt-2.5">
          <Link
            className="hover:underline focus-visible:underline text-foreground font-semibold"
            to="/sign-in"
          >
            Return to Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

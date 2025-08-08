import React, { useEffect } from "react";
import { SignInForm } from "@/components/forms";
import { Link } from "react-router-dom";

const SignIn = () => {
  useEffect(() => {
    document.title = "Sign In - LinkChain";
  }, []);

  return (
    <section className="min-h-dvh pt-10">
      <div className="max-w-[440px] mx-auto px-2.5">
        <div className="text-center mb-8">
          <Link to={"/"}>
            <img
              src="/assets/icons/link_chain_logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="mx-auto mb-2.5"
            />
          </Link>

          <h3 className="text-3xl font-bold mb-2.5">Welcome back!</h3>

          <p className="text-sm font-medium text-copy-lighter">
            Don't have an account yet?{" "}
            <Link
              className="hover:underline focus-visible:underline text-foreground font-semibold"
              to="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>

        <SignInForm />
      </div>
    </section>
  );
};

export default SignIn;

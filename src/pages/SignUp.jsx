import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckUsernameForm, SignUpForm } from "@/components/forms";

const SignUp = () => {
  const [formState, setFormState] = useState({ step: 1, data: {} });

  useEffect(() => {
    document.title = "Sign Up - LinkChain";
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

          {formState.step === 2 && (
            <p className="inline-flex items-center justify-center gap-1 p-1.5 text-base bg-success/15 border border-success/10 rounded-full font-medium mb-2.5 ">
              <CheckCircle2 className="text-success" size={22} />
              <span className="mr-1 text-success-content">
                {formState?.data?.username} is available.
              </span>
            </p>
          )}

          <h3 className="text-3xl font-bold mb-2.5">
            {formState.step === 1 && "Sign up to LinkChain"}
            {formState.step === 2 && "Let's claim your username"}
          </h3>

          <p className="text-base text-copy-lighter font-medium mb-5">
            {formState.step === 1 && "Claim your free Link in Bio!"}
            {formState.step === 2 && "Sign up to LinkChain, it's free!"}
          </p>
        </div>

        {formState.step === 1 && (
          <CheckUsernameForm setFormState={setFormState} />
        )}

        {formState.step === 2 && (
          <SignUpForm formState={formState} setFormState={setFormState} />
        )}

        <p className="text-sm font-medium text-copy-lighter text-center mt-2.5">
          Already have an account?{" "}
          <Link
            className="hover:underline focus-visible:underline text-foreground font-semibold"
            to="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

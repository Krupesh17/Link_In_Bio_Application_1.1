import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const { user, profile } = useSelector((state) => state.user);

  const handleBackButton = () => {
    if (user && profile) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="h-dvh flex items-center px-5 relative">
      <div className="mx-auto flex items-center gap-2.5 mb-5 absolute top-5 left-5">
        <img
          src="/assets/icons/link_chain_logo.svg"
          alt="link-chain-logo"
          width={36}
          height={36}
        />
        <h4 className="font-semibold text-xl">LinkChain</h4>
      </div>
      <div className="basis-[440px] mx-auto text-center">
        <div className="mb-2.5">
          <img
            src="/assets/images/error_404_broken_chain.svg"
            alt="link-chain-logo"
            className="w-full"
          />
        </div>

        <h1 className="text-3xl max-sm:text-2xl font-extrabold mb-2.5 text-copy">
          PAGE NOT FOUND
        </h1>

        <p className="text-lg max-sm:text-base font-medium text-copy-lighter mb-5">
          The page you are looking for was moved, removed, renamed or might
          never existed.
        </p>
        <Button
          type="button"
          className="rounded-full"
          onClick={handleBackButton}
        >
          Back to LinkChain
        </Button>
      </div>
    </section>
  );
};

export default Error404;

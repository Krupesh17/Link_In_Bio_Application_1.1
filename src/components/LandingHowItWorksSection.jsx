import React from "react";

const LandingHowItWorksSection = () => {
  return (
    <section id="how-it-works" className="w-full">
      <div className="container-box mx-auto px-2.5 py-16">
        <div className="space-y-4 mb-20">
          <h1 className="text-6xl max-sm:text-5xl font-syne font-bold text-center text-copy text-wrap">
            Get Started in Minutes
          </h1>
          <p className="text-2xl max-sm:text-xl text-copy-lighter font-medium text-center text-wrap">
            Creating your LinkChain is simple and straightforward
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-10 max-md:flex-col">
            <img
              src="/assets/images/step_1_create_account_placeholder.svg"
              className="aspect-video max-lg:w-[400px]"
            />
            <div className="space-y-1 mx-auto">
              <h4 className="text-2xl max-sm:text-lg font-bold text-copy">
                Sign Up Free
              </h4>
              <p className="text-base max-sm:text-sm w-[300px] text-copy-lighter">
                Create your account in seconds. No credit card required, no
                hidden fees.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10 max-md:flex-col-reverse">
            <div className="space-y-1 mx-auto">
              <h4 className="text-2xl max-sm:text-lg font-bold text-copy">
                Add Your Links
              </h4>
              <p className="text-base max-sm:text-sm w-[300px] text-copy-lighter">
                Add your social media, links, and products. Customize with
                thumbnails and descriptions.
              </p>
            </div>
            <img
              src="/assets/images/step_2_add_new_link_placeholder.svg"
              className="aspect-video max-lg:w-[400px]"
            />
          </div>

          <div className="flex items-center gap-10 max-md:flex-col">
            <img
              src="/assets/images/step_3_share_your_linkchain_placeholder.svg"
              className="aspect-video max-lg:w-[400px]"
            />
            <div className="space-y-1 mx-auto">
              <h4 className="text-2xl max-sm:text-lg font-bold text-copy">
                Share & Grow
              </h4>
              <p className="text-base max-sm:text-sm w-[300px] text-copy-lighter">
                Share your LinkChain URL everywhere and watch your engagement
                grow with analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorksSection;

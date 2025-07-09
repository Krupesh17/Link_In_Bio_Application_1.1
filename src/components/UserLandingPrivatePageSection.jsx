import React from "react";
import { ArrowRight, Shield, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";

const UserLandingPrivatePageSection = () => {
  const navigate = useNavigate();

  const handleCreateNewLinkChainButton = () => {
    navigate("/sign-up", { replace: true });
  };

  return (
    <section
      className="w-full h-dvh overflow-hidden"
      style={{
        backgroundColor: "#00351c",
        backgroundImage:
          "url('/assets/images/private_user_page_background.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "540px 450px",
      }}
    >
      <div className="w-full h-full overflow-y-auto">
        <div className="max-w-[500px] h-full mx-auto">
          <div className="flex flex-col items-center pt-10 px-2.5">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-4">
              <Shield size="50" strokeWidth={1} />
            </div>

            <h1 className="text-xl font-semibold text-white text-center text-wrap mb-2">
              Privacy Mode On
            </h1>
            <p className="max-w-[400px] w-full text-sm text-white/80 text-center text-wrap mb-4">
              This content is not publicly available
            </p>

            <div className="flex items-center gap-2 text-sm font-medium bg-red-600/30 backdrop-blur-xl border border-red-600/10 rounded-full py-2 px-4">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-red-200">Private Mode Active</span>
            </div>

            <div className="grid gap-4 my-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-white font-medium">Owner's Choice</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        The owner of this LinkChain has set their visibility to
                        private. Only they can see their links and content.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-white font-medium">
                        What You Can Do
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Connect with them on other platforms or ask them to
                        share their links directly if you know them personally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              type="button"
              className="h-10 bg-black text-white rounded-full hover:bg-[#101010] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 mb-4"
              onClick={handleCreateNewLinkChainButton}
            >
              <img
                src="/assets/icons/link_chain_logo.svg"
                alt="link-chain-logo"
                width={24}
                height={24}
              />
              Create Your LinkChain
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLandingPrivatePageSection;

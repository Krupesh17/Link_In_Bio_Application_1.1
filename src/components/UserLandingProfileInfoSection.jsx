import React from "react";
import { AccountAvatar } from ".";

const UserLandingProfileInfoSection = ({
  userProfileData,
  profileLayoutData,
}) => {
  return (
    <>
      {profileLayoutData?.layout === "hero" ? (
        <section className="relative w-full h-auto aspect-square">
          <div
            className="absolute inset-0 bg-gradient-to-t from-[color:var(--gradient-color)] to-transparent to-25%"
            style={{ "--gradient-color": profileLayoutData?.dominatingColor }}
          ></div>

          {userProfileData?.profile_image_visible && (
            <AccountAvatar
              name={userProfileData?.name}
              username={userProfileData?.username}
              profileImageURL={userProfileData?.profile_image_url}
              className="static w-full h-full rounded-none border-none bg-[color:var(--bg-color)]"
              style={{ "--bg-color": profileLayoutData?.dominatingColor }}
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center px-2.5">
            <h1 className="text-xl max-sm:text-lg font-semibold">
              {userProfileData?.name}
            </h1>
            {userProfileData?.profile_bio_visible && (
              <p className="text-base max-sm:text-sm text-center">
                {userProfileData?.bio}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center gap-2 pt-10">
          {userProfileData?.profile_image_visible && (
            <AccountAvatar
              name={userProfileData?.name}
              username={userProfileData?.username}
              profileImageURL={userProfileData?.profile_image_url}
              className="w-24 h-24 max-sm:w-20 max-sm:h-20 bg-black border-none"
            />
          )}
          
          <div className="flex flex-col items-center justify-center gap-2 px-2.5">
            <h1 className="text-xl max-sm:text-lg font-semibold">
              {userProfileData?.name}
            </h1>
            {userProfileData?.profile_bio_visible && (
              <p className="text-base max-sm:text-sm text-center">
                {userProfileData?.bio}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default UserLandingProfileInfoSection;

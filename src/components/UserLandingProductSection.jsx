import React from "react";
import { UserLandingProductButton } from ".";

const UserLandingProductSection = ({ productsData, buttonAppearance }) => {
  return (
    <div className="mt-5 min-h-10">
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-4 px-2.5">
        {productsData?.map((product) => {
          if (!product?.product_published) return;
          return (
            <li key={product?.id}>
              <UserLandingProductButton
                productData={product}
                buttonAppearanceData={buttonAppearance}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserLandingProductSection;

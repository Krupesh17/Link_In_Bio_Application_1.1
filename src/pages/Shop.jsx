import React, { useEffect, useState } from "react";
import { ProductGroup, ShopAddProductSection } from "@/components";

const Shop = () => {
  const [isProductsNewPositionUpdating, setProductsNewPositionUpdating] =
    useState(false);

  useEffect(() => {
    document.title = "Shop - LinkChain";
  }, []);

  return (
    <div>
      <ShopAddProductSection
        isProductsNewPositionUpdating={isProductsNewPositionUpdating}
      />
      <ProductGroup
        setProductsNewPositionUpdating={setProductsNewPositionUpdating}
      />
    </div>
  );
};

export default Shop;

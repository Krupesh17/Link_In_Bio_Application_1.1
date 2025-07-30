import React from "react";
import { currencyList } from "../resources/appData";

const ProductGroupItemTitlePriceSection = ({
  productData,
  setEditProductDialogOpen,
  setProductDataToBeUpdated,
}) => {
  const getCurrencySymbol = (currency) => {
    const response = currencyList?.filter(
      (currencyItem) => currencyItem?.currency === currency
    );

    return response[0]?.currency_symbol;
  };
  return (
    <button
      className="w-full flex flex-col items-start rounded-md overflow-hidden outline-none min-[480px]:h-24 hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring"
      onClick={() => {
        setProductDataToBeUpdated(productData);
        setEditProductDialogOpen(true);
      }}
    >
      <p className="text-sm text-left text-wrap text-ellipsis line-clamp-2 font-bold mb-4">
        {productData?.product_title}
      </p>
      {productData?.product_price && (
        <p className="text-sm text-left text-wrap font-semibold">
          {`${getCurrencySymbol(productData?.product_currency)} ${
            productData?.product_price
          }`}
        </p>
      )}
    </button>
  );
};

export default ProductGroupItemTitlePriceSection;

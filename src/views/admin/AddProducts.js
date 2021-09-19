import React from "react";
import CardAddProducts from "components/Cards/CardAddProducts";

export default function AddProduct() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardAddProducts />
        </div>
      </div>
    </>
  );
}
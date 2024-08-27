import React from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";

function Home() {
  const { data, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="m-auto mt-10">
        <h1 className="pb-10 text-2xl">Latest Products</h1>
        <div className="grid grid-cols-4 gap-4 m-auto">
          {data?.products?.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

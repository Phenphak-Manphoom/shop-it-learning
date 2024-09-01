import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

function Home() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const params = { page };
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="m-auto mt-10">
        <h1 className="pb-10 text-2xl">Latest Products</h1>
        <div className="grid grid-cols-4 gap-5 m-auto">
          {data?.products?.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
        <CustomPagination
          resPerPage={data?.resPerPage}
          filterProductsCount={data?.filterProductsCount}
        />
      </div>
    </>
  );
}

export default Home;

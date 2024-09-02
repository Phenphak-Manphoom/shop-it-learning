import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";

  const params = { page, keyword };
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
      <div
        className={
          keyword
            ? "grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10"
            : "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"
        }
      >
        {keyword && (
          <div className="lg:col-span-1 ">
            <h2 className="text-xl text-center font-semibold ">Filter</h2>
          </div>
        )}

        <div
          className={keyword ? "lg:col-span-2 mr-36" : "lg:col-span-2 m-auto"}
        >
          <h1 className="pb-10 text-2xl">
            {keyword
              ? `${data?.products?.length} Products found with keyword: ${keyword}`
              : "Latest Products"}
          </h1>
          <div
            className={
              keyword ? "grid grid-cols-3 gap-4" : "grid grid-cols-4 gap-6"
            }
          >
            {data?.products?.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>

          <CustomPagination
            resPerPage={data?.resPerPage}
            filterProductsCount={data?.filterProductsCount}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

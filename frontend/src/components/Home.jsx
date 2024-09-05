import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);

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
        className={`min-h-screen  grid grid-cols-1 lg:grid-cols-${
          keyword ? 3 : 2
        }   m-auto max-w-screen-xl`}
      >
        {keyword && (
          <div className="lg:col-span-1 m-auto w-auto max-w-sm my-20">
            <div className="text-xl text-left p-5  font-semibold ">
              <Filters />
            </div>
          </div>
        )}

        <div className="lg:col-span-2 ">
          <h1 className="text-2xl my-5">
            {keyword
              ? `${data?.products?.length} Products found with keyword: ${keyword}`
              : "Latest Products"}
          </h1>
          <div
            className={`grid grid-cols-${keyword ? "3" : "4"} gap-${
              keyword ? "3" : "4"
            } mt-12`}
          >
            {data?.products?.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
          <div className="mt-10">
            <CustomPagination
              resPerPage={data?.resPerPage}
              filterProductsCount={data?.filterProductsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

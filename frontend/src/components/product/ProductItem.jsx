import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import MetaData from "../layout/MetaData";

const ProductItem = ({ product }) => {
  return (
    <>
      <MetaData title={"Product Item"} />
      <div className="w-64  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${product?._id}`}>
          <img
            className="p-8 rounded-t-lg w-52 h-52 m-auto"
            src={
              product?.images[0]
                ? product?.images[0]?.url
                : "/images/default_product.png"
            }
            alt={product?.name}
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/product/${product?._id}`}>
            <h5 className="min-h-[4.5rem] leading-[1.5rem] text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {product?.name}
            </h5>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="22px"
                starSpacing="1px"
              />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {product?.numOfReviews}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ฿{product?.price}
            </span>
            <Link
              to={`/product/${product?._id}`}
              className="text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filterProductsCount }) => {
  const [currentPage, setCurrentPage] = useState();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };
  return (
    <div className="flex justify-center ">
      {filterProductsCount > resPerPage && (
        <Pagination
          className="pagination-custom"
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filterProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="inline-block " // Make sure each pagination item is inline-block
          linkClass="px-2 py-1 bo rounded-full border border-orange-600 px-4 py-2 mx-1 text-gray-700  hover:bg-orange-300 hover:text-black" // Padding for each link for better spacing
          activeLinkClass="bg-orange-500 text-white"
        />
      )}
    </div>
  );
};

export default CustomPagination;

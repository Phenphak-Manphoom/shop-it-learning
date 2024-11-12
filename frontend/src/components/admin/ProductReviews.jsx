import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { Table } from "flowbite-react";
import Pagination from "react-js-pagination";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productApi";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const totalReviews = data?.reviews?.length || 0;
  const displayedReviews = data?.reviews
    ?.filter((review) => review?._id.includes(searchTerm))
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalReviews);

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={"Product Reviews"} />
      <div className="flex justify-center my-5">
        <div className="w-full lg:w-6/12">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label
                htmlFor="productId_field"
                className="block text-gray-700 mb-1"
              >
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
      {data?.reviews?.length > 0 ? (
        <div className="flex flex-col items-center min-h-screen">
          <h1 className="my-5 text-xl font-bold text-left w-full max-w-4xl px-4">
            {totalReviews} Reviews
          </h1>{" "}
          {/* Show Entries and Search */}
          <div className="flex justify-between  w-full max-w-4xl px-4 mb-4">
            <div className="flex items-center">
              <label className="mr-2">Show</label>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-1"
              >
                {[5, 10, 25].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              <span className="ml-2">entries</span>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="w-full max-w-4xl px-4 mb-5 ">
            <Table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <Table.Head>
                {["Review ID", "Rating", "Comment", "User", "Actions"].map(
                  (label) => (
                    <Table.HeadCell key={label}>{label}</Table.HeadCell>
                  )
                )}
              </Table.Head>
              <Table.Body className="bg-white divide-y divide-gray-200 ">
                {displayedReviews?.length > 0 ? (
                  displayedReviews.map((review) => (
                    <Table.Row key={review._id}>
                      <Table.Cell>{review?._id}</Table.Cell>
                      <Table.Cell>{review?.rating}</Table.Cell>
                      <Table.Cell>{review?.comment}</Table.Cell>
                      <Table.Cell>{review?.user?.name}</Table.Cell>

                      <Table.Cell className="flex justify-start">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => deleteReviewHandler(review?._id)}
                          disabled={isDeleteLoading}
                        >
                          <FaTrash className="w-5 h-5 inline" />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      className="text-center py-4 text-2xl font-medium"
                    >
                      You have no orders yet
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>

              {/* Table Footer */}
              <Table.Head>
                {["Review ID", "Rating", "Comment", "User", "Actions"].map(
                  (label) => (
                    <Table.HeadCell key={label}>{label}</Table.HeadCell>
                  )
                )}
              </Table.Head>
            </Table>
          </div>
          {/* Showing entries */}
          <div className="w-full max-w-4xl px-4 flex justify-between">
            <div>
              Showing {startEntry} to {endEntry} of {totalReviews} entries
            </div>
          </div>
          {/* Pagination */}
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={entriesPerPage}
            totalItemsCount={totalReviews}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="inline-block"
            linkClass="px-2 py-1 border border-gray-300 rounded-md mx-1 text-gray-700 hover:bg-gray-200"
            activeLinkClass="bg-gray-300"
          />
        </div>
      ) : (
        <p className="mt-5 text-center">No Reviews</p>
      )}
    </AdminLayout>
  );
};

export default ProductReviews;

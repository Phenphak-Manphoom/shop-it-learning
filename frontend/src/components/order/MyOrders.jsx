import React, { useEffect, useState } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { Table } from "flowbite-react";
import { FaEye, FaPrint } from "react-icons/fa";
import Pagination from "react-js-pagination";

const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderSuccess = searchParams.get("order_success");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const totalOrders = data?.orders?.length || 0;
  const displayedOrders = data?.orders
    ?.filter((order) => order?._id.includes(searchTerm))
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalOrders);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center">
      <MetaData title={"My Orders"} />
      <h1 className="my-5 text-xl font-bold text-left w-full max-w-4xl px-4">
        {totalOrders} Orders
      </h1>{" "}
      {/* ปรับที่นี่ */}
      {/* Show Entries and Search */}
      <div className="flex justify-between mb-4 w-full max-w-4xl px-4">
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
      <div className="w-full max-w-4xl px-4 mb-5">
        <Table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <Table.Head>
            {["ID", "Amount", "Payment Status", "Order Status", "Actions"].map(
              (label) => (
                <Table.HeadCell key={label}>{label}</Table.HeadCell>
              )
            )}
          </Table.Head>
          <Table.Body className="bg-white divide-y divide-gray-200">
            {displayedOrders?.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>{order?._id}</Table.Cell>
                <Table.Cell>฿{order?.totalAmount}</Table.Cell>
                <Table.Cell>
                  {order?.paymentInfo?.status?.toUpperCase()}
                </Table.Cell>
                <Table.Cell>{order?.orderStatus}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/me/order/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    <FaEye className="w-5 h-5 inline" />
                  </Link>
                  <Link
                    to={`/invoice/order/${order._id}`}
                    className="text-green-600 hover:underline ml-2"
                  >
                    <FaPrint className="w-5 h-5 inline" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {/* Table Footer */}
          <Table.Head>
            {["ID", "Amount", "Payment Status", "Order Status", "Actions"].map(
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
          Showing {startEntry} to {endEntry} of {totalOrders} entries
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={entriesPerPage}
        totalItemsCount={totalOrders}
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
  );
};

export default MyOrders;

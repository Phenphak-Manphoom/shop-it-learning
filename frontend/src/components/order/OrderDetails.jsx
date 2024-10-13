import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Order Details"} />
      <div className="flex justify-center mb-10">
        <div className="w-full lg:w-9/12 mt-5 order-details">
          <div className="flex justify-between items-center">
            <h3 className="mt-5 mb-4 text-3xl font-medium">
              Your Order Details
            </h3>
            <a
              className="btn btn-success bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              href="/invoice/order/order-id"
            >
              <i className="fa fa-print"></i> Invoice
            </a>
          </div>

          <table className="table-auto w-full border border-gray-300">
            <tbody>
              <tr>
                <th className="text-left p-2 border border-gray-300">ID</th>
                <td className="p-2 border border-gray-300">{order?._id}</td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">Status</th>
                <td
                  className={
                    String(orderStatus).includes("Delivered")
                      ? "p-2 border border-gray-300 text-green-500 font-bold"
                      : "p-2 border border-gray-300 text-red-500 font-bold"
                  }
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">Date</th>
                <td className="p-2 border border-gray-300">
                  {new Date(order?.createdAt).toLocaleString("en-US")}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table-auto w-full border border-gray-300">
            <tbody>
              <tr>
                <th className="text-left p-2 border border-gray-300">Name</th>
                <td className="p-2 border border-gray-300">{user?.name}</td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">
                  Phone No
                </th>
                <td className="p-2 border border-gray-300">
                  {shippingInfo?.phoneNo}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">
                  Address
                </th>
                <td className="p-2 border border-gray-300">
                  {shippingInfo?.address},{shippingInfo?.city},{" "}
                  {shippingInfo?.zipCode},{shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table-auto w-full border border-gray-300">
            <tbody>
              <tr>
                <th className="text-left p-2 border border-gray-300">Status</th>
                <td
                  className={
                    isPaid
                      ? "p-2 border border-gray-300 text-green-500 font-bold"
                      : "p-2 border border-gray-300 text-red-500 font-bold"
                  }
                >
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">Method</th>
                <td className="p-2 border border-gray-300">
                  {order?.paymentMethod}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">
                  Stripe ID
                </th>
                <td className="p-2 border border-gray-300">
                  {paymentInfo?.id || "Null"}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-300">
                  Amount Paid
                </th>
                <td className="p-2 border border-gray-300">฿{totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Order Items:</h3>

          <hr className="my-4" />

          <div className="cart-item my-1">
            {orderItems?.map((item) => (
              <div className="flex flex-wrap my-7">
                <div className="w-1/2 lg:w-1/6">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-11 w-16"
                  />
                </div>
                <div className="w-full lg:w-5/12">
                  <Link
                    to={`/products/${item?.product}`}
                    className="text-blue-500"
                  >
                    {item?.name}
                  </Link>
                </div>
                <div className="w-1/2 lg:w-1/6 mt-4 lg:mt-0">
                  <p>฿{item?.price}</p>
                </div>
                <div className="w-1/2 lg:w-1/4 mt-4 lg:mt-0">
                  <p>{item?.quantity} Piece(s)</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-10" />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";

import AdminLayout from "../layout/AdminLayout";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const { data } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

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
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order updated");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };
  return (
    <AdminLayout>
      <MetaData title={"Process Order"} />
      <div className="flex flex-wrap justify-around mb-20">
        <div className="w-full lg:w-8/12 order-details ">
          <h3 className="mt-5 mb-4 text-2xl font-semibold">Order Details</h3>

          <table className="table-auto w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  ID
                </th>
                <td className="px-4 py-2 border-b">{order?._id}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Status
                </th>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
                    String(orderStatus).includes("Delivered")
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }`}
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl font-semibold">Shipping Info</h3>
          <table className="table-auto w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Name
                </th>
                <td className="px-4 py-2 border-b">{user?.name}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Phone No
                </th>
                <td className="px-4 py-2 border-b">{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Address
                </th>
                <td className="px-4 py-2 border-b">
                  {" "}
                  {shippingInfo?.address}, {shippingInfo?.city},{" "}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl font-semibold">Payment Info</h3>
          <table className="table-auto w-full border border-gray-200">
            <tbody>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Status
                </th>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
                    isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Method
                </th>
                <td className="px-4 py-2 border-b">{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Stripe ID
                </th>
                <td className="px-4 py-2 border-b">
                  {paymentInfo?.id || "Null"}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Amount Paid
                </th>
                <td className="px-4 py-2 border-b">฿{totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4 text-2xl font-semibold">Order Items:</h3>
          <hr />

          <div className="cart-item my-1">
            {orderItems?.map((item) => (
              <div className="flex flex-wrap items-center my-5">
                <div className="w-1/4 lg:w-1/6">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-16 w-16 object-cover"
                  />
                </div>
                <div className="w-1/2 lg:w-5/12">
                  <Link to={`/products/${item?.product}`}>{item?.name}</Link>
                </div>
                <div className="w-1/4 lg:w-1/6 mt-4 lg:mt-0">
                  <p>฿{item?.price}</p>
                </div>
                <div className="w-1/4 lg:w-1/4 mt-4 lg:mt-0">
                  <p>{item?.quantity} Piece(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="w-full lg:w-3/12 mt-5">
          <h4 className="my-4 text-xl font-semibold">Status</h4>

          <div className="mb-3">
            <select
              className="form-select w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => updateOrderHandler(order?._id)}
          >
            Update Status
          </button>

          <h4 className="mt-5 mb-3 text-xl font-semibold">Order Invoice</h4>
          <Link
            to={`/invoice/order/${order?._id}`}
            className="w-full inline-block py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;

import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import SalesChart from "../charts/SalesChart";
const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { error, isLoading, data }] =
    useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={"Admin Dashboard"} />
      <div className="flex justify-start items-center ">
        <div className="mb-3 mr-4">
          <label className="block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="bg-white border border-gray-300 text-gray-900 text-base rounded-md py-1 px-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block"
          />
        </div>
        <div className="mb-3">
          <label className="block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="bg-white border border-gray-300 text-gray-900 text-base rounded-md py-1 px-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block"
          />
        </div>
        <button
          className="btn bg-blue-500 text-white ml-4 mt-3 px-8 py-1 text-center rounded"
          onClick={submitHandler}
        >
          Fetch
        </button>
      </div>

      <div className="flex flex-wrap my-5 pr-4">
        <div className="w-full xl:w-1/2 mb-3 ">
          <div className="card bg-green-500 text-white h-full rounded overflow-hidden mr-3">
            <div className="card-body p-4">
              <div className="text-center text-lg font-semibold">
                Sales
                <br />
                <b>฿{data?.totalSales?.toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-1/2 mb-3">
          <div className="card bg-red-500 text-white h-full rounded overflow-hidden ml-3">
            <div className="card-body p-4">
              <div className="text-center text-lg font-semibold">
                Orders
                <br />
                <b>{data?.totalNumOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalesChart salesData={data?.sales} />

      <div className="mb-24"></div>
    </AdminLayout>
  );
};

export default Dashboard;

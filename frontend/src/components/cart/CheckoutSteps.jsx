import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="box-sizing: border-box flex justify-center mt-5 flex-wrap">
      {shipping ? (
        <Link to="/shipping" className="mt-2 col-12 md:col-3 lg:col-2">
          <div className="relative w-0 h-0 float-left before:content-[''] before:absolute before:border-t-[20px] before:border-l-[15px] before:border-b-[20px] before:border-t-[#fa9c23] before:border-b-[#fa9c23] before:border-l-[#fff] before:mr-[-1px]"></div>
          <div className="m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto bg-[#fa9c23] ">
            Shipping
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#fa9c23] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      ) : (
        <Link to="#!" className="mt-2 col-12 md:col-3 lg:col-2" disabled>
          <div className="float-left w-0 border-t-[20px] border-t-[#eeeeee] border-l-[15px] border-l-white border-b-[20px] border-b-[#eeeeee] -mr-px"></div>
          <div className="bg-[#eeeeee] m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto">
            Shipping
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#eeeeee] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm_order" className="mt-2 col-12 md:col-3 lg:col-2">
          <div className="relative w-0 h-0 float-left before:content-[''] before:absolute before:border-t-[20px] before:border-l-[15px] before:border-b-[20px] before:border-t-[#fa9c23] before:border-b-[#fa9c23] before:border-l-[#fff] before:mr-[-1px]"></div>
          <div className="m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto bg-[#fa9c23] ">
            Confirm Order
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#fa9c23] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      ) : (
        <Link to="#!" className="mt-2 col-12 md:col-3 lg:col-2" disabled>
          <div className="float-left w-0 border-t-[20px] border-t-[#eeeeee] border-l-[15px] border-l-white border-b-[20px] border-b-[#eeeeee] -mr-px"></div>
          <div className="bg-[#eeeeee] m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto">
            Confirm Order
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#eeeeee] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment_method" className="mt-2 col-12 md:col-3 lg:col-2">
          <div className="relative w-0 h-0 float-left before:content-[''] before:absolute before:border-t-[20px] before:border-l-[15px] before:border-b-[20px] before:border-t-[#fa9c23] before:border-b-[#fa9c23] before:border-l-[#fff] before:mr-[-1px]"></div>
          <div className="m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto bg-[#fa9c23] ">
            Payment
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#fa9c23] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      ) : (
        <Link to="#!" className="mt-2 col-12 md:col-3 lg:col-2" disabled>
          <div className="float-left w-0 border-t-[20px] border-t-[#eeeeee] border-l-[15px] border-l-white border-b-[20px] border-b-[#eeeeee] -mr-px"></div>
          <div className="bg-[#eeeeee] m-0 border-0 tracking-wide leading-[30px] px-[15px] py-[5px] text-gray-500 no-underline cursor-default font-bold float-left h-auto">
            Payment
          </div>
          <div className="float-left w-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-[#eeeeee] border-b-[20px] border-b-transparent -ml-px"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;

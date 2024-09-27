import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helper";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItems);
  return (
    <>
      <MetaData title={"Confirm Order Info"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="flex flex-col lg:flex-row justify-evenly mx-40 mt-9">
        <div className="w-full lg:w-2/3 mt-5">
          <h4 className="mb-3 text-lg font-semibold">Shipping Info</h4>
          <div className="pl-2">
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo?.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
              {shippingInfo?.zipCode}, {shippingInfo?.country}
            </p>
          </div>

          <hr className="my-4" />
          <h4 className="mt-4 text-lg font-semibold">Your Cart Items:</h4>
          {cartItems?.map((item) => (
            <>
              <hr className="my-4" />

              <div className="cart-item my-2">
                <div className="flex">
                  <div className="w-1/3 lg:w-1/6">
                    <img src={item?.image} alt="Laptop" className="h-12 w-16" />
                  </div>

                  <div className="w-1/2 lg:w-1/2">
                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  </div>

                  <div className="w-1/3 lg:w-1/3 mt-4 lg:mt-0">
                    <p>
                      {item?.quantity} x ฿{item?.price} ={" "}
                      <b>฿{(item?.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
            </>
          ))}
        </div>

        <div className="w-full lg:w-1/4 my-4">
          <div className="p-4 shadow-lg rounded-md bg-white">
            <h4 className="text-lg font-semibold">Order Summary</h4>
            <hr className="my-4" />

            <p className="flex justify-between">
              Subtotal: <span>฿{itemsPrice}</span>
            </p>
            <p className="flex justify-between">
              Shipping:{" "}
              <span className="order-summary-values">฿{shippingPrice}</span>
            </p>
            <p className="flex justify-between">
              Tax: <span className="order-summary-values">฿{taxPrice}</span>
            </p>

            <hr className="my-4" />

            <p className="flex justify-between">
              Total:{" "}
              <span className="order-summary-values font-bold">
                ฿{totalPrice}
              </span>
            </p>

            <hr className="my-4" />

            <div className="flex justify-center">
              <Link
                to="/payment_method"
                id="checkout_btn"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { calculateOrderCost } from "../../helpers/helper";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);

    if (method === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }

    if (method === "Card") {
      // Stripe Checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };
      stripeCheckoutSession(orderData);
    }
  };
  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="flex justify-center mb-5 mt-14">
        <div className="w-10/12 lg:w-2/5">
          <form
            className="shadow-lg rounded bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Select Payment Method
            </h2>

            <div className="mb-4">
              <input
                className="mr-2"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="text-gray-700" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>

            <div className="mb-4">
              <input
                className="mr-2"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="text-gray-700" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;

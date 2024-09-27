import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const countriesList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
    }
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, zipCode, country }));
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping />
      <div className="flex justify-center my-16 mx-96">
        <div className="w-full md:w-4/5 lg:w-2/3">
          <form
            className="shadow-md rounded-lg bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold mb-4">Shipping Info</h2>

            <div className="mb-4">
              <label
                htmlFor="address_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city_field"
                className="block text-gray-700 font-medium mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="postal_code_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Zip Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="postalCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="country_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Country
              </label>
              <select
                id="country_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList?.map((country) => (
                  <option key={country?.name} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;

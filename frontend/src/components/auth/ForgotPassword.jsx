import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Email Sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div className="flex justify-center wrapper mt-24">
        <div className="w-full md:w-4/5 lg:w-1/2">
          <form
            className="shadow-md rounded-lg bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
            <div className="mt-4">
              <label
                htmlFor="email_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Enter Email
              </label>
              <input
                type="email"
                id="email_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="w-full bg-blue-600 text-white mt-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

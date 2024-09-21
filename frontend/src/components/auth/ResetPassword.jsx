import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password does not match. Try again!");
    }

    const data = { password, confirmPassword };

    resetPassword({ token: params?.token, body: data });
  };

  return (
    <div className="flex justify-center wrapper mt-24">
      <div className="w-full md:w-4/5 lg:w-1/2">
        <form
          className="shadow-md rounded-lg bg-white p-6"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-semibold mb-4">New Password</h2>

          <div className="mb-4">
            <label
              htmlFor="password_field"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm_password_field"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

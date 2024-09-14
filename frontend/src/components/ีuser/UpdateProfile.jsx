import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../layout/UserLayout";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
    };
    updateProfile(userData);
  };

  return (
    <UserLayout>
      <div className="flex justify-center wrapper">
        <div className="w-full md:w-4/5 lg:w-2/3">
          <form
            className="shadow-lg rounded-lg bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <div className="mb-4">
              <label
                htmlFor="name_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_field"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
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
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;

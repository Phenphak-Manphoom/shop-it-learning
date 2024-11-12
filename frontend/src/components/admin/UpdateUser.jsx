import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const { data } = useGetUserDetailsQuery(params?.id);

  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Updated");
      navigate("/admin/users");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: params?.id, body: userData });
  };

  return (
    <AdminLayout>
      <MetaData title={"Update User"} />
      <div className="flex justify-center">
        <div className="w-10/12 lg:w-8/12">
          <form className="shadow-lg p-8 rounded-md" onSubmit={submitHandler}>
            <h2 className="text-2xl font-semibold mb-4">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="block text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role_field"
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;

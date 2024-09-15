/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Avatar Uploaded");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <UserLayout>
      <div className="flex justify-center wrapper">
        <div className="w-full md:w-4/5 lg:w-2/3">
          <form
            className="shadow-md rounded-xl bg-white p-6"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-semibold mb-4">Upload Avatar</h2>

            <div className="mb-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <figure className="avatar">
                    <img
                      src={avatarPreview}
                      className="rounded-full h-14 w-16"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="customFile"
                  >
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;

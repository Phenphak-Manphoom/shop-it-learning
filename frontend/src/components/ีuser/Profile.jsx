import React from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <MetaData title={"Your Profile"} />
      <div className="flex flex-col md:flex-row justify-around mt-5 ">
        <div className="w-full md:w-1/4">
          <figure className="avatar">
            <img
              className="rounded-full  w-52 h-52"
              src={
                user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
              }
              alt={user?.name}
            />
          </figure>
        </div>

        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h4 className="text-lg font-semibold">Full Name</h4>
          <p className="text-gray-700">{user?.name}</p>

          <h4 className="text-lg font-semibold mt-4">Email Address</h4>
          <p className="text-gray-700">{user?.email}</p>

          <h4 className="text-lg font-semibold mt-4">Joined On</h4>
          <p className="text-gray-700">{user?.createdAt?.substring(0, 10)}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;

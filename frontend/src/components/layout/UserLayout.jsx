import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "profile",
      url: "/me/profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];
  return (
    <>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center font-bold text-3xl">User Setting</h2>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-evenly text-lg font-medium">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0 ">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="w-full lg:w-2/3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;

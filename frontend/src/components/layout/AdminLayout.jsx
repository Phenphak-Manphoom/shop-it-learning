import React from "react";
import SideMenu from "./SideMenu";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];
  return (
    <>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center font-bold text-3xl">Admin Dashboard</h2>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-evenly text-lg font-medium">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0 ">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="w-full lg:w-3/4 overflow-y-auto px-4 min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

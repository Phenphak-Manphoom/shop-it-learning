import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="mt-10 pl-4">
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`font-bold block px-4 py-2  text-gray-700 hover:bg-gray-100  ${
            activeMenuItem.includes(menuItem.url)
              ? "text-orange-500 bg-gray-100"
              : ""
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          <i className={`${menuItem.icon} fa-fw pr-2`}></i>
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;

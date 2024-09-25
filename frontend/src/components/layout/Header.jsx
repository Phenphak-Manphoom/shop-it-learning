import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-slate-800 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between p-1 m-auto">
        <Link to={"/"}>
          <img src="/images/shopit_logo.png" className="h-15" alt="Shop IT" />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <Search />

        <div
          className={`hidden w-full md:block md:w-auto ${
            isDropdownOpen ? "block" : ""
          }`}
          id="navbar-dropdown"
        >
          <ul className="flex   font-medium   rounded-lg md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to={"/cart"}
                className="flex items-center mt-2  text-white rounded md:bg-transparent md:p-0"
              >
                <span className="pr-0">Cart</span>
                <span className="inline-block bg-orange-600  text-white text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {cartItems?.length}
                </span>
              </Link>
            </li>

            {user ? (
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full  text-white rounded md:border-0 md:p-0 md:w-auto"
                >
                  <figure className="pr-2">
                    <img
                      className="w-9 h-9 rounded-full border-2  border-gray-300"
                      src={
                        user?.avatar
                          ? user?.avatar?.url
                          : "/images/default_avatar.jpg"
                      }
                      alt="User Avatar"
                    />
                  </figure>

                  {user?.name}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="z-10 mt-1 font-medium bg-orange-400   rounded-lg shadow w-40 absolute">
                    <ul className="py-2 text-sm text-slate-200 dark:text-gray-400">
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-slate-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={handleLinkClick}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/me/orders"
                          className="block px-4 py-2 hover:bg-slate-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={handleLinkClick}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/me/profile"
                          className="block px-4 py-2 hover:bg-slate-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={handleLinkClick}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 hover:bg-slate-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              !isLoading && (
                <button
                  type="button"
                  className="text-white bg-orange-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                  <Link to="/login">Login</Link>
                </button>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Table } from "flowbite-react";
import { FaPen, FaTrash } from "react-icons/fa";
import Pagination from "react-js-pagination";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const totalUsers = data?.users?.length || 0;
  const displayedUsers = data?.users
    ?.filter((user) => user?._id.includes(searchTerm))
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalUsers);

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={"All Users"} />
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="my-5 text-xl font-bold text-left w-full max-w-4xl px-4">
          {totalUsers} Users
        </h1>{" "}
        {/* Show Entries and Search */}
        <div className="flex justify-between  w-full max-w-4xl px-4 mb-4">
          <div className="flex items-center">
            <label className="mr-2">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1"
            >
              {[5, 10, 25].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <span className="ml-2">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-1"
          />
        </div>
        <div className="w-full max-w-4xl px-4 mb-5 ">
          <Table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <Table.Head>
              {["ID", "Name", "Email", "Role", "Actions"].map((label) => (
                <Table.HeadCell key={label}>{label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="bg-white divide-y divide-gray-200 ">
              {displayedUsers?.length > 0 ? (
                displayedUsers.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>{user?._id}</Table.Cell>
                    <Table.Cell>{user?.name}</Table.Cell>
                    <Table.Cell>{user?.email}</Table.Cell>
                    <Table.Cell>{user?.role}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/admin/users/${user?._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <FaPen className="w-5 h-5 inline" />
                      </Link>

                      <button
                        className="text-red-600 hover:underline ml-2"
                        onClick={() => deleteUserHandler(user?._id)}
                        disabled={isDeleteLoading}
                      >
                        <FaTrash className="w-5 h-5 inline" />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="text-center py-4 text-2xl font-medium"
                  >
                    You have no users yet
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            {/* Table Footer */}
            <Table.Head>
              {["ID", "Name", "Email", "Role", "Actions"].map((label) => (
                <Table.HeadCell key={label}>{label}</Table.HeadCell>
              ))}
            </Table.Head>
          </Table>
        </div>
        {/* Showing entries */}
        <div className="w-full max-w-4xl px-4 flex justify-between">
          <div>
            Showing {startEntry} to {endEntry} of {totalUsers} entries
          </div>
        </div>
        {/* Pagination */}
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={entriesPerPage}
          totalItemsCount={totalUsers}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="inline-block"
          linkClass="px-2 py-1 border border-gray-300 rounded-md mx-1 text-gray-700 hover:bg-gray-200"
          activeLinkClass="bg-gray-300"
        />
      </div>
    </AdminLayout>
  );
};

export default ListUsers;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });
  const { name, description, price, category, stock, seller } = product;

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        description: data?.product?.description,
        price: data?.product?.price,
        category: data?.product?.category,
        stock: data?.product?.stock,
        seller: data?.product?.seller,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product updated");
      navigate("/admin/products");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: params?.id, body: product });
  };
  return (
    <AdminLayout>
      <MetaData title={"Update Product"} />
      <div className="flex justify-center">
        <div
          className="w-full lg:w-10/12 mt-5 lg:mt-0"
          onSubmit={submitHandler}
        >
          <form className="shadow-lg rounded bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Update Product</h2>

            <div className="mb-3">
              <label
                htmlFor="name_field"
                className="form-label block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control p-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="description_field"
                className="form-label block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description_field"
                rows="8"
                className="form-control p-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="mb-3 w-full md:w-1/2 px-3">
                <label
                  htmlFor="price_field"
                  className="form-label block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control p-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 w-full md:w-1/2 px-3">
                <label
                  htmlFor="stock_field"
                  className="form-label block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control p-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="mb-3 w-full md:w-1/2 px-3">
                <label
                  htmlFor="category_field"
                  className="form-label block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category_field"
                  className="form-select py-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {" "}
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 w-full md:w-1/2 px-3">
                <label
                  htmlFor="seller_field"
                  className="form-label block text-sm font-medium text-gray-700"
                >
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control p-2 block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full mt-2 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productApi";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Images Uploaded");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };
  return (
    <AdminLayout>
      <MetaData title={"Upload Product Images"} />
      <div className="flex justify-center">
        <div className="w-full lg:w-8/12 mt-5 lg:mt-0">
          <form
            className="shadow rounded bg-white p-9"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4 text-xl font-semibold">
              Upload Product Images
            </h2>

            <div className="mb-3">
              <label
                htmlFor="customFile"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Images
              </label>
              <div className="mt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>

              {/* New Images */}
              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-1">
                    {imagesPreview?.map((img) => (
                      <div className="mt-2">
                        <div className="card border rounded shadow">
                          <img
                            src={img}
                            alt="Card"
                            className="p-2 w-24 h-24 object-contain mx-auto"
                          />
                          <button
                            className="bg-red-600 border-red-600 text-white btn w-full py-0 mt-1 rounded"
                            type="button"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded Images */}
              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-1">
                    {uploadedImages?.map((img) => (
                      <div className="mt-2" key={img?.url}>
                        <div className="card border rounded shadow">
                          <img
                            src={img?.url}
                            alt="Card"
                            className="p-2 w-24 h-24 object-contain mx-auto"
                          />
                          <button
                            className="bg-red-600 border-red-600 text-white w-full py-0 mt-1 rounded"
                            type="button"
                            disabled={isLoading || isDeleteLoading}
                            onClick={() => deleteImage(img?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;

import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { toast } from "react-hot-toast";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../../redux/api/productApi";

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation();

  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Posted");
    }
  }, [error, isSuccess]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
    toggleModal();
  };

  return (
    <div>
      {canReview && (
        <button
          type="button"
          onClick={toggleModal}
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-4 mb-2"
        >
          Submit Your Review
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-1/3">
            <div className="p-4">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-2">
                <h5 className="text-xl font-semibold">Submit Review</h5>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    class="h-7 w-7 text-neutral-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body mt-4">
                <div className="star-ratings flex space-x-1">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(e) => setRating(e)}
                  />
                </div>

                <textarea
                  name="review"
                  id="review"
                  className="mt-4 p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <button
                  className="w-full mt-4 bg-blue-500 text-white rounded px-4 py-2"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReview;

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="border p-2">
      <h3 className="text-3xl font-semibold">Filters</h3>
      <hr className="my-3" />

      <h5 className="text-base font-medium mb-2">Price</h5>
      <form id="filter_form" className="px-1" onSubmit={handleButtonClick}>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            className="form-input border rounded p-3 text-center text-lg"
            placeholder="Min ($)"
            name="min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="text"
            className="form-input border rounded p-3 text-center text-lg"
            placeholder="Max ($)"
            name="max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
          <button
            type="submit"
            className="btn bg-orange-500 text-white rounded p-2"
          >
            GO
          </button>
        </div>
      </form>

      <hr className="my-3" />

      <h5 className="text-base font-medium mb-3">Category</h5>
      <div className="mb-2">
        <input
          className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
          type="checkbox"
          name="category"
          id="check4"
          value="Category 1"
        />
        <label
          className="ml-2 text-sm font-medium text-gray-700"
          htmlFor="check4"
        >
          Category 1
        </label>
      </div>
      <div className="mb-2">
        <input
          className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
          type="checkbox"
          name="category"
          id="check5"
          value="Category 2"
        />
        <label
          className="ml-2 text-sm font-medium text-gray-700"
          htmlFor="check5"
        >
          Category 2
        </label>
      </div>

      <hr className="my-3" />

      <h5 className="text-base font-medium mb-3">Ratings</h5>
      <div className="mb-2">
        <input
          className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label
          className="ml-2 text-sm font-medium text-gray-700"
          htmlFor="check7"
        >
          <span className="text-yellow-500">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div className="mb-2">
        <input
          className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label
          className="ml-2 text-sm font-medium text-gray-700"
          htmlFor="check8"
        >
          <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  );
};

export default Filters;

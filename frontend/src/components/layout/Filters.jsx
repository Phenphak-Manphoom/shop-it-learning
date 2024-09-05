import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, []);

  //handle category && ratings filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if (checkbox.checked === false) {
      //delete filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      //set new filter value if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        //append new filter
        searchParams.set(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  //handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
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
      {PRODUCT_CATEGORIES?.map((category) => (
        <div className="mb-2">
          <input
            className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={defaultCheckHandler("category", category)}
            onClick={(e) => handleClick(e.target)}
          />
          <label
            className="ml-2 text-sm font-medium text-gray-700"
            htmlFor="check4"
          >
            {category}
          </label>
        </div>
      ))}

      <hr className="my-3" />

      <h5 className="text-base font-medium mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="mb-2">
          <input
            className="form-check-input h-4 w-4 border-gray-300 rounded-sm"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <label
            className="ml-2 text-sm font-medium text-gray-700"
            htmlFor="check7"
          >
            <span className="text-yellow-500">
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;

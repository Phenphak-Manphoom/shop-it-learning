import React from "react";

function Loader() {
  return (
    <div class="relative flex justify-center items-center mt-36">
      <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-600"></div>
      <img
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        class="rounded-full h-28 w-28"
        alt="Loader img"
      />
    </div>
  );
}

export default Loader;

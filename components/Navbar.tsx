import React from "react";

const Navbar = () => {
  return (
    <div className="text-center py-4 fixed border-b-2 w-full pb-2 uppercase z-50 bg-black">
      <b className="text-[20px]">
        Visualizing what a CNN sees when the dog image is passed through it till
        it makes its prediction
      </b>
      <h3 className="mt-2 bg-white text-black flex flex-col">
        Instead of all the images channels the images has, I only choose to
        display 6 that were the most activated/firedup.
      </h3>
    </div>
  );
};

export default Navbar;

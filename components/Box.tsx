import React from "react";

const Box = ({ text }: { text: string }) => {
  return (
    <div className=" bg-white border-gray-200 text-black text-center flex flex-col items-center  rounded-md">
      <div className="bg-[#4caf50] w-full rounded-t-md h-5"></div>
      <div>
        <div className="text-bold text-[16px] py-2 px-8">{text}</div>
      </div>
      <div className="bg-[#4caf50] w-full rounded-b-md h-5"></div>
    </div>
  );
};

export default Box;

import React from "react";

const BoxPool = ({ text }: { text: string }) => {
  return (
    <div className=" bg-white border-gray-200 text-black text-center flex flex-col items-center  rounded-md">
      <div className="bg-[#460e61] w-full rounded-t-md h-5"></div>
      <div>
        <div className="text-bold text-[16px] px-8 py-2">{text}</div>
      </div>
      <div className="bg-[#460e61] w-full rounded-b-md h-5"></div>
    </div>
  );
};

export default BoxPool;

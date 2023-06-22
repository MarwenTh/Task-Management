import React from "react";
import SvgComponent from "./SvgComponent";
import FirstPage from "./FirstPage";

const Landing = () => {
  return (
    <div className="">
      <div className=" absolute top-0 left-0 w-full h-full z-[-1]">
        <SvgComponent />
      </div>
      <FirstPage />
    </div>
  );
};

export default Landing;

import React from "react";
import InternshipImg from "../Images/internship.png";

const FirstPage = () => {
  return (
    <div>
      <div className=" flex justify-evenly items-center">
        <div className="">
          <div>
            <div className="font-bold text-white w-500 text-3xl font-sans my-7">
              No matter your stage of study, use your talent as a gift !
            </div>
            <div className=" w-400 my-7">
              <p className=" font-normal font-serif">
                Getti gives you the opportunity to have internships in
                start-ups, no matter if you're enrolled in a bachelor, a master,
                you dropped out of uneiversity or you want to take a year off
                your studies.
              </p>
            </div>
            <div className=" relative">
              <input
                type="text"
                placeholder="Email"
                className=" w-400 rounded-lg h-16 bg-transparent border-2"
              />
              <button className=" absolute right-32 top-2">Get Started</button>
            </div>
          </div>
        </div>
        <div className=" w-2/5">
          <img src={InternshipImg} alt="Internship" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FirstPage;

// components/Accordion.js
import React, { useState,useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { TbEyePause } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";

const LayerVisibleVisibilityStateLabelDivMapLink = ({ title, children, onClick, eyeState, visibilityState, labelState, setLabelState }) => {
  
  // useEffect(()=>{
  //   console.log("visibilityState",visibilityState)

  // },[visibilityState])
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-blue-800 text-white pl-0 sm:pl-4   border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none  text-sm sm:text-sm py-0 w-full transition duration-150 ease-in">
        <div className="flex">
          <span className="mr-2">{children}</span>
          <h3
            style={{  marginRight: "10px" }}
            className=" text-white mt-0.5"
          >
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-center mr-2 sm:mr-4 gap-2">
          {/* <span onClick={toggleAccordion} className="cursor-pointer"> 
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          {/* <span className="mr-4 bg-red-400"> */}
          {/* {eyeState &&  (<VscEye className={`${visibilityState ? "bg-red-800": ""} cursor-pointer hover:scale-125`} onClick={onClick} />) } */}
          <span>
            {labelState && (
              <MdOutlineLabel
                onClick={() => setLabelState(false)}
                className=" cursor-pointer hover:scale-125"
              />
            )}
            {!labelState && (
              <MdOutlineLabelOff
                onClick={() => setLabelState(true)}
                className=" cursor-pointer hover:scale-125"
              />
            )}
          </span>
          {eyeState && visibilityState && (
            <TbEye
              className="cursor-pointer hover:scale-125"
              onClick={onClick}
            />
          )}
          {eyeState && !visibilityState && (
            <TbEyePause
              className="cursor-pointer hover:scale-125"
              onClick={onClick}
            />
          )}
          {!eyeState && (
            <TbEyeOff
              className="cursor-pointer hover:scale-125"
              onClick={onClick}
            />
          )}

          {/* </span> */}
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleVisibilityStateLabelDivMapLink;

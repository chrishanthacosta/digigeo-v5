"use client"
// components/Accordion.js
import  { useState,useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Image from 'next/image'
import { FaLock,FaLockOpen  } from "react-icons/fa6";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { TbEyePause } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";

const LayerVisibleLockVisibilityLabelDiv = ({ title, children, onClick, eyeState, onLockClick, lockState, visibilityState, labelState, setLabelState }) => {
  
  // useEffect(( )=>
  // {
  //   console.log("lockState", lockState)
  // }, [lockState])

  return (
    <div>
      <div
        className="relative items-center bg-white flex pl-0 sm:pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm   w-full transition duration-150 ease-in"
      >
        <span className="mr-2">{children}</span>
        <h3  className="sm:mr-[10px] mr-2 text-black w-[10px] m-0">{title}</h3>
        <div className="flex absolute right-0 mr-2 sm:mr-4 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer"> 
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          {/* lock-open-closw */}
          <span>
            {labelState && (<MdOutlineLabel onClick={() => setLabelState(false)}  className=" cursor-pointer hover:scale-125" />)}
            {!labelState && <MdOutlineLabelOff onClick={() => setLabelState(true)} className=" cursor-pointer hover:scale-125" />}
          </span>
           <span className="">
            {!lockState &&  eyeState && visibilityState && (
              <TbEye
                className="cursor-pointer hover:scale-125  "
                onClick={onClick}
              />
            )}
            {!lockState && eyeState && !visibilityState && (
              <TbEyePause
                className="cursor-pointer hover:scale-125  "
                onClick={onClick}
              />
            )}
            {!lockState && !eyeState && (
              <TbEyeOff
                className="cursor-pointer hover:scale-125   "
                onClick={onClick}
              />
            )}
          </span>
          <span className="">
            {lockState && (
              <div className="flex">
                <FaLock onClick={onLockClick} className="  cursor-pointer hover:scale-125"/>
              </div>
            )}
            {!lockState && (
              <div className="flex">
                <FaLockOpen onClick={onLockClick}
                    className="cursor-pointer hover:scale-125"/>
               
                 </div>
            )}
          </span>
        
         
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleLockVisibilityLabelDiv;

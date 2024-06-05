// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";

const AccordionItemWithEyeLabel2 = ({
  title,
  children,
  onClick,
  eyeState,
  labelState,
  setLabelState,
  setIsOpen,
  isOpen,
}) => {
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const eyeClickHandler = () => {
    onClick();
  };

  return (
    <div className={isOpen ? "flex-1" : ""}>
      <div
        // style={{ alignItems: "center" }}
        className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm  w-full transition duration-150 ease-in"
      >
        <h3 style={{ margin: 0, marginRight: "10px" }} className="text-white">
          {title}
        </h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span>
          <Tooltip
            content={"Label On/Off"}
            placement="top"
            color="primary"
            className="bg-[#52525B] text-white "
          >
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
          </Tooltip>
          <Tooltip
            content={"Layer On/Off"}
            placement="top"
            color="primary"
            className="bg-[#52525B] text-white "
          >
            <span className="">
              {eyeState && (
                <TbEye
                  className="cursor-pointer hover:scale-125"
                  onClick={eyeClickHandler}
                />
              )}
              {!eyeState && (
                <TbEyeOff
                  className="cursor-pointer hover:scale-125"
                  onClick={eyeClickHandler}
                />
              )}
            </span>
          </Tooltip>
        </div>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default AccordionItemWithEyeLabel2;

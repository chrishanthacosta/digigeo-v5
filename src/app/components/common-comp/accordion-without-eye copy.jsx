// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const AccordionItemWithOutEye2 = ({
  title,
  children,
  onClick,
  eyeState,
  accordionItemWithOutEyeIsOpen,
  setAccordionItemWithOutIsOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  //  const [accordionItemWithOutEyeIsOpen, setAccordionItemWithOutIsOpen] =
  //    useState(true);
  const toggleAccordion = () => {
    setAccordionItemWithOutIsOpen(!accordionItemWithOutEyeIsOpen);
  };

  const eyeClickHandler = () => {
    onClick();
  };

  return (
    <div className={accordionItemWithOutEyeIsOpen ? "flex-1" : ""}>
      <div
        style={{ alignItems: "center" }}
        className="relative item-center flex  pl-4 border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm   w-full transition duration-150 ease-in"
      >
        <h3 style={{ margin: 0, marginRight: "10px" }}>{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          <span onClick={toggleAccordion} className="cursor-pointer">
            {accordionItemWithOutEyeIsOpen ? (
              <FaChevronDown />
            ) : (
              <FaChevronLeft />
            )}
          </span>
          {/* <span className="">
            {eyeState && (
              <VscEye className="cursor-pointer" onClick={eyeClickHandler} />
            )}
            {!eyeState && (
              <VscEyeClosed
                className="cursor-pointer"
                onClick={eyeClickHandler}
              />
            )}
          </span> */}
        </div>
      </div>
      {accordionItemWithOutEyeIsOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default AccordionItemWithOutEye2;

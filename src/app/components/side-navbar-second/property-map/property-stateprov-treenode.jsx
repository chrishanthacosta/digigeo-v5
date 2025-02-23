// import React from "react";

import Image from "next/image";
import { useState, useEffect } from "react";
import PropertyPropertyNode from "./property-property-tree-node";

const PropertyStateProvNode = ({
  stateProvName,
  propertyNodes,
  propertyid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //console.log("propnodes",propertyNodes)
  }, [propertyNodes]);

  return (
    <div>
      <div
        onClick={handleToggle}
        className="flex hover:bg-slate-200 cursor-pointer bg-white"
      >
        {<span>{isOpen ? "-" : "+"}</span>}

        {stateProvName}
      </div>

      {isOpen && (
        <div className="odd:bg-slate-600" style={{ marginLeft: "20px" }}>
          {propertyNodes?.map((child) => (
            <PropertyPropertyNode
              key={child.label}
              propertyName={child.label}
              location={child.location}
              propertyid={child.propertyid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyStateProvNode;

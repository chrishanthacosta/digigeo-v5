// import React from "react";

import Image from "next/image";
import React, { useState } from "react";
import CompanyStateProvNode from "./company-stateprov-treenode";

    const CompanyCountryNode = ({
      countryName,
      stateProvNodes,
      propertyid,
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      // const hasChildren = node.children && node.children.length > 0;

      const handleToggle = () => {
        setIsOpen(!isOpen);
      };

      return (
        <div>
          <div
            onClick={handleToggle}
            className="flex hover:bg-slate-200 cursor-pointer bg-white"
          >
            {<span>{isOpen ? "-" : "+"}</span>}

            {countryName}
          </div>

          {isOpen && (
            <div className="odd:bg-slate-600" style={{ marginLeft: "20px" }}>
              {stateProvNodes.map((child) => {
                // console.log("child", child)
                return (
                  <CompanyStateProvNode
                    key={child.label}
                    stateProvName={child.label}
                    propertyNodes={child.children}
                    propertyid={child.propertyid}
                  />
                );
              })}
            </div>
          )}
        </div>
      );
    };

  
export default CompanyCountryNode
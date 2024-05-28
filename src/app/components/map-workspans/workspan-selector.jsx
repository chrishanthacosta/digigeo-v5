"use client";

import React, { useState, useEffect } from "react";
import "ol/ol.css";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AreaMapWorkspan } from "./area-map-workspan";
import { PropertiesMapWorkspan } from "./properties-map-workspan";
import { CompanyMapWorkspan } from "./company-map-workspan";
import { LandingMapWorkspan } from "./landing-map-workspan";

export const WorkspanSelector = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
 

  return (
    <div className="h-full">
      <div
        style={{
          display:
            selectedMap === "area" || selectedMap === "no_map"
              ? "block"
              : "none",
        }}
        className=""
      >
        <AreaMapWorkspan />
        {/* <h1>AREA</h1> */}
      </div>
      <div style={{ display: selectedMap === "company" ? "block" : "none" }}>
        <CompanyMapWorkspan />
      </div>
      <div style={{ display: selectedMap === "properties" ? "block" : "none" }}>
        <PropertiesMapWorkspan />
      </div>
      <div style={{ display: selectedMap === "landing" ? "block" : "none" }}>
        <LandingMapWorkspan />
      </div>
    </div>
  );
};

//map type/lyrs/nav/zoom/center/key

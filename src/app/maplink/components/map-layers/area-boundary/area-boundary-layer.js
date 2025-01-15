"use client";
import { useCallback, useRef } from "react";
import { styleFunctionAreaBoundary } from "./area-boundary-style";
import { all } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";

const AreaBoundaryLayer = () => {
  const areaBoundaryImgLayerRef = useRef(null);
  const areaBoundaryImgSourceRef = useRef(null);

  const areaLoaderFunc = useCallback((extent, resolution, projection) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/view_tbl40mapareas`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data[0].json_build_object.features) {
          const features = new GeoJSON().readFeatures(
            json.data[0].json_build_object
          );
          areaBoundaryImgSourceRef.current.addFeatures(features);
        } else {
          console.log("else area map area boundry not loading ");
        }
      });
  }, []);

  return (
    <olLayerVectorImage
      ref={areaBoundaryImgLayerRef}
      style={styleFunctionAreaBoundary}
      zIndex={4}
    >
      <olSourceVector
        ref={areaBoundaryImgSourceRef}
        strategy={all}
        loader={areaLoaderFunc}
      ></olSourceVector>
    </olLayerVectorImage>
  );
};
export default AreaBoundaryLayer;

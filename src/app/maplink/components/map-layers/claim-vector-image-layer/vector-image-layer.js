"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { METERS_PER_UNIT } from "ol/proj/Units";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Style, Text } from "ol/style";

const VectorImageLayer = ({
  cmapClaimLableVisible,
  companyClaimLayerVisible,
  setClaimLayerIsLoading,
  scale,
}) => {
  const claimVectorImgLayerRef = useRef(null);
  const claimVectorImgSourceRef = useRef(null);

  const DOTS_PER_INCH = 72;
  const INCHES_PER_METRE = 39.37;

  const [mapUnits, setmapUnits] = useState("m");

  function inchesPreUnit(unit) {
    return METERS_PER_UNIT[unit] * INCHES_PER_METRE;
  }
  const getMapResolution = (scale, unit) => {
    return scale / (inchesPreUnit(unit) * DOTS_PER_INCH);
  };

  const claimLoaderFunc = useCallback(
    (extent, resolution, projection) => {
      setClaimLayerIsLoading(true);
      const url =
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/view_tbl01_claims_bb` +
        `/${extent.join("/")}`;
      fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.data) {
            if (json.data[0].json_build_object.features) {
              const features = new GeoJSON().readFeatures(
                json.data[0].json_build_object
              );
              claimVectorImgSourceRef.current.addFeatures(features);

              setClaimLayerIsLoading(false);
            }
          }
          setClaimLayerIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setClaimLayerIsLoading(false);
        });
    },
    []
  );

  //claim vector image layer visibility
  useEffect(() => {
    if (companyClaimLayerVisible) {
      claimVectorImgLayerRef.current.setVisible(true);
    } else {
      claimVectorImgLayerRef.current.setVisible(false);
    }
  }, [companyClaimLayerVisible]);

  const styleFunctionClaim = (feature, resolution) => {
    const colour = "#D3D3D3";

    let fill = new Fill({
      color: colour,
      opacity: 1,
    });

    let textObj;

    const claimno = feature.get("claimno");

    textObj = new Text({
      font: "10px serif",
      text: cmapClaimLableVisible ? claimno : "",
      offsetX: 2,
      offsetY: -13,
    });

    const style = new Style({
      stroke: new Stroke({
        color: "#707070",
        width: 1,
      }),

      text: textObj,
      fill,
    });

    return style;
  };
  return (
    <olLayerVectorImage
      ref={claimVectorImgLayerRef}
      style={styleFunctionClaim}
      zIndex={0}
      // minResolution={0}
      // maxResolution={
      //   getMapResolution(scale?.claimscale ?? 350000, mapUnits) ?? 150
      // }
    >
      <olSourceVector
        ref={claimVectorImgSourceRef}
        strategy={bbox}
        loader={claimLoaderFunc}
      ></olSourceVector>
    </olLayerVectorImage>
  );
};
export default VectorImageLayer;

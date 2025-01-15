"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { svgZone } from "@/app/components/maps/company-map";
import { svgDeposit, svgHisMine, svgOccurence, svgOpMine } from "./assets-svg";
import { createTextStyle } from "./assets-layer-style";

const AssetsLayer = ({
  companyName,
  setAssetsExtend,
  setAssetsCount,
  cmapAssetLableVisible,
  companyAssetLayerVisible,
  companyAssetOpMineVisible,
  companyAssetDepositsVisible,
  companyAssetZoneVisible,
  companyAssetHistoricalVisible,
  companyAssetOccurrenceVisible,
  setAssetsIsLoading,
  areaId,
  propertyId,
}) => {
  const assetLayerRef = useRef(null);
  const assetSourceRef = useRef(null);
  const [maxResolutionAssets, setmaxResolutionAssets] = useState(1000);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetOpMineVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [companyAssetOpMineVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetDepositsVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [companyAssetDepositsVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetZoneVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [companyAssetZoneVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetHistoricalVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [companyAssetHistoricalVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (companyAssetOccurrenceVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [companyAssetOccurrenceVisible]);

  const assetLoaderFunc = useCallback(
    (extent, resolution, projection) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assetgeom_bycompany/${companyName}`;
      // setAssetsLayerLoading("loading");
      setAssetsIsLoading(true),
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
            if (json.data) {
              if (json.data[0].json_build_object.features) {
                const features = new GeoJSON().readFeatures(
                  json.data[0].json_build_object
                );

                assetSourceRef.current.clear();
                assetSourceRef.current.addFeatures(features);

                const extent = assetSourceRef.current.getExtent();
                setAssetsExtend(extent);
                setAssetsCount(features.length);
                setAssetsIsLoading(false);
              }
              setAssetsIsLoading(false);
            }
            setAssetsIsLoading(false);
            // setAssetsLayerLoading("loaded");
          })
          .catch((error) => {
            // setAssetsLayerLoading("error");
            setAssetsCount(0);
            setAssetsIsLoading(false);
          });
    },
    [companyName]
  );

  const assetLoaderFuncProperty = useCallback(
    (extent, resolution, projection) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assetgeom_bycompany_propertyid/${companyName}/${propertyId}`;
      // setAssetsLayerLoading("loading");
      setAssetsIsLoading(true),
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
            if (json.data) {
              if (json.data[0].json_build_object.features) {
                const features = new GeoJSON().readFeatures(
                  json.data[0].json_build_object
                );

                assetSourceRef.current.clear();
                assetSourceRef.current.addFeatures(features);

                const extent = assetSourceRef.current.getExtent();
                setAssetsExtend(extent);
                setAssetsCount(features.length);
                setAssetsIsLoading(false);
              }
              setAssetsIsLoading(false);
            }
            setAssetsIsLoading(false);
            // setAssetsLayerLoading("loaded");
          })
          .catch((error) => {
            // setAssetsLayerLoading("error");
            setAssetsCount(0);
            setAssetsIsLoading(false);
          });
    },
    [companyName, propertyId]
  );

  const assetLoaderFuncArea = useCallback(
    (extent, resolution, projection) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assetgeom_bycompany_areaid_new/${companyName}/${areaId}`;

      setAssetsIsLoading(true),
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
            if (json.data) {
              console.log("json", json);
              if (json.data[0].geojson.features) {
                const features = new GeoJSON().readFeatures(
                  json.data[0].geojson
                );
                console.log("features", features);
                assetSourceRef.current.clear();
                assetSourceRef.current.addFeatures(features);

                const extent = assetSourceRef.current.getExtent();
                setAssetsExtend(extent);
                setAssetsCount(features.length);
                setAssetsIsLoading(false);
              }
            }
          })
          .catch((error) => {
            // setAssetsLayerLoading("error");
            setAssetsCount(0);
            setAssetsIsLoading(false);
          });

      console.log("url", url);
    },
    [companyName, areaId]
  );

  useEffect(() => {
    if (companyName) {
      console.log("companyName", companyName);
      console.log("propertyId", propertyId);
      if (propertyId) {
        assetLoaderFuncProperty();
      }

      if (areaId) {
        assetLoaderFuncArea();
        console.log("areaId", areaId);
      }
      if (!propertyId && !areaId) {
        assetLoaderFunc();
      }
    }
  }, [areaId, companyName, propertyId]);

  useEffect(() => {
    if (companyAssetLayerVisible) {
      assetLayerRef.current?.setVisible(true);
    } else {
      assetLayerRef.current?.setVisible(false);
    }
  }, [companyAssetLayerVisible]);

  const assetTypesColorMappings = [
    { type: "Occurrence", color: "blue", src: "" },
    { type: "Zone", color: "red", src: "svgicons/zone_black.svg" },
    { type: "Refinery", color: "grey", src: "" },
    { type: "Mill", color: "cyan", src: "" },
    { type: "Deposit", color: "pink", src: "svgicons/deposit_black.svg" },
    { type: "Smelter", color: "orange", src: "" },
    { type: "Plant", color: "darkmagenta", src: "" },
    { type: "Tailings", color: "brown", src: "" },
    {
      type: "Operating Mine",
      color: "black",
      src: "svgicons/producing_black.svg",
    },
    {
      type: "Historical Mine",
      color: "green",
      src: "svgicons/past_producer_black.svg",
    },
  ];

  const areaMapAssetVectorLayerStyleFunction = (feature, resolution) => {
    const colour = feature.values_.colour;

    const fill = new Fill({
      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#3399CC",
      width: 1.25,
    });

    let svgScale = 0;
    let radius = 0;

    if (resolution > 1000) {
      svgScale = 0.5;
      radius = 2;
    } else if (resolution > 937.5) {
      svgScale = 0.562;
      radius = 5;
    } else if (resolution > 875) {
      svgScale = 0.625;
      radius = 5;
    } else if (resolution > 750) {
      svgScale = 0.75;
      radius = 5;
    } else if (resolution > 625) {
      svgScale = 0.875;
      radius = 5;
    } else if (resolution > 500) {
      svgScale = 1;
      radius = 5;
    } else if (resolution > 375) {
      svgScale = 1.125;
      radius = 5;
    } else if (resolution > 250) {
      svgScale = 1.25;
      radius = 5;
    } else if (resolution > 125) {
      svgScale = 1.375;
      radius = 5;
    } else {
      svgScale = 1.5;
      radius = 10;
    }
    let image;
    let text;

    if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOccurence),
        scale: svgScale,
      });
    }

    //set text Style

    text = createTextStyle(feature, resolution);

    const st = new Style({
      stroke: new Stroke({
        color: "#021691",
        width: 2,
      }),
      image,
      text: cmapAssetLableVisible ? text : undefined,
      fill,
    });

    return st;
  };

  return (
    <olLayerVector
      ref={assetLayerRef}
      style={areaMapAssetVectorLayerStyleFunction}
      zIndex={3}
      // minResolution={0}
      // maxResolution={maxResolutionAssets}
    >
      <olSourceVector ref={assetSourceRef}></olSourceVector>
    </olLayerVector>
  );
};
export default AssetsLayer;

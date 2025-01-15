import { useCallback, useEffect, useRef, useState } from "react";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { map_tbl_sync_claimlink_VectorLayerStyleFunction } from "./claim-link-style";

const ClaimLinkLayer = ({
  companyName,
  cmapClaimLableVisible,
  companyClaimLayerVisible,
  setClaimLayerIsLoading,
}) => {
  const claimLinkVectorLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const [maxResolutionSyncOutlines, setmaxResolutionSyncOutlines] =
    useState(300);

  useEffect(() => {
    claimLinkVectorLayerRef.current?.setOpacity(0.2);
    claimLinkVectorLayerRef.current?.setStyle(
      map_tbl_sync_claimlink_VectorLayerStyleFunction
    );
  }, [claimLinkVectorLayerRef.current]);

  const syncClaimLinkLoaderFunc = useCallback(
    (extent, resolution, projection) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tbl_sync_claimlink_company/${companyName}`;
      setClaimLayerIsLoading(true);
      fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
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
              //console.log("hit claims3")
              claimLinkSourceRef.current.clear();
              claimLinkSourceRef.current.addFeatures(features);
              setClaimLayerIsLoading(false);
              //console.log("bbsync uni tbl01_claims   features count", features.count);
            }
            setClaimLayerIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setClaimLayerIsLoading(false);
        });
    },
    [companyName]
  );
  useEffect(() => {
    if (companyName) {
      syncClaimLinkLoaderFunc();
    }
  }, [companyName]);
  // //claim link layer visibility
  useEffect(() => {
    if (companyClaimLayerVisible) {
      claimLinkVectorLayerRef.current.setVisible(true);
    } else {
      claimLinkVectorLayerRef.current.setVisible(false);
    }
  }, [companyClaimLayerVisible]);

  return (
    <olLayerVector ref={claimLinkVectorLayerRef}>
      <olSourceVector
        ref={claimLinkSourceRef}
        // loader={syncClaimLinkLoaderFunc}
        // style={areaMap_tbl_sync_claimlink_VectorLayerStyleFunction}
      ></olSourceVector>
    </olLayerVector>
  );
};
export default ClaimLinkLayer;

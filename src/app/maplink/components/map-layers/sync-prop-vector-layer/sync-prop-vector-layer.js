import { useCallback, useEffect, useRef, useState } from "react";
import { commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction } from "./sync-prop-vector-style";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerSyncPropLoading } from "@/store/landing-map-slice";
import { useSyncPropertyLayerVisibility } from "@/store/layer-slice";

const SyncPropVectorLayer = () => {
  const allSyncPropVectorLayerRef = useRef(null);
  const allSyncPropSourceRef = useRef(null);

  const [distance, setDistance] = useState(40);
  const [minDistance, setMinDistance] = useState(20);
  const [syncPropertyFeatures, setsyncPropertyFeatures] = useState();

  useEffect(() => {
    getSyncPropertiesGeometry();
  }, []);

  const setSyncPropLoading = useZustand(
    useLayerSyncPropLoading,
    (state) => state.setSyncPropLoading
  );

  const syncPropertyLayerVisibility = useZustand(
    useSyncPropertyLayerVisibility,
    (state) => state.syncPropertyLayerVisibility
  );

  const getSyncPropertiesGeometry = useCallback(async () => {
    const f = async (limit, offset) => {
      setSyncPropLoading("loading");
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/all_tbl_sync_property`,
        { cache: "force-cache" }
      );
      const d = await res.json();

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      setsyncPropertyFeatures(gj);
      setSyncPropLoading("loaded");
    };
    f(10662, 0).catch(console.error);
  }, []);

  useEffect(() => {
    if (syncPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);

      allSyncPropSourceRef?.current?.addFeatures(e);
    }
  }, [syncPropertyFeatures]);

  //sync property vector layer visibility
  useEffect(() => {
    if (syncPropertyLayerVisibility) {
      allSyncPropVectorLayerRef.current.setVisible(true);
    } else {
      allSyncPropVectorLayerRef.current.setVisible(false);
    }
  }, [syncPropertyLayerVisibility]);

  return (
    <olLayerVector
      ref={allSyncPropVectorLayerRef}
      style={commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction}
    >
      <olSourceCluster distance={distance} minDistance={minDistance}>
        <olSourceVector ref={allSyncPropSourceRef}>
          {/* <PointsAtCoordinates coordinates={coordinates} /> */}
        </olSourceVector>
      </olSourceCluster>
    </olLayerVector>
  );
};
export default SyncPropVectorLayer;

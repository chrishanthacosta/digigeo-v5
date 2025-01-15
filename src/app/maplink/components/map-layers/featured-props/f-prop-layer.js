"use client";
import { bbox, bbox as bboxStrategy } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";

import { useCallback, useEffect, useRef, useState } from "react";
// import { useZustand } from "use-zustand";

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
  Text,
} from "ol/style";

import {
  fPropertyVectorRendererFunc,
  fPropertyVectorRendererFunc_labels,
} from "./fprop-styles";
import { getBottomLeft, getCenter, getHeight, getWidth } from "ol/extent";
import { toContext } from "ol/render";

const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});
const stroke_SelectedProp = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 9,
});

export const areaMApPropertyVectorRendererFuncV2HighlightMapLink = (
  pixelCoordinates,
  state
) => {
  // console.log("sssss", state);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  const flag = state.feature.get("hatchimg");
  if (!flag || height < 1 || width < 1) {
    return;
  }

  // Stitch out country shape from the blue canvas
  context.save();
  const renderContext = toContext(context, {
    pixelRatio: 1,
  });

  renderContext.setFillStrokeStyle(fill, stroke_SelectedProp);
  renderContext.drawGeometry(geometry);

  context.clip();

  // Fill transparent country with the flag image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  //context.drawImage(flag, left, bottom, width*30, height*30);
  const hf = width / (height * 8);
  // context.globalAlpha = 0.4;
  context.drawImage(flag, left, bottom, width * 20, height * hf * 20);
  if (state.resolution < 100) {
    const polcenter = getCenter(extent);
    context.font = "20px Georgia";
    const widthText =
      context.measureText(state.feature.get("sponsors")).width ?? 0;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";

    context.fillText(
      state.feature.get("sponsors") ?? "",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );
  } else if (state.resolution < 400) {
    const polcenter = getCenter(extent);
    context.font = "10px Georgia";
    const widthText =
      context.measureText(state.feature.get("sponsors")).width ?? 0;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";
    context.fillText(
      state.feature.get("sponsors") ?? "",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );
  }

  context.restore();
};

const FPropLayer = ({
  mapRef,
  setfPropRenderCount,
  fPropRenderCount,
  companyId,
  setFpropExtent,
  setFpropCount,
  areaId,
  propertyId,
  setFpropIsLoading,
  selectedProperty,
}) => {
  const fPropVectorLayerRef = useRef(null);
  const fPropSourceRef = useRef(null);
  const fPropSourceLabelRef = useRef(null);
  const fPropVectorLayerLabelRef = useRef(null);
  const [maxResolutionFProp, setmaxResolutionFProp] = useState(1000);

  // const setFPropertyFeatures = useZustand(
  //   useFPropertyFeatures,
  //   (state) => state.setFPropertyFeatures
  // );

  // const setFPropertyLoadingPromise = useZustand(
  //   useFPropertyLoadingPromise,
  //   (state) => state.setFPropertyLoadingPromise
  // );

  // const featuredLayerLableVisibility = useZustand(
  //   useFeaturedLayerLableVisibility,
  //   (state) => state.featuredLayerLableVisibility
  // );

  // const featuredLayerVisibility = useZustand(
  //   useFeaturedLayerVisibility,
  //   (state) => state.featuredLayerVisibility
  // );

  const [featuredProperty, setFPropertyFeatures] = useState(null);
  const [prevSelFeaturedProps, setprevSelFeaturedProps] = useState([]);

  useEffect(() => {
    const style = new Style({});
    style.setRenderer(fPropertyVectorRendererFunc);
    fPropVectorLayerRef.current?.setStyle(style);

    fPropSourceRef.current.on("addfeature", function (event) {
      const feature = event.feature;
      const svgtext2 = feature.get("hatch");
      const img = new Image();

      img.onload = function () {
        feature.set("hatchimg", img);
      };

      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);
    });
  }, [fPropVectorLayerRef?.current]);

  useEffect(() => {
    const style = new Style({});
    style.setRenderer(fPropertyVectorRendererFunc_labels);

    fPropVectorLayerLabelRef.current?.setStyle(style);
  }, []);

  const fPropLoaderFunc = useCallback((extent, resolution, projection) => {
    // setFPropertyLoadingPromise("loading");
    console.log("fprop-loading");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/view_hotplay_company/${companyId}`;

    setFpropIsLoading(true);
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

            fPropSourceRef?.current?.clear();
            fPropSourceLabelRef?.current?.clear();
            fPropSourceRef?.current?.addFeatures(features);
            fPropSourceLabelRef?.current?.addFeatures(features);
            //setfPropRenderCount((p) => p + 1);
            const p1 = fPropSourceLabelRef.current?.getExtent();
            setFpropExtent(p1);
            console.log("p1", p1);
            setFpropCount(features.length);
            // setFPropertyLoadingPromise("loaded");
            console.log("fprop-loaded-2");
            setFpropIsLoading(false);
          }
          // setFPropertyLoadingPromise("loaded");
          console.log("fprop-loaded-3");
          setFpropIsLoading(false);
        }
      })
      .catch((error) => {
        // setFPropertyLoadingPromise("error");
        setFpropCount(0);
        setFpropIsLoading(false);
      });
  }, []);

  const fPropLoaderFuncArea = useCallback((extent, resolution, projection) => {
    // setFPropertyLoadingPromise("loading");
    console.log("fprop-loading");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/map-link2/view_hotplay_company_by_area/${companyId}/${areaId}`;
    setFpropIsLoading(true);
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

            fPropSourceRef?.current?.clear();
            fPropSourceLabelRef?.current?.clear();
            fPropSourceRef?.current?.addFeatures(features);
            fPropSourceLabelRef?.current?.addFeatures(features);
            //setfPropRenderCount((p) => p + 1);
            const p1 = fPropSourceLabelRef.current?.getExtent();
            setFpropExtent(p1);
            console.log("p1", p1);
            setFpropCount(features.length);
            // setFPropertyLoadingPromise("loaded");
            console.log("fprop-loaded-2");
            setFpropIsLoading(false);
          }
          // setFPropertyLoadingPromise("loaded");
          console.log("fprop-loaded-3");
          setFpropIsLoading(false);
        }
      })
      .catch((error) => {
        // setFPropertyLoadingPromise("error");
        setFpropCount(0);
        setFpropIsLoading(false);
      });
  }, []);

  const fPropLoaderFuncProperty = useCallback(
    (extent, resolution, projection) => {
      // setFPropertyLoadingPromise("loading");
      console.log("fprop-loading");
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/map-link2/view_hotplay_company_by_property/${companyId}/${propertyId}`;
      setFpropIsLoading(true);
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

              fPropSourceRef?.current?.clear();
              fPropSourceLabelRef?.current?.clear();
              fPropSourceRef?.current?.addFeatures(features);
              fPropSourceLabelRef?.current?.addFeatures(features);
              //setfPropRenderCount((p) => p + 1);
              const p1 = fPropSourceLabelRef.current?.getExtent();
              setFpropExtent(p1);
              console.log("p1", p1);
              setFpropCount(features.length);
              // setFPropertyLoadingPromise("loaded");
              console.log("fprop-loaded-2");
              setFpropIsLoading(false);
            }
            // setFPropertyLoadingPromise("loaded");
            console.log("fprop-loaded-3");
            setFpropIsLoading(false);
          }
        })
        .catch((error) => {
          // setFPropertyLoadingPromise("error");

          setFpropCount(0);
          setFpropIsLoading(false);
        });
    },
    []
  );
  useEffect(() => {
    if (fPropVectorLayerRef?.current?.isVisible()) {
      const vf = fPropSourceRef.current.getFeaturesInExtent(
        mapRef.current.getView().calculateExtent()
      );
      const vfObjs = vf?.map((f) => {
        return {
          id: f.get("id"),
          companyid: f.get("companyid"),
          colour: f.get("colour"),
          company2: f.get("company2"),
          map_area: f.get("map_area"),
        };
      });

      setFPropertyFeatures(vfObjs);
    }
  }, [fPropRenderCount]);

  // //lable visibility
  // useEffect(() => {
  //   if (featuredLayerLableVisibility) {
  //     fPropVectorLayerLabelRef.current.setVisible(true);
  //   } else {
  //     fPropVectorLayerLabelRef.current.setVisible(false);
  //   }
  // }, [featuredLayerLableVisibility]);

  // //layer visibility
  // useEffect(() => {
  //   if (featuredLayerVisibility) {
  //     fPropVectorLayerRef.current.setVisible(true);
  //   } else {
  //     fPropVectorLayerRef.current.setVisible(false);
  //   }
  // }, [featuredLayerVisibility]);
  useEffect(() => {
    if (selectedProperty != null) {
      if (fPropSourceRef.current) {
        // set prev selected styles to null
        for (const fid of prevSelFeaturedProps) {
          const fp = fPropSourceRef.current
            .getFeatures()
            .find((f) => f.get("prop_name") == fid);

          fp?.setStyle(undefined);
          mapRef.current.render();
        }
        setprevSelFeaturedProps([]);

        //highlight
        const fp = fPropSourceRef.current
          .getFeatures()
          .find((f) => f.get("prop_name") == selectedProperty);
        console.log("fp", fp);
        if (fp) {
          // setunselectFProps((p) => p + 1)

          const selectStyle = new Style({ zIndex: 10 });
          selectStyle.setRenderer(
            areaMApPropertyVectorRendererFuncV2HighlightMapLink
          );

          fp.setStyle(selectStyle);
          mapRef.current.render();
          setprevSelFeaturedProps([selectedProperty]);
        }
      }
    }
  }, [selectedProperty]);
  return (
    <>
      <olLayerVector ref={fPropVectorLayerRef} zIndex={1}>
        <olSourceVector
          ref={fPropSourceRef}
          // strategy={bbox}
          loader={
            propertyId
              ? fPropLoaderFuncProperty
              : areaId
              ? fPropLoaderFuncArea
              : fPropLoaderFunc
          }
        ></olSourceVector>
      </olLayerVector>

      <olLayerVector ref={fPropVectorLayerLabelRef}>
        <olSourceVector ref={fPropSourceLabelRef}></olSourceVector>
      </olLayerVector>
    </>
  );
};
export default FPropLayer;

"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  setIsSideNavOpen,

  setCompanyZoomLevel,
  setCompanyInitialCenter,
  setCompanyLyrs,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import GeoJSON from "ol/format/GeoJSON";

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
  Circle,
} from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";
import CompanySideNavbar from "../side-navbar-second/company-map/company-sidenavbar";
import { flyTo } from "./fly";
import {
  setclickassetObject,
  setclickclaimObject,
  setclickfPropertyObject,
  setclicksyncPropertyObject,
    setcompanyCurrentScale,
  setcompanyMapViewScales,
} from "@/store/company-map/company-map-slice";
import CompanyMapClickPopup from "./company-map-popup/company-map-click-popup";
import { all, bbox, bbox as bboxStrategy } from "ol/loadingstrategy";
import {
  areaMApPropertyVectorRendererFuncV2Highlight,
  areaMApPropertyVectorRendererFuncV2_labels,
  areaMapAssetVectorLayerStyleFunctionHighlited,
  areaMap_tbl_syncProperty_VectorLayerStyleFunctionHighLited,
  areaMap_tbl_sync_claimlink_VectorLayerStyleFunctionHighLight,
  styleFunctionClaimHighlight,
} from "./area-map-styles/area-map-styles";

import { toLonLat } from "ol/proj";
import { METERS_PER_UNIT } from "ol/proj/Units";
import { updateWindowsHistoryCmap } from "@/app/utils/helpers/window-history-replace";

const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});

const companyMApPropertyVectorRendererFuncV2 = (pixelCoordinates, state) => {
  //  console.log("sssss", state);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  //new code
  const svgtext2 = state.feature.get("hatch");
  //  const img = new Image();

  // img.onload = function () {
  //   feature.set("flag", img);
  // };

  // img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);

  //end new code
  const flag = state.feature.get("flag");
  // const flag = img
  //   console.log("flag",flag)
  if (!flag || height < 1 || width < 1) {
    return;
  }

  context.save();
  const renderContext = toContext(context, {
    pixelRatio: 1,
  });

  renderContext.setFillStrokeStyle(fill, stroke);
  renderContext.drawGeometry(geometry);

  context.clip();

  // Fill transparent country with the flag image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  const hf = width / (height * 8);
  context.drawImage(flag, left, bottom, width * 20, height * hf * 20);

  context.restore();
};

const companyMap_tbl_sync_claimlink_VectorLayerStyleFunction = (
  feature,
  resolution
) => {
  //console.log("feature:", feature);
  //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim1.textContent = "visibility";
  // const r = Math.random() * 255;
  // const g = Math.random() * 255;
  // const b = Math.random() * 255;
  //console.log("fill", feature.values_.hatch);
  const colour = "#0000FF"; //feature.values_.colour;
  //console.log("colour", colour);
  // const fill = new Fill({
  //   color: `rgba(${r},${g},${b},1)`,
  //   opacity:1,
  // });
  // const fill = new Fill({
  //   // color: `rgba(${r},${g},${b},1)`,

  //   color:colour,
  //   opacity: 1,
  // });
  const fill = new Fill({
    // color: `rgba(${r},${g},${b},1)`,

    color: colour,
    opacity: 0.3,
  });

  const stroke = new Stroke({
    color: "darkblue",
    width: 1.25,
  });
  //console.log("res22", resolution);

  // let svgScale = 0;
  // let radius = 0;
  //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim.textContent = "visibility_off";
  // if (resolution > 1000) {
  //   svgScale = 0.5;
  //   radius = 2;
  // } else if (resolution > 937.5) {
  //   svgScale = 0.562;
  //   radius = 5;
  // } else if (resolution > 875) {
  //   svgScale = 0.625;
  //   radius = 5;
  // } else if (resolution > 750) {
  //   svgScale = 0.75;
  //   radius = 5;
  // } else if (resolution > 625) {
  //   svgScale = 0.875;
  //   radius = 5;
  // } else if (resolution > 500) {
  //   svgScale = 1;
  //   radius = 5;
  // } else if (resolution > 375) {
  //   svgScale = 1.125;
  //   radius = 5;
  // } else if (resolution > 250) {
  //   svgScale = 1.25;
  //   radius = 5;
  // } else if (resolution > 125) {
  //   svgScale = 1.375;
  //   radius = 5;
  //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //   // spanClaim.textContent = "visibility";
  // } else {
  //   svgScale = 1.5;
  //   radius = 10;
  // }
  let image;
  let text;

  // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[0].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[2].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[3].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[5].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[6].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[7].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
  //     scale: svgScale,
  //   });
  // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
  //     scale: svgScale,
  //   });
  // }
  // else {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: "pink" }),
  //     stroke: new Stroke({ color: "pink", width: 3 }),
  //   });
  // }

  //set text Style

  // text = createTextStyle(feature, resolution);
  image = new Circle({
    radius: 2,
    fill: new Fill({ color: colour }),
    stroke: new Stroke({ color: colour, width: 1 }),
  });
  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    image,
    // text,
    fill,
  });
  // console.log("st", st);
  return st;
};

const DOTS_PER_INCH = 72;
const INCHES_PER_METRE = 39.37;

function inchesPreUnit(unit) {
  return METERS_PER_UNIT[unit] * INCHES_PER_METRE;
}
function mapRatioScale({ map, toRound = true }) {
  const resolution = map.getView().getResolution();
  const unit = map.getView().getProjection().getUnits();

  let scale = resolution * inchesPreUnit(unit) * DOTS_PER_INCH;
  return toRound ? Math.round(scale) : scale;
}

const getMapResolution = (scale, unit) => {
  return scale / (inchesPreUnit(unit) * DOTS_PER_INCH);
};

export const CompanyMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");
  const [claimObject, setclaimObject] = useState(undefined);
  const [mapUnits, setmapUnits] = useState("m");

   const [maxResolutionFProp, setmaxResolutionFProp] = useState(300);
 const [maxResolutionClaims, setmaxResolutionClaims] = useState(300);
  const [maxResolutionAssets, setmaxResolutionAssets] = useState(300);
  const [maxResolutionSyncOutlines, setmaxResolutionSyncOutlines] =  useState(300);
  const [maxResolutionPropPoints, setmaxResolutionPropPoints] = useState(300);
  const [curcenteredareaid, setcurcenteredareaid] = useState(0);

  const [clickDataLoaded, setclickDataLoaded] = useState(false);
  const [clickedOnFeature, setclickedOnFeature] = useState(false);
  const [mapScale, setmapScale] = useState(0);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);

  const mapRef = useRef();
  const mapViewRef = useRef();
  const selectedFPropRef = useRef();
  const selectedAssetRef = useRef();
  const selectedSynPropRef = useRef();
  const selectedSynOutLineRef = useRef();
  const selectedClaimRef = useRef();
  const navigatedFPropertyRef = useRef();

  const mapViewScaleReducer = useSelector((state) => state.mapViewScaleReducer);


  const dispatch = useDispatch();

  const companyFlyToLocation = useSelector(
    (state) => state.companyMapReducer.companyFlyToLocation
  );

  const navigatedFPropId = useSelector(
    (state) => state.companyMapReducer.navigatedFPropId
  );

  const [coordinates, setCoordinates] = useState(undefined);
  const [popup, setPopup] = useState();

  useEffect(() => {
    if (navigatedFPropertyRef.current) {
      const fp = navigatedFPropertyRef.current.find(
        (f) => f.get("id") == navigatedFPropId
      );

      const selectStyle = new Style({ zIndex: 1 });
      selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);

      fp?.setStyle(selectStyle);
    }
  }, [navigatedFPropId]);

  const onSingleclick = useCallback((evt) => {
    const { coordinate } = evt;
    setCoordinates(coordinate);
  }, []);

  const onPointerMove = useCallback((e) => {
    //console.log("pm-1",evt)

    // curAMapResolution = areaView.getResolution();

    const coordinate1 = mapRef.current.getCoordinateFromPixel(e.pixel);
    const c = toLonLat(coordinate1);
    // araemap_status_bar_lon.innerHTML = c[0].toFixed(4);
    // araemap_status_bar_lat.innerHTML = c[1].toFixed(4);
    setlong(c[0].toFixed(4));
    setlat(c[1].toFixed(4));

    // console.log("pmov-zoom end-cal started-1");
    if (selectedFPropRef.current) {
      // console.log("pmov-remove applied style-4-1-x1");
      selectedFPropRef.current.setStyle(undefined);
      selectedFPropRef.current = null;
    }
    if (selectedClaimRef.current) {
      selectedClaimRef.current.setStyle(undefined);
      selectedClaimRef.current = null;
    }
    if (selectedAssetRef.current) {
      selectedAssetRef.current.setStyle(undefined);
      selectedAssetRef.current = null;
    }

    if (selectedSynPropRef.current) {
      selectedSynPropRef.current.setStyle(undefined);
      selectedSynPropRef.current = null;
    }
    if (selectedSynOutLineRef.current) {
      selectedSynOutLineRef.current.setStyle(undefined);
      selectedSynOutLineRef.current = null;
    }
    // let fcount = 0;
    mapRef.current.forEachFeatureAtPixel(e.pixel, function (f, layer) {
      //  fcount++;

      //  console.log("pmov-features@pixel-loop-init-2");
      // console.log("layer", layer.get("id1"));
      let fill; //

      // if (layer.get("id1") == "boundary") {
      if (f.get("ft") == 0) {
        //   console.log("bo");
        //  fill = new Fill({
        //    color: "rgba(255, 255, 255, 0)",
        //  });
        // const selectStyleArea = new Style({
        //   text: new Text({
        //     text: f.get("area_name"),
        //     fill: new Fill({ color: "#0000FF" }),
        //     offsetX: 0,
        //     offsetY: 0,
        //   }),
        //   fill,
        //   stroke: new Stroke({
        //     color: "rgba(0, 0,255, 1.0)",
        //     width: 5,
        //   }),
        // });
        // selectedArea = f;
        // //selectStyle.getFill().setColor("rgba(255, 255, 255, 0)"); f.get("ft"== 1
        // //layer.get("id1") == "fproperty_areamap"
        // f.setStyle(selectStyleArea);
        // } else if (layer.get("id1") == "fproperty_areamap") {
      } else if (f.get("ft") == 1) {
        // console.log("pmov-fp found-3-0");
        //f is a area boundary
        //  console.log("qwerty");
        //  if (selectedFProp && !(selectedFProp === f)) {
        //    console.log("pmov-remove applied style-4-2");
        //   //  console.log("a");
        //    if (selectedFProp !== null) {
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  } else {
        //console.log("pmov-apply new style-4-1");
        //  console.log("b");
        const selectStyle = new Style({ zIndex: 1 });
        selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);
        f.setStyle(selectStyle);
        selectedFPropRef.current = f;
        // }
      } else if (f.get("ft") == 2) {
        // console.log("pmov-sync prop found-3-1");

        f.setStyle(areaMap_tbl_syncProperty_VectorLayerStyleFunctionHighLited);
        selectedSynPropRef.current = f;

        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  console.log("spt");
      } else if (f.get("ft") == 3) {
        f.setStyle(
          areaMap_tbl_sync_claimlink_VectorLayerStyleFunctionHighLight
        );
        selectedSynOutLineRef.current = f;
        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        // console.log("spo");
      } else if (f.get("ft") == 4) {
        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //  }

        // console.log("assetf");
        //  const selectStyle = new Style({});
        //  selectStyle.setRenderer(
        //    areaMapAssetVectorLayerStyleFunctionHighlited
        //  );
        f.setStyle(areaMapAssetVectorLayerStyleFunctionHighlited);
        selectedAssetRef.current = f;
        // const selectStyle = new Style({}); areaMapAssetVectorLayerStyleFunctionHighlited
        // selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);
        // f.setStyle(selectStyle);
        // selectedFProp = f;
      } else if (f.get("ft") == 5) {
        f.setStyle(styleFunctionClaimHighlight);
        selectedClaimRef.current = f;
      } else {
        // console.log("pmov-other layer found-5");
        // console.log("layer", layer.get("id1"));
        // console.log("xx");
        //fproperty_areamap_labels
        //  if (layer.get("id1") != "fproperty_areamap_labels") {
        //    if (selectedFProp !== null) {
        //      console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  }
      }

      //      const selectStyle = new Style({
      //        stroke: new Stroke({
      //          color: "rgba(0, 0,255, 1.0)",
      //          width: 5,
      //        }),
      //      });
      //      selectedFProp = f;
      //      //selectStyle.getFill().setColor("rgba(255, 255, 255, 0)");
      //      f.setStyle(selectStyle);
      //   selectedFProp = f;

      // change cursor
      // var viewport = map.getViewport();

      //  if (f && f.getGeometry().getType() === "Polygon") {
      //    // console.log("ffff",f.get("area_name"));
      //    if (areaSearchInput.value != f.get("area_name")) {
      //      // Check if the mouse pointer is inside the polygon
      //      const coordinate = map.getCoordinateFromPixel(e.pixel);
      //      const geometry = f.getGeometry();
      //      if (geometry.intersectsCoordinate(coordinate)) {
      //        // Add the 'inside-polygon-cursor' class to the viewport
      //        viewport.classList.add("inside-polygon-cursor");
      //        return;
      //      } else {
      //        viewport.classList.remove("inside-polygon-cursor");
      //      }
      //    } else {
      //      // console.log("f.id_.slice(0, 5) ",f.id_.slice(0, 5)  )
      //      viewport.classList.remove("inside-polygon-cursor");
      //    }
      //  } else {
      //    // console.log("dddddd-f.id_.slice", f.id_.slice(0, 5));
      //    viewport.classList.add("inside-polygon-cursor");
      //  }

      return true;
    });
    //console.log("fcount", fcount);

    // console.log("pmove- end fun",)
  });

  const onViewChange = useCallback((e) => {
    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
    dispatch(setcompanyCurrentScale(scale ));
  });

  useEffect(() => {
    if (companyFlyToLocation?.length > 0)
      flyTo(mapViewRef?.current, companyFlyToLocation, () => {});
  }, [companyFlyToLocation]);

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  const companyLyrs = useSelector(
    (state) => state.mapSelectorReducer.companyLyrs
  );

  const companyZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.companyZoomLevel
  );
  const companyInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.companyInitialCenter
  );

  const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
  );

     const companyAssetLayerAlwaysVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetLayerAlwaysVisible
  );

  const syncPropSourceRef = useRef(null);
  const syncPropVectorLayerRef = useRef(null);
  const fPropSourceRef = useRef(null);
  const fPropVectorLayerRef = useRef(null);

  const fPropSourceLabelRef = useRef(null);
  const fPropVectorLayerLabelRef = useRef(null);

  const assetSourceRef = useRef(null);
  const assetLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const claimLinkVectorLayerRef = useRef(null);
  const claimVectorImgSourceRef = useRef(null);
  const claimVectorImgLayerRef = useRef(null);
  const areaBoundaryImgSourceRef = useRef(null);
  const areaBoundaryImgLayerRef = useRef(null);

  const syncPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.syncPropertyFeatures
  );
  const featuredPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.featuredPropertyFeatures
  );
  const syncClaimLinkPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.syncClaimLinkPropertyFeatures
  );
  const assetFeatures = useSelector(
    (state) => state.companyMapReducer.assetFeatures
  );

  const companyName = useSelector(
    (state) => state.companyMapReducer.companyName
  );
  const companyId = useSelector((state) => state.companyMapReducer.companyId);
  const companyStockcode = useSelector(
    (state) => state.companyMapReducer.companyStockcode
  );

  useEffect(() => {
    // console.log("ue2")
    //set style
    const style = new Style({});
    style.setRenderer(companyMApPropertyVectorRendererFuncV2);

    fPropVectorLayerRef.current?.setStyle(style);
  }, [fPropVectorLayerRef.current]);

  useEffect(() => {
    claimVectorImgLayerRef.current?.setOpacity(0.6);
  }, [claimVectorImgLayerRef.current]);

  useEffect(() => {
    syncPropSourceRef?.current?.clear();
    if (syncPropertyFeatures?.features?.length > 0) {
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);

      syncPropSourceRef?.current?.addFeatures(e);
    }

    if (syncPropSourceRef.current) {
      const p1 = syncPropSourceRef.current?.getExtent()[0];
      if (p1 != Infinity) {
        mapRef.current?.getView()?.fit(syncPropSourceRef.current?.getExtent(), {
          padding: [200, 200, 200, 200],
          duration: 3000,
        });
      }
    }
  }, [syncPropertyFeatures]);

  useEffect(() => {
    fPropSourceRef?.current?.clear();
    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);

      navigatedFPropertyRef.current = e;
      fPropSourceRef?.current?.addFeatures(e);
      fPropSourceLabelRef?.current?.addFeatures(e);
    }

    //  if (fPropSourceRef.current) {
    //    const p1= fPropSourceRef.current?.getExtent()[0]
    //    if (p1 != Infinity) {
    //      mapRef.current?.getView()?.fit(fPropSourceRef.current?.getExtent(), {
    //        padding: [200, 200, 200, 200],
    //        duration: 3000,
    //      });
    //    }

    //  }
  }, [featuredPropertyFeatures]);

  useEffect(() => {
    claimLinkSourceRef?.current?.clear();
    if (syncClaimLinkPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(syncClaimLinkPropertyFeatures);

      claimLinkSourceRef?.current?.addFeatures(e);
    }
    // if (claimLinkSourceRef.current) {
    //   const p1 = claimLinkSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(claimLinkSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [syncClaimLinkPropertyFeatures]);

  useEffect(() => {
    assetSourceRef?.current?.clear();
    if (assetFeatures?.features) {
      const e = new GeoJSON().readFeatures(assetFeatures);
      console.log("assetFeatures added");
      assetSourceRef?.current?.addFeatures(e);
    }

    // if (assetSourceRef.current) {
    //   const p1 = assetSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(assetSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [assetFeatures]);

  useEffect(() => {
    

    mouseScrollEvent();
  }, [mapViewScaleReducer.mapViewScales]);

  useEffect(() => {
    fPropVectorLayerRef?.current
      ?.getSource()
      .on("addfeature", function (event) {
        const feature = event.feature;
        const svgtext2 = feature.get("hatch");
        const img = new Image();

        img.onload = function () {
          feature.set("flag", img);
        };

        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);
      });
  }, [fPropVectorLayerRef?.current]);

  useEffect(() => {
    const style = new Style({});
    style.setRenderer(areaMApPropertyVectorRendererFuncV2_labels);
    fPropVectorLayerLabelRef.current?.setStyle(style);
  }, [fPropVectorLayerLabelRef.current]);

  // useEffect(() => {
  //   let newUrl;
  //   newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${zoom}&c=${center}`;

  //    updateWindowsHistory(newUrl);
  // }, [zoom, center]);

  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

      const setCenteredAreaViewScales = (center) => {
        let closestArea = { d: 9999999999999999 };
        console.log("qq-mapViewScaleReducer.mapViewScales",center)
        mapViewScaleReducer.mapViewScales.forEach((a) => {
          const dx = a.centroid_x - center[0];
          const dy = a.centroid_y - center[1];

          const d = Math.sqrt(dx * dx + dy * dy);

          if (closestArea.d > d) {
            closestArea = { area: a, d };
          }
        });

        dispatch(setcompanyMapViewScales(closestArea.area));
        if(!closestArea.area){
         // alert(`no area found `)
          return
        } else {
          dispatch(setcompanyMapViewScales(closestArea.area));
          setcurcenteredareaid(closestArea.area.area_id);
        }
        // console.log("aa-curAreaId",closestArea.area.area_id)
        const r = getMapResolution(
          closestArea.area.featuredpropscale,
          mapUnits
        );
        // console.log("rrr",r,closestArea.area  )
       
        // console.log("aa-featuredpropscale",closestArea.area.featuredpropscale)
        //featured prop max-scale
        setmaxResolutionFProp(r);

        const r1 = getMapResolution(
          closestArea.area.propoutlinescale,
          mapUnits
        );
       // console.log("aa-propoutlinescale",closestArea.area.propoutlinescale)
        //prop outline max-res
        setmaxResolutionSyncOutlines(r1);

        //asset max-res
       // console.log("aa-assetscale",closestArea.area.assetscale)
        const r2 = getMapResolution(closestArea.area.assetscale, mapUnits);
        setmaxResolutionAssets(r2);
        //asset max-res
       // console.log("aa-claimscale",closestArea.area.claimscale)
        const r3 = getMapResolution(closestArea.area.claimscale, mapUnits);
        setmaxResolutionClaims(r3);
        const r4 = getMapResolution(closestArea.area.proplayerscale, mapUnits);
        setmaxResolutionPropPoints(r4);
        //
      };

    // console.log("mapRef", mapRef.current?.getZoom());
    const handleMoveEnd = () => {
      // console.log("map", map);
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();
      dispatch(setCompanyZoomLevel(tmpZoomLevel));
      dispatch(setCompanyInitialCenter(tmpinitialCenter));
      setZoom(tmpZoomLevel);
      setCenter(tmpinitialCenter);
      
       setCenteredAreaViewScales(tmpinitialCenter);

        //  const  newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`;

        updateWindowsHistoryCmap(  {isSideNavOpen,lyrs:companyLyrs,zoom:tmpZoomLevel,center:tmpinitialCenter,sidenav2:isCompanySideNavOpen,companyId:companyId});

      

   // window.history.replaceState({}, "", newUrl);

      // router.push(
      //   `/?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`
      // );
      // console.log("tmpinitialCenter", tmpinitialCenter);
      // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`;
      // window.history.replaceState({}, "", newUrl);
    };
      if (mapViewScaleReducer.mapViewScales.length > 0) {
    map?.on("moveend", handleMoveEnd);
      }

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, [mapViewScaleReducer.mapViewScales]);

  const collapsibleBtnHandler = () => {
    const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
    dispatch(setIsSideNavOpen(!tmpValue));
    let newUrl;
    newUrl = `${
      window.location.pathname
    }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isCompanySideNavOpen}&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    // window.history.replaceState({}, "", newUrl);
     updateWindowsHistory(newUrl);
    // dispatch(setUrlUpdate());
  };

  const setLyrs = (lyrs) => {
    dispatch(setCompanyLyrs(lyrs));
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isCompanySideNavOpen}&lyrs=${lyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    // window.history.replaceState({}, "", newUrl);
     updateWindowsHistory(newUrl);
  };

  const image = new Icon({
    src: "./sync-prop.svg",
    scale: 1,
  });

  // const styleFunctionSyncProperties = (feature) => {
  //   // console.log("s");
  //   const s = new Style({
  //     image,
  //     stroke: new Stroke({
  //       color: "red",
  //       width: 2,
  //     }),
  //     fill: new Fill({
  //       color: "rgba(255,23,0,0.2)",
  //     }),
  //   });

  //   return s;
  // };

  const styleFunctionSyncProperties = (feature, resolution) => {
    //console.log("resolution",resolution)
    let t = "";
    if (resolution < 300)
      t =
        feature.get("prop_name") +
          (feature.get("prop_alias") ? "/" + feature.get("prop_alias") : "") ??
        "";
    const s = new Style({
      text: new Text({
        text: t.toString(),
        // text: feature.get("propertyid") ??"", prop_name, prop_alias
        offsetX: 0,
        offsetY: -10,
        font: "14px serif",
      }),
      image,
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(255,23,0,0.2)",
      }),
    });

    return s;
  };

  useEffect(() => {
    claimLinkVectorLayerRef.current?.setOpacity(0.2);
    claimLinkVectorLayerRef.current?.setStyle(
      companyMap_tbl_sync_claimlink_VectorLayerStyleFunction
    );
  }, [claimLinkVectorLayerRef.current]);

  //layer visibilty redux states
  const companyFpropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyFpropLayerVisible
  );
  const companyAssetLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetLayerVisible
  );
  const companySyncPropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncPropLayerVisible
  );
  const companySyncClaimLinkLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncClaimLinkLayerVisible
  );
  const companyClaimLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyClaimLayerVisible
  );
  const companyAreaBoundaryLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAreaBoundaryLayerVisible
  );

  //asset type visibilty redux states
  const companyAssetOpMineVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetOpMineVisible
  );
  const companyAssetDepositsVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetDepositsVisible
  );
  const companyAssetZoneVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetZoneVisible
  );
  const companyAssetHistoricalVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetHistoricalVisible
  );
  const companyAssetOccurrenceVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetOccurrenceVisible
  );

  //layer visibility useEffects
  useEffect(() => {
    fPropVectorLayerRef?.current?.setVisible(companyFpropLayerVisible);
  }, [companyFpropLayerVisible]);
  useEffect(() => {
    claimLinkVectorLayerRef?.current?.setVisible(
      companySyncClaimLinkLayerVisible
    );
  }, [companySyncClaimLinkLayerVisible]);
  useEffect(() => {
    syncPropVectorLayerRef?.current?.setVisible(companySyncPropLayerVisible);
  }, [companySyncPropLayerVisible]);
  useEffect(() => {
    assetLayerRef?.current?.setVisible(companyAssetLayerVisible);
  }, [companyAssetLayerVisible]);
  useEffect(() => {
    claimVectorImgLayerRef?.current?.setVisible(companyClaimLayerVisible);
  }, [companyClaimLayerVisible]);
  useEffect(() => {
    areaBoundaryImgLayerRef?.current?.setVisible(
      companyAreaBoundaryLayerVisible
    );
  }, [companyAreaBoundaryLayerVisible]);

  //asset type visibility useEffects
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

  //claim loader
  // const claimLoaderFunc1 = (extent, resolution, projection)=> {
  //  // console.log("hit claims",extent)
  //   const url =
  //     `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
  //     `/${extent.join("/")}`;
  //  // console.log("url", url);
  //   fetch(url, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //         console.log("hit claims2.0",json)
  //       if (json.data) {
  //            //console.log("hit claims2.1")
  //         if (json.data[0].json_build_object.features) {
  //           const features = new GeoJSON().readFeatures(
  //             json.data[0].json_build_object
  //           );
  //             //console.log("hit claims3")
  //           claimVectorImgSourceRef.current.addFeatures(features);

  //           //console.log("bbsync uni tbl01_claims   features count", features.count);
  //         }
  //       }
  //     });
  // }

  const styleFunctionAreaBoundary = (feature) => {
    const s = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1,
      }),
    });

    return s;
  };

  const areaLoaderFunc = useCallback((extent, resolution, projection) => {
    const url = `https://atlas.ceyinfo.cloud/matlas/view_tbl40mapareas`;
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
        if (json.data[0].json_build_object.features) {
          const features = new GeoJSON().readFeatures(
            json.data[0].json_build_object
          );

          areaBoundaryImgSourceRef.current.addFeatures(features);

          // console.log("mapCommodityTbl40Source", features );
        } else {
          console.log("else area map area boundry not loading ");
        }
      });
  }, []);

  const styleFunctionClaim = (feature, resolution) => {
    // console.log("sf claims")
    const colour = "#D3D3D3"; //feature.values_.colour;
    //console.log("colour", colour);
    // const fill = new Fill({
    //   color: `rgba(${r},${g},${b},1)`,
    //   opacity:1,
    // });
    // const fill = new Fill({
    //   // color: `rgba(${r},${g},${b},1)`,

    //   color:colour,
    //   opacity: 1,
    // });
    let fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      // opacity: 1,
    });

    // const stroke = new Stroke({
    //   color: "#8B4513",
    //   width: 1.25,
    // });

    // let image;
    // let text;

    // image = new Circle({
    //   radius: 9,
    //   fill: new Fill({ color: colour }),
    //   // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    // });

    let textObj;

    const claimno = feature.get("claimno");
    textObj = new Text({
      //       // textAlign: align == "" ? undefined : align,
      //       // textBaseline: baseline,
      font: "10px serif",
      text: claimno,
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 2,
      offsetY: -13,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
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

  const claimLoaderFunc = useCallback((extent, resolution, projection) => {
    const url =
      `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
      `/${extent.join("/")}`;
    // console.log("url", url);
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
            claimVectorImgSourceRef.current.addFeatures(features);
          }
        }
      });
  }, []);

  useEffect(() => {
    let clickedOnFeatureTmp = false;
    const fetchData = async () => {
      setclickedOnFeature(false);
      let assetObject, fPropertyObject, syncPropertyObject, claimObject;
      // console.log("coordinates",coordinates,)

      let extentDim;
      const viewResolution = mapViewRef?.current?.getResolution();
      if (viewResolution < 15) {
        extentDim = 100;
      } else if (viewResolution < 50) {
        extentDim = 500;
      } else if (viewResolution < 150) {
        extentDim = 1000;
      } else if (viewResolution < 250) {
        extentDim = 1500;
      } else if (viewResolution < 400) {
        extentDim = 2500;
      } else {
        extentDim = 3000;
      }

      const ext = [
        coordinates[0] - extentDim,
        coordinates[1] - extentDim,
        coordinates[0] + extentDim,
        coordinates[1] + extentDim,
      ];
      //first look for asset features
      const selAssetFeatures =
        assetSourceRef?.current?.getFeaturesInExtent(ext) ?? [];

      if (selAssetFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        let asset_name = selAssetFeatures?.[0]?.get("asset_name") ?? "";
        let assetalias = selAssetFeatures?.[0]?.get("assetalias") ?? "";
        let asset_type = selAssetFeatures?.[0]?.get("asset_type") ?? "";
        let commodities = selAssetFeatures?.[0]?.get("commodities") ?? "";
        let area = selAssetFeatures?.[0]?.get("area") ?? "";
        let stateProv = selAssetFeatures?.[0]?.get("state_prov") ?? "";
        let country = selAssetFeatures?.[0]?.get("country") ?? "";
        let region = selAssetFeatures?.[0]?.get("region") ?? "";
        assetObject = {
          asset_name,
          assetalias,
          asset_type,
          commodities,
          area,
          stateProv,
          country,
          region,
        };

        dispatch(setclickassetObject(assetObject));
      } else {
        dispatch(setclickassetObject(undefined));
      }
      const selFPropertyFeatures =
        fPropSourceRef?.current?.getFeaturesAtCoordinate(coordinates) ?? [];
      if (selFPropertyFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        let prop_name = selFPropertyFeatures?.[0]?.get("prop_name") ?? "";

        let propertyid = selFPropertyFeatures?.[0]?.get("propertyid") ?? "";
        let hotplayid = selFPropertyFeatures?.[0]?.get("id") ?? 0;

        // const sponsoredowners = await getSponsorListFromRESTAPI(
        //   features[0].get("id")
        // );

        const getData = async (hotplayid) => {
          const url =
            "https://atlas.ceyinfo.cloud/matlas/getownersbyhotplayid/" +
            hotplayid;
          //load data from api - changed to return array

          let sponsors = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((response) => response.json())
            .then((res) => {
              // let sponsors = "";
              // res.data.forEach((element) => {
              //   sponsors += element.sponsor + "/";
              // });
              return res.data;
            });

          // sponsors = sponsors.slice(0, -1);
          // console.log("sponsors", sponsors);
          return sponsors;
        };

        const dd = await getData(hotplayid);
        //console.log("dd",dd)
        const d = dd?.[0];

        const sponsoredowners = d?.sponsor ?? "";
        let commo_ref = d?.commo_ref ?? "";
        let assets = d?.assets ?? "";
        let resources = d?.resources ?? "";
        let map_area = d?.map_area ?? "";
        let owners = d?.owners ?? "";
        let prop_exturl = d?.prop_exturl ?? "";
        let sale_name = d?.sale_name ?? "";

        fPropertyObject = {
          sponsoredowners,
          prop_name,
          commo_ref,
          assets,
          resources,
          map_area,
          owners,
          prop_exturl,
          sale_name,
          propertyid,
        };

        dispatch(setclickfPropertyObject(fPropertyObject));
      } else {
        dispatch(setclickfPropertyObject(undefined));
      }
      // const selBoundaryFeatures =
      //   boundarySource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];

      const selSyncPropFeatures =
        syncPropSourceRef?.current?.getFeaturesInExtent(ext) ?? [];

      if (selSyncPropFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        const prop_name = selSyncPropFeatures?.[0]?.get("prop_name") ?? "";
        const owners = selSyncPropFeatures?.[0]?.get("owners") ?? "";
        let name1 = selSyncPropFeatures?.[0]?.get("name") ?? "";
        const stateProv = selSyncPropFeatures?.[0]?.get("state_prov") ?? "";
        const country = selSyncPropFeatures?.[0]?.get("country") ?? "";
        const area = selSyncPropFeatures?.[0]?.get("area") ?? "";
        // const selSynClaimLinkFeatures =
        //   sync_claimLinkLayerSource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];
        syncPropertyObject = {
          prop_name,
          owners,
          name: name1,
          stateProv,
          country,
          area,
        };

        dispatch(setclicksyncPropertyObject(syncPropertyObject));
      } else {
        dispatch(setclicksyncPropertyObject(undefined));
      }
      const claimFeatures =
        claimVectorImgSourceRef?.current?.getFeaturesAtCoordinate(
          coordinates
        ) ?? [];
      if (claimFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        let ownerref = claimFeatures?.[0]?.get("ownerref") ?? "";
        const claimno = claimFeatures?.[0]?.get("claimno") ?? "";
        claimObject = { ownerref, claimno };

        dispatch(setclickclaimObject(claimObject));
      } else {
        dispatch(setclickclaimObject(undefined));
      }

      //  return (<AreaMapClickPopup claimObj={claimObject} fpropObj={fPropertyObject} assetObj={assetObject} syncPropObj={syncPropertyObject } />)
    };

    if (coordinates) {
      fetchData();
      setclickedOnFeature(clickedOnFeatureTmp);
      if (clickedOnFeatureTmp) {
        setclickDataLoaded(true);
      }
      //  console.log("222")
    }
  }, [coordinates]);

  const onClickViewPlusZoom = () => {
    const curZoom = mapViewRef.current.getZoom();
    mapViewRef.current.setZoom(curZoom + 1);

    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };
  const onClickViewMinusZoom = () => {
    const curZoom = mapViewRef.current.getZoom();
    mapViewRef.current.setZoom(curZoom - 1);

    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };

  const onClickViewInitZoom = () => {
    mapViewRef.current.setZoom(3.25);
    mapViewRef.current.setCenter([-10694872.010699773, 7434223.337137634]);

    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };

  useEffect(() => {
    if (mapViewRef.current) {
      const scale = mapRatioScale({ map: mapRef.current });
      setmapScale(scale.toLocaleString());
    }
  }, [mapViewRef.current]);

  return (
    <div className="flex">
      <CompanySideNavbar />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${
                  isSideNavOpen ? "" : "rotate-180"
                }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <GiEarthAmerica
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewInitZoom}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewPlusZoom}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillMinusSquare
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewMinusZoom}
              />
            </Button>
          </div>
        </div>
        <ButtonGroup
          variant="faded"
          className="absolute left-0 bottom-1 z-50"
          color="primary"
        >
          <Button
            onClick={() => setLyrs("m")}
            className={`${
              companyLyrs == "m"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } w-22`}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              companyLyrs == "s"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            }  w-22 `}
          >
            Satellite
          </Button>
          <Button
            onClick={() => setLyrs("p")}
            className={`${
              companyLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            }  w-22 `}
          >
            Terrain
          </Button>
        </ButtonGroup>

        <ButtonGroup
          variant="faded"
          className="fixed right-0 bottom-1 z-50 "
          color="primary"
        >
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Scale:${mapScale}`}
          </Button>
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Lat:${lat}`}
          </Button>
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Long:${long}`}
          </Button>
        </ButtonGroup>
        <div
          ref={setPopup}
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "2px",
            right: "8px",
            backgroundColor: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #cccccc",
            minWidth: "280px",
            color: "black",
            // backgroundColor: "white",
            // boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            // padding: "15px",
            // borderRadius: "10px",
            // border: "1px solid #cccccc",
            // minWidth: "280px",
            // color: "black",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              setCoordinates(undefined);
              e.target.blur();
              return false;
            }}
            style={{
              textDecoration: "none",
              position: "absolute",
              top: "2px",
              right: "8px",
            }}
          >
            ✖
          </button>
          <div id="popup-contentc">
            {/* <p>Info:</p> */}
            {clickDataLoaded && <CompanyMapClickPopup />}
          </div>
        </div>

        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen
              ? isCompanySideNavOpen
                ? "65vw"
                : "83vw"
              : "100vw",
            // width: isSideNavOpen ? (isLandingMapSideNavOpen ? "65vw" : "83vw") : "100vw", isCompanySideNavOpen
            height: "90vh",
          }}
          controls={[]}
          onSingleclick={onSingleclick}
          onPointermove={onPointerMove}
        >
          {popup && clickedOnFeature ? (
            <olOverlay
              element={popup}
              position={coordinates}
              autoPan
              autoPanAnimation={{
                duration: 250,
              }}
            />
          ) : null}
          <olView
            ref={mapViewRef}
            initialCenter={[0, 0]}
            center={companyInitialCenter}
            initialZoom={2}
            zoom={companyZoomLevel}
            onchange={onViewChange}
          />
          <olLayerTile preload={Infinity}>
            {/* <olSourceOSM /> */}
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${companyLyrs}&hl=en&x={x}&y={y}&z={z}`,
                // url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
              }}
            ></olSourceXYZ>
          </olLayerTile>

          <olLayerVectorImage
            ref={areaBoundaryImgLayerRef}
            style={styleFunctionAreaBoundary}
          >
            <olSourceVector
              ref={areaBoundaryImgSourceRef}
              // format={new GeoJSON()}
              strategy={all}
              loader={areaLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>
          <olLayerVector ref={claimLinkVectorLayerRef}>
            {syncClaimLinkPropertyFeatures && (
              <olSourceVector
                ref={claimLinkSourceRef}
                minResolution={0}
             maxResolution={maxResolutionSyncOutlines}
                //  style={companyMap_tbl_sync_claimlink_VectorLayerStyleFunction} 
              ></olSourceVector>
            )}
          </olLayerVector>
          <olLayerVectorImage
            ref={claimVectorImgLayerRef}
            style={styleFunctionClaim}
            minResolution={0}
             maxResolution={maxResolutionClaims ?? 150}
          >
            <olSourceVector
              ref={claimVectorImgSourceRef}
              // format={new GeoJSON()}
              strategy={bbox}
              loader={claimLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>

          <olLayerVector ref={fPropVectorLayerRef}>
            <olSourceVector ref={fPropSourceRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector ref={fPropVectorLayerLabelRef}>
            <olSourceVector ref={fPropSourceLabelRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector
            ref={assetLayerRef}
            style={areaMapAssetVectorLayerStyleFunction}
            minResolution={0}
            maxResolution={companyAssetLayerAlwaysVisible ? 40075016 : maxResolutionAssets}
          
          >
            <olSourceVector ref={assetSourceRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector
            ref={syncPropVectorLayerRef}
            style={styleFunctionSyncProperties}
               minResolution={0}
             maxResolution={maxResolutionPropPoints}
          >
            <olSourceVector ref={syncPropSourceRef}></olSourceVector>
          </olLayerVector>
        </Map>
      </div>
    </div>
  );
};
{
  /* <olLayerTile>
  {/* <olSourceOSM /> */
}
//     <olSourceXYZ args={{ url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", }} > map=m terr=p satt=s
//   </olSourceXYZ>
// </olLayerTile> */}

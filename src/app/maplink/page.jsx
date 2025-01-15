"use client";

import { Map } from "@react-ol/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AreaBoundaryLayer from "./components/map-layers/area-boundary/area-boundary-layer";
import { METERS_PER_UNIT } from "ol/proj/Units";
import { toLonLat } from "ol/proj";
import { useSearchParams } from "next/navigation";
import FPropLayer from "./components/map-layers/featured-props/f-prop-layer";
import AssetsLayer from "./components/map-layers/assets-layer/assets-layer";
import ClaimLinkLayer from "./components/map-layers/claim-link-vector-layer/claim-link-layer";
import AccordionItemWithEyeWithLockVisibilityLabelMapLink from "./components/map-controllers/components/accordion-item-with-eye-with-lock-visibility-label-map-link";
import LayerVisibleVisibilityStateDivMapLink from "./components/map-controllers/components/layer-visible-visibility-state-div-map-link";
import Image from "next/image";
import Accordion from "../components/common-comp/accordion";
import LayerVisibleVisibilityStateLabelDivMapLink from "./components/map-controllers/components/layer-visible-visibility-state-label-div";
import { BiSolidNavigation } from "react-icons/bi";
import Link from "next/link";
import { Autocomplete, Select, SelectItem, Spinner } from "@nextui-org/react";
import VectorImageLayer from "./components/map-layers/claim-vector-image-layer/vector-image-layer";
import { MdOutlineArrowDropDown } from "react-icons/md";
import GeoJSON from "ol/format/GeoJSON";
import { type } from "os";
export const SelectorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );
};

const formatUrl = (url) => {
  //remove https:
  let res = url;
  let urlPrefix = "https://";
  let a = res.search("https://");
  if (a != -1) {
    res = res.substring(8);
  }

  a = res.search("http://");
  if (a != -1) {
    res = res.substring(7);
    urlPrefix = "http://";
  }
  //rem trailling /
  if (res[res.length - 1] == "/") {
    res = res.substring(0, res.length - 1);
  }
  //check for www
  //  a = res.search("www");
  //  if (a == -1) {
  //    res = "www." + res
  //  }

  return { url: res, urlPrefix };
};
const MapLinks = () => {
  // lyrs=m&z=8&c=-11807733.8880124,8018389.88680427&companyId=1112

  const DOTS_PER_INCH = 72;
  const INCHES_PER_METRE = 39.37;
  const [initialCenter, setInitialCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2);
  const mapRef = useRef();
  const mapViewRef = React.createRef();
  const [selectedMap, setSelectedMap] = useState("m");
  const [long, setlong] = useState(0);
  const [lat, setlat] = useState(0);
  const [scale, setScale] = useState(0);
  const [fPropRenderCount, setfPropRenderCount] = useState(0);
  const [companyId, setCompanyId] = useState(0);
  const [sponsorData, setsponsorData] = useState("");
  const [profile, setprofile] = useState("");
  const [preurl, setpreurl] = useState("");
  const [url, seturl] = useState("");
  const [logoPath, setlogoPath] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [zoomMode, setZoomMode] = useState([]);
  const [areaId, setAreaId] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const [fpropExtent, setFpropExtent] = useState([]);
  const [assetsExtent, setAssetsExtent] = useState([]);
  const [fpropCount, setFpropCount] = useState(-1);
  const [assetsCount, setAssetsCount] = useState(-1);
  const searchParams = useSearchParams();
  const [assetsIsLoading, setAssetsIsLoading] = useState(true);
  const [fpropIsLoading, setFpropIsLoading] = useState(true);
  const [companydetailsIsLoading, setCompanydetailsIsLoading] = useState(true);
  const [sponsorDetailsIsLoading, setSponsorDetailsIsLoading] = useState(true);
  const [claimLayerIsLoading, setClaimLayerIsLoading] = useState(false);

  const [fPropertyFeatures, setFPropertyFeatures] = useState(null);
  const [featuredPropertiesLocal, setFeaturedPropertiesLocal] = useState([]);
  const [companyAssetLayerVisible, setcompanyAssetLayerVisible] =
    useState(true);

  const [companyAssetLayerAlwaysVisible, setcompanyAssetLayerAlwaysVisible] =
    useState(false);

  const [assetVisibilityState, setAssetVisibilityState] = useState(true);

  const [cmapAssetLableVisible, setAssetLableVisibility] = useState(true);
  const [companyAssetOpMineVisible, setcompanyAssetOpMineVisible] =
    useState(true);
  const [companyAssetDepositsVisible, setcompanyAssetDepositsVisible] =
    useState(true);
  const [companyAssetZoneVisible, setcompanyAssetZoneVisible] = useState(true);
  const [companyAssetHistoricalVisible, setcompanyAssetHistoricalVisible] =
    useState(true);
  const [companyAssetOccurrenceVisible, setcompanyAssetOccurrenceVisible] =
    useState(true);

  const [companyClaimLayerVisible, setcompanyClaimLayerVisible] =
    useState(false);
  const [claimsVisibilityState, setClaimsVisibilityState] = useState(true);

  const [cmapClaimLableVisible, setClaimLabelVisibility] = useState(true);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const setcompanyClaimLayerVisibility = (e) => {
    setcompanyClaimLayerVisible(!companyClaimLayerVisible);
  };

  const setcompanyAssetLayerVisibility = (e) => {
    setcompanyAssetLayerVisible(!companyAssetLayerVisible);
  };

  const setcompanyAssetLayerAlwaysVisibility = (e) => {
    setcompanyAssetLayerAlwaysVisible(!companyAssetLayerAlwaysVisible);
  };

  const setcompanyAssetOpMineVisibility = (e) => {
    setcompanyAssetOpMineVisible(!companyAssetOpMineVisible);
  };

  const setcompanyAssetDepositVisibility = (e) => {
    setcompanyAssetDepositsVisible(!companyAssetDepositsVisible);
  };

  const setcompanyAssetZoneVisibility = (e) => {
    setcompanyAssetZoneVisible(!companyAssetZoneVisible);
  };

  const setcompanyAssetHistoricalVisibility = (e) => {
    setcompanyAssetHistoricalVisible(!companyAssetHistoricalVisible);
  };

  const setcompanyAssetOccurrenceVisibility = (e) => {
    setcompanyAssetOccurrenceVisible(!companyAssetOccurrenceVisible);
  };

  useEffect(() => {
    const lyrs = searchParams.get("lyrs") || "m";
    const z = searchParams.get("z") || 2;
    const c = searchParams.get("c") || "0,0";
    const [x, y] = c.split(",").map((v) => parseFloat(v));
    const conmpanyId = searchParams.get("companyId");
    const areaId = searchParams.get("aid") || null;
    const propertyId = searchParams.get("pid") || null;

    const zoomMode = searchParams.get("zm")
      ? searchParams.get("zm").split(",")
      : ["fix"];

    setFpropExtent([]); //reset the extend
    setAssetsExtent([]); //reset the extend
    setAssetsCount(-1);
    setFpropCount(-1);
    setZoomMode(zoomMode);
    console.log("zoomMode", zoomMode);
    setAreaId(areaId);
    setPropertyId(propertyId);
    setCompanyId(conmpanyId);
    setInitialCenter([x, y]);
    setZoom(z);
    setSelectedMap(lyrs);
  }, [searchParams]);

  function inchesPreUnit(unit) {
    return METERS_PER_UNIT[unit] * INCHES_PER_METRE;
  }

  function mapRatioScale({ map, toRound = true }) {
    const resolution = map.getView().getResolution();
    const unit = map.getView().getProjection().getUnits();

    let scale = resolution * inchesPreUnit(unit) * DOTS_PER_INCH;
    return toRound ? Math.round(scale) : scale;
  }

  useEffect(() => {
    mouseScrollEvent();
  }, []);

  useEffect(() => {
    console.log("fpropExtent", fpropExtent);
    console.log("assetsExtent", assetsExtent);
    if (fpropCount > 0 && assetsCount > 0) {
      const extent = [
        Math.min(fpropExtent[0], assetsExtent[0]),
        Math.min(fpropExtent[1], assetsExtent[1]),
        Math.max(fpropExtent[2], assetsExtent[2]),
        Math.max(fpropExtent[3], assetsExtent[3]),
      ];
      mapRef.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
    } else if (fpropCount > 0) {
      mapRef.current.getView().fit(fpropExtent, { padding: [50, 50, 50, 50] });
    } else if (assetsCount > 0) {
      mapRef.current.getView().fit(assetsExtent, { padding: [50, 50, 50, 50] });
    }
  }, [fpropExtent, assetsExtent]);

  const onPointerMove = useCallback(
    (e) => {
      const coordinate1 = mapRef.current.getCoordinateFromPixel(e.pixel);
      const c = toLonLat(coordinate1);

      setlong(c[0].toFixed(4));
      setlat(c[1].toFixed(4));
    },
    [setlat, setlong]
  );

  const onViewChange = useCallback((e) => {
    const scale = mapRatioScale({ map: mapRef.current });
    setScale(scale);

    setfPropRenderCount((p) => p + 1);
  }, []);

  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

    const handleMoveEnd = () => {
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();

      setZoom(tmpZoomLevel);
      setInitialCenter(tmpinitialCenter);
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, []);

  useEffect(() => {
    if (companyId != 0) {
      getCompanyDetails();
      getSponsorDetails();
      getFeaturedPropertyGeom();
      console.log("companyId", companyId);
    }
  }, [companyId]);

  const getSponsorDetails = async () => {
    setSponsorDetailsIsLoading(true);
    const f = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sponsor_details/${companyId}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      //console.log("d", d)
      if (d.data.length > 0) {
        const sponsorData = getStyledTexts(d.data[0]?.company ?? "");
        setsponsorData(sponsorData);

        setprofile(d.data[0]?.profile ?? "");

        setSponsorDetailsIsLoading(false);
      } else {
        setprofile("");
        setsponsorData("");

        setSponsorDetailsIsLoading(false);
      }
    };

    f().catch(console.error, setSponsorDetailsIsLoading(false));
  };
  const getCompanyDetails = async () => {
    setCompanydetailsIsLoading(true);
    const f = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/company_details/${companyId}`,
        { cache: "no-store" }
      );
      const d = await res.json();

      let { url, urlPrefix, profile } = formatUrl(d.data[0]?.url ?? "");
      setpreurl(urlPrefix);
      //console.log("ppp", urlPrefix + url)
      // seturl(urlPrefix + url)
      setcompanyName(d.data[0]?.name);
      console.log("d", d.data[0]);
      seturl(url);
      const logo = d.data[0]?.logo;
      setCompanydetailsIsLoading(false);
      if (logo) {
        const logoext = d.data[0]?.logoext ?? "png";
        let urlimg =
          `data:image/${logoext};base64,` +
          btoa(String.fromCharCode.apply(null, new Uint8Array(logo.data)));

        setlogoPath(urlimg);

        setCompanydetailsIsLoading(false);
      } else {
        setlogoPath("");
        setCompanydetailsIsLoading(false);
      }
    };
    f().catch(console.error, setCompanydetailsIsLoading(false));
  };

  const getFeaturedPropertyGeom = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/map-link2/view_hotplay_company/${companyId}`,
      { cache: "no-store" }
    );
    const d = await res.json();
    // console.log("fps", d);
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

    setFPropertyFeatures(gj);

    console.log(gj, "gj");

    // d.data[0].json_build_object.features.map((i) =>
    //   console.log("i", i.properties.colour)
    // );
  };

  useEffect(() => {
    if (fPropertyFeatures?.features) {
      console.log("fPropertyFeatures", fPropertyFeatures);
      const result = [];
      const e = new GeoJSON().readFeatures(fPropertyFeatures);
      console.log("ee2-e", e);

      //groupby area
      function myCallback({ values_ }) {
        return values_.map_area;
      }

      const resultByArea = Object.groupBy(e, myCallback);

      for (const area in resultByArea) {
        console.log("area", area);
        //groupby name no-name
        const namedProps = resultByArea[area].filter((p) => p.get("prop_name"));
        namedProps.sort((a, b) => {
          return a.get("prop_name").toUpperCase() >
            b.get("prop_name").toUpperCase()
            ? 1
            : -1;
        });

        const unnamedProps = resultByArea[area].filter(
          (p) => !p.get("prop_name")
        );
        let blockno = 1;
        for (let index = 0; index < unnamedProps?.length; index++) {
          const element = unnamedProps[index];
          element.set("prop_name", "Block-" + blockno);
          blockno++;
        }
        function myCallback({ values_ }) {
          return values_.prop_name;
        }
        const groupByPropName = Object.groupBy(namedProps, myCallback);

        result.push({
          // map_area_id: area_id,
          map_area: area,
          namedProps: groupByPropName,
          unnamedProps,
        });
      }

      // console.log("ee2-list", e,)
      // const namedp = e.filter(fp => fp.get("prop_name"))
      // const unnamedp = e.filter(fp => !fp.get("prop_name"))

      // //sort namedp
      // namedp.sort((a, b) => { return a.get("prop_name").toUpperCase() > b.get("prop_name").toUpperCase() ? 1 : -1 })

      // //rename empty prop_names
      // let blockno = 1
      // for (let index = 0; index < unnamedp.length; index++) {
      //   const element = unnamedp[index];
      //   element.set("prop_name", "Block-" + blockno)
      //   blockno++;
      // }
      //console.log("loading f props -cmp2", result)
      setFeaturedPropertiesLocal(result);

      // setnamedFeaturedPropertiesLocal(namedp)
      // setunNamedFeaturedPropertiesLocal(unnamedp)
    } else {
      setFeaturedPropertiesLocal([]);
    }
  }, [fPropertyFeatures]);

  console.log(featuredPropertiesLocal, "featuredPropertiesLocal");
  return (
    <div className=" bg-gray-50 h-screen w-full flex flex-col justify-between items-center p-2">
      <div className="flex  gap-2">
        <div className="w-[calc(100vw-300px)] rounded-lg h-screen ">
          <Map
            onPointermove={onPointerMove}
            ref={mapRef}
            style={{ height: "calc(94vh)", borderRadius: "10px" }}
          >
            <olView
              onchange={onViewChange}
              initialCenter={[0, 0]}
              center={initialCenter}
              initialZoom={2}
              ref={mapViewRef}
              zoom={zoom}
            />
            <olLayerTile preload={Infinity}>
              <olSourceXYZ
                args={{
                  url: `https://mt0.google.com/vt/lyrs=${selectedMap}&hl=en&x={x}&y={y}&z={z}`,
                }}
              ></olSourceXYZ>
            </olLayerTile>
            {companyClaimLayerVisible && (
              <VectorImageLayer
                cmapClaimLableVisible={cmapClaimLableVisible}
                companyClaimLayerVisible={companyClaimLayerVisible}
                setClaimLayerIsLoading={setClaimLayerIsLoading}
                scale={scale}
              />
            )}
            <AreaBoundaryLayer />
            {/* <ClaimLinkLayer
            companyName={companyName}
            cmapClaimLableVisible={cmapClaimLableVisible}
            companyClaimLayerVisible={companyClaimLayerVisible}
            setClaimLayerIsLoading={setClaimLayerIsLoading}
          /> */}

            <FPropLayer
              companyId={companyId}
              fPropRenderCount={fPropRenderCount}
              mapRef={mapRef}
              mapViewRef={mapViewRef}
              setFpropExtent={setFpropExtent}
              setFpropCount={setFpropCount}
              areaId={areaId}
              propertyId={propertyId}
              setFpropIsLoading={setFpropIsLoading}
              selectedProperty={selectedProperty}
            />
            <AssetsLayer
              companyName={companyName}
              setAssetsExtent={setAssetsExtent}
              setAssetsCount={setAssetsCount}
              companyAssetLayerVisible={companyAssetLayerVisible}
              companyAssetLayerAlwaysVisible={companyAssetLayerAlwaysVisible}
              companyAssetOpMineVisible={companyAssetOpMineVisible}
              companyAssetDepositsVisible={companyAssetDepositsVisible}
              companyAssetZoneVisible={companyAssetZoneVisible}
              companyAssetHistoricalVisible={companyAssetHistoricalVisible}
              companyAssetOccurrenceVisible={companyAssetOccurrenceVisible}
              cmapAssetLableVisible={cmapAssetLableVisible}
              setAssetsIsLoading={setAssetsIsLoading}
              companyId={companyId}
              areaId={areaId}
              propertyId={propertyId}
            />
          </Map>
          <div className="w-full text-center flex justify-center items-center mt-2 ">
            <span className="text-xs text-black text-center font-semibold">
              Powered By The Northern Miner & DigiGeoData &copy; 2024
            </span>
          </div>
        </div>
        <div className="w-[260px] h-screen overflow-x-auto pb-5">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="  rounded-lg ">
              {(companydetailsIsLoading ||
                sponsorDetailsIsLoading ||
                assetsIsLoading ||
                fpropIsLoading ||
                claimLayerIsLoading) && (
                <div className="flex justify-center items-center  rounded-lg  mb-2">
                  <div className="bg-white px-3 py-2 rounded-lg">
                    <Spinner color="primary" />
                  </div>
                </div>
              )}
              <div className="flex w-full  justify-center items-center mt-4">
                {logoPath ? (
                  <img src={logoPath} className="w-32" />
                ) : (
                  <div>
                    <span className="text-black text-center text-sm font-semibold">
                      {companyName}
                    </span>
                  </div>
                )}
              </div>

              {featuredPropertiesLocal.length > 0 && !propertyId && (
                <div className="mt-4">
                  <span className="text-sm font-semibold text-center text-black mt-2 underline">
                    Property List By Area
                  </span>
                  <div className="shadow-large bg-white p-2 rounded-lg mt-2 gap-4 flex flex-col ">
                    {/* <Select
                      disableSelectorIconRotation
                      className="max-w-xs text-black border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      labelPlacement="outside"
                      style={{ backgroundColor: "#f3f4f6" }}
                      placeholder="Area name"
                      selectorIcon={<MdOutlineArrowDropDown />}
                    >
                      <SelectItem value="dog" className="text-black border ">
                        James Bay
                      </SelectItem>{" "}
                      <SelectItem value="dog" className="text-black border ">
                        James Bay
                      </SelectItem>
                    </Select>

                    <Select
                      disableSelectorIconRotation
                      className="max-w-xs text-black border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      labelPlacement="outside"
                      style={{ backgroundColor: "#f3f4f6" }}
                      placeholder="Area name"
                      selectorIcon={<MdOutlineArrowDropDown />}
                    >
                      <SelectItem value="dog" className="text-black border ">
                        James Bay
                      </SelectItem>
                    </Select> */}

                    {featuredPropertiesLocal.map((area, index) => {
                      console.log(area, "area");
                      const area_id =
                        area.namedProps[Object.keys(area.namedProps)[0]][0].get(
                          "area_id"
                        );

                      console.log(area_id, "area_id");
                      // if (areaId) {
                      //   if (area.namedProps[0].propName !== areaId) {
                      //     return null;
                      //   }
                      // }
                      console.log(typeof parseInt(areaId), "areaId");

                      if (areaId) {
                        if (area_id !== parseInt(areaId)) {
                          return null;
                        }
                      }

                      return (
                        <Select
                          key={index}
                          disableSelectorIconRotation
                          className="max-w-xs text-black border  border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                          labelPlacement="outside"
                          style={{ backgroundColor: "#f3f4f6" }}
                          placeholder={area.map_area}
                          label={area.map_area}
                          onChange={(e) => {
                            setSelectedProperty(e.target.value);
                            console.log(e, "e");
                          }}
                          selectorIcon={<MdOutlineArrowDropDown />}
                        >
                          {Object.keys(area.namedProps).map((propName) => {
                            console.log(propName, "propName");
                            return (
                              <SelectItem
                                key={propName}
                                value={propName}
                                
                                className="text-black border "
                              >
                                {propName}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      );
                    })}
                  </div>
                </div>
              )}
              {propertyId && (
                <div className="mt-4">
                  <span className="text-sm font-semibold text-center text-black mt-2 underline">
                    Property Details
                  </span>
                  <div className="shadow-large bg-white p-2 rounded-lg mt-2 gap-4 flex flex-col">
                    <div className="flex flex-col gap-2">
                      {featuredPropertiesLocal.map((area, index) => {
                        // console.log(area, "properties");

                        const properties = Object.keys(area.namedProps)
                          .map((propName) => {
                            return area.namedProps[propName].map((prop) => {
                              return {
                                prop_name: prop.get("prop_name"),
                                prop_id: prop.get("propertyid"),
                              };
                            });
                          })
                          .flat();

                        // Filter properties by propertyId if needed
                        if (propertyId) {
                          const property = properties.find(
                            (prop) => prop.prop_id === parseInt(propertyId)
                          );

                          // console.log(property, "property");
                          if (!property) {
                            return null;
                          }

                          return (
                            <div key={index} className="flex flex-col gap-2">
                              {/* <span className="text-sm font-semibold text-center text-black mt-2">
                                Property Id: {property.prop_id}
                              </span> */}
                              <span className="text-sm font-semibold text-center text-black mt-2">
                                Property Name: {property.prop_name}
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <span className="text-sm font-semibold text-center text-black mt-2 underline">
                  Layers
                </span>
                <div className="shadow-large bg-white p-2 rounded-lg mt-2 ">
                  <div className="flex justify-between items-center  bg-white  rounded-lg">
                    <Accordion>
                      <div className="flex flex-col gap-1">
                        <AccordionItemWithEyeWithLockVisibilityLabelMapLink
                          title="Assets"
                          onClick={setcompanyAssetLayerVisibility}
                          eyeState={companyAssetLayerVisible}
                          onLockClick={setcompanyAssetLayerAlwaysVisibility}
                          lockState={companyAssetLayerAlwaysVisible}
                          visibilityState={assetVisibilityState}
                          labelState={cmapAssetLableVisible}
                          setLabelState={setAssetLableVisibility}
                        >
                          <div className="flex flex-col gap-1">
                            <LayerVisibleVisibilityStateDivMapLink
                              title="Operating Mines"
                              onClick={setcompanyAssetOpMineVisibility}
                              eyeState={companyAssetOpMineVisible}
                              visibilityState={assetVisibilityState}
                            >
                              <Image
                                src="./asset-opmine.svg"
                                width={25}
                                height={10}
                                alt="prop"
                              />
                            </LayerVisibleVisibilityStateDivMapLink>
                            <LayerVisibleVisibilityStateDivMapLink
                              title="Deposits"
                              onClick={setcompanyAssetDepositVisibility}
                              eyeState={companyAssetDepositsVisible}
                              visibilityState={assetVisibilityState}
                            >
                              <Image
                                src="./asset-deposit.svg"
                                width={25}
                                height={10}
                                alt="prop"
                              />
                            </LayerVisibleVisibilityStateDivMapLink>
                            <LayerVisibleVisibilityStateDivMapLink
                              title="Zone"
                              onClick={setcompanyAssetZoneVisibility}
                              eyeState={companyAssetZoneVisible}
                              visibilityState={assetVisibilityState}
                            >
                              <Image
                                src="./asset-zone.svg"
                                width={25}
                                height={10}
                                alt="prop"
                              />
                            </LayerVisibleVisibilityStateDivMapLink>
                            <LayerVisibleVisibilityStateDivMapLink
                              title="Historical Mines"
                              onClick={setcompanyAssetHistoricalVisibility}
                              eyeState={companyAssetHistoricalVisible}
                              visibilityState={assetVisibilityState}
                            >
                              <Image
                                src="./asset-historical.svg"
                                width={25}
                                height={10}
                                alt="prop"
                              />
                            </LayerVisibleVisibilityStateDivMapLink>
                            <LayerVisibleVisibilityStateDivMapLink
                              title="Occurrences"
                              onClick={setcompanyAssetOccurrenceVisibility}
                              eyeState={companyAssetOccurrenceVisible}
                              visibilityState={assetVisibilityState}
                            >
                              <Image
                                src="./asset-occurrence.svg"
                                width={25}
                                height={10}
                                alt="prop"
                              />
                            </LayerVisibleVisibilityStateDivMapLink>
                          </div>
                        </AccordionItemWithEyeWithLockVisibilityLabelMapLink>
                      </div>
                    </Accordion>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2  rounded-lg mt-2">
                    <LayerVisibleVisibilityStateLabelDivMapLink
                      title="Claims"
                      onClick={setcompanyClaimLayerVisibility}
                      eyeState={companyClaimLayerVisible}
                      visibilityState={claimsVisibilityState}
                      labelState={cmapClaimLableVisible}
                      setLabelState={setClaimLabelVisibility}
                    >
                      <Image
                        src="./claims-layer.svg"
                        width={25}
                        height={10}
                        alt="prop"
                      />
                    </LayerVisibleVisibilityStateLabelDivMapLink>
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-lg mt-4 flex justify-center items-center ">
                <div>
                  <div className="relative flex">
                    <a
                      href="https://maps.northernminer.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 h-10  text-white font-semibold pl-6 py-2 rounded-full flex items-center justify-between space-x-2"
                    >
                      <span className="text-sm">Visit TNM Maps</span>
                      <div className="flex justify-center items-center bg-white text-white w-10 h-10 rounded-full ">
                        <div className="bg-gray-800  w-9 h-9 flex justify-center items-center rounded-full ml-0.5">
                          <BiSolidNavigation className="text-sm rotate-45" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className=" absolute right-6 bottom-5 z-50 ">
        <div
          className="flex items-center   rounded-lg"
          style={{ width: "max-content" }}
        >
          <Link
            href="https://digigeodata.com"
            target="_blank"
            className="flex items-center hidden md:block mr-8 bg-black  p-2"
          >
            <img
              src="/DigiGeoData_powered_by_white.webp"
              alt="logo DigiGeoData"
              className="w-[150px] h-[50px] min-w-[150px] min-h-[50px]"
            />
          </Link>
          <Link
            href="https://digigeodata.com"
            target="_blank"
            className="flex items-center hidden md:block mr-8 bg-black  p-2"
          >
            <img
              src="/TNM_logo_large.webp"
              alt="logo DigiGeoData"
              className="w-[200px] h-[50px] min-w-[200px] min-h-[50px]"
            />
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default MapLinks;

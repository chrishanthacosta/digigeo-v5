"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useDebounce from "../components/filter-popups/useDebounce";
import GeoJSON from "ol/format/GeoJSON";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useSelector } from "react-redux";

const CompanyLink2 = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState("");
  const [companyidLocal, setCompanyidLocal] = useState(0);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  //area state

  const [isLoadingFeaturedProperties, setIsLoadingFeaturedProperties] =
    useState(false);
  const [fPropertyFeatures, setFPropertyFeatures] = useState({});
  const [featuredPropertiesLocal, setFeaturedPropertiesLocal] = useState([]);
  const [copyLink, setCopyLink] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [xCenter, setXCenter] = useState(0);
  const [yCenter, setYCenter] = useState(0);
  const [zoomLevelAllProp, setZoomLevelAllProp] = useState(0);

  //   const viewPortWidth = useSelector(
  //     (state) => state.companyMapReducer.viewPortWidth
  //   );
  // console.log("viewPortWidth", viewPortWidth);
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          like: search,
          page_size: pageSize,
          page_number: pageNumber,
        });

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/sponsored-companylist?${queryParams.toString()}`,
          {
            cache: "force-cache",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await res.json();
        setCompanyList(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [search, pageSize, pageNumber]);

  const customClassNames = {
    base: "text-white",
  };

  useEffect(() => {
    if (companyidLocal) {
      getFeaturedPropertyGeom().catch(console.error);
    }
  }, [companyidLocal]);

  const getFeaturedPropertyGeom = async () => {
    const f = async () => {
      setIsLoadingFeaturedProperties(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/map-link2/view_hotplay_company/${companyidLocal}`,
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

      setIsLoadingFeaturedProperties(false);
      setFPropertyFeatures(gj);

      console.log(gj, "gj");

      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // );
    };
    if (companyidLocal == 0) {
      console.log("companyidLocal", companyidLocal);
    } else {
      f().catch(console.error);
    }
  };

  useEffect(() => {
    if (fPropertyFeatures?.features) {
      const result = [];
      const e = new GeoJSON().readFeatures(fPropertyFeatures);
      console.log("ee2-e", e);

      const xmin = e.reduce((acc, cur) => {
        return Math.min(acc, cur.get("x"));
      }, 10000000000000000000000);

      const xmax = e.reduce((acc, cur) => {
        return Math.max(acc, cur.get("x"));
      }, -10000000000000000000000);

      const ymin = e.reduce((acc, cur) => {
        return Math.min(acc, cur.get("y"));
      }, 10000000000000000000000);

      const ymax = e.reduce((acc, cur) => {
        return Math.max(acc, cur.get("y"));
      }, -10000000000000000000000);

      const zoomLevelCalX = xmax - xmin;

      const zoomLevelCalY = ymax - ymin;
      console.log(Math.max(zoomLevelCalX, zoomLevelCalY), "uis");

      const maxDistance = Math.max(zoomLevelCalX, zoomLevelCalY);
      const resolution = maxDistance / 1000;

      const zoomLevelAllProp = Math.log2(156543.03392 / resolution);

      setZoomLevelAllProp(zoomLevelAllProp);
      // console.log("zoomLevel", zoomLevelAllProp);

      const xCenter = (xmin + xmax) / 2;
      const yCenter = (ymin + ymax) / 2;
      console.log(xCenter, yCenter);
      setXCenter(xCenter);
      setYCenter(yCenter);

      // console.log("xmin", xmin, "xmax", xmax, "ymin", ymin, "ymax", ymax);

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

  // http://localhost:8000/map-link?t=company&sn=false&sn2=true&lyrs=m&z=11&c=-12193049.0629,7945578.91415&companyid=1112
  // https://maps.northernminer.com/?t=company&sn=true&sn2=true&lyrs=m&z=11&c=-12193049.0629,7945578.91415&companyId=1112
  const generateMapLink = (area, map_area) => {
    // console.log(area.map_area, "area-link");

    //filter areax and areay from area using area.map_area
    console.log("area", area);
    const areaX =
      area.namedProps[Object.keys(area.namedProps)[0]][0].get("areax");

    const areaY =
      area.namedProps[Object.keys(area.namedProps)[0]][0].get("areay");

    const area_id =
      area.namedProps[Object.keys(area.namedProps)[0]][0].get("area_id");
    // console.log(area.map_area, "area-name", "areaX", areaX, "areaY", areaY);

    const link = `https://maps.northernminer.com/maplink`;

    const lyrs = `lyrs=m`;
    const z = `z=8`;
    const c = `c=${areaX},${areaY}`;
    const companyId = `companyId=${companyidLocal}`;
    const zm = `zm=ex`;
    const areaId = `aid=${area_id}`;

    const mapLink = `${link}?${lyrs}&${z}&${c}&${companyId}&${zm}&${areaId}`;

    // console.log(mapLink);
    return (
      <div className="text-blue-500 text-sm flex justify-center items-center gap-2">
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-blue-700"
        >
          {"Map Link"}
        </a>

        <Tooltip
          showArrow={true}
          color="primary"
          content="copy link"
          placement="right"
          className="text-xs"
        >
          <button>
            <IoCopyOutline
              className="text-blue-600 text-lg cursor-pointer hover:text-blue-800"
              onClick={() => {
                navigator.clipboard.writeText(mapLink).then(() => {
                  setCopyLink(map_area);

                  setTimeout(() => {
                    setCopyLink("");
                  }, 2000);
                });
              }}
            />
          </button>
        </Tooltip>

        {copyLink === map_area && (
          <div className="text-xs text-green-700">Copied</div>
        )}
      </div>
    );
  };
  const generateMapLinkProperty = (
    area,
    propertyX,
    propertyY,
    propName,
    propertyId
  ) => {
    const link = `https://maps.northernminer.com/maplink`;

    const lyrs = `lyrs=m`;
    const z = `z=11`;
    const c = `c=${propertyX},${propertyY}`;
    const companyId = `companyId=${companyidLocal}`;
    const zm = `zm=ex`;
    const property_Id = `pid=${propertyId}`;

    const mapLink = `${link}?${lyrs}&${z}&${c}&${companyId}&${zm}&${property_Id}`;

    {
      /* <Tooltip
          showArrow={true}
          color="primary"
          content="copy link"
          placement="right"
          className="text-xs"
        > */
    } // console.log(mapLink);
    return (
      <div className="text-blue-500 text-sm flex justify-center items-center gap-2">
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-blue-700"
        >
          {"Map Link"}
        </a>

        <button>
          <IoCopyOutline
            className="text-blue-600 text-lg cursor-pointer hover:text-green-800"
            onClick={() => {
              navigator.clipboard.writeText(mapLink).then(() => {
                setCopyLink(propName);

                setTimeout(() => {
                  setCopyLink("");
                }, 2000);
              });
            }}
          />
        </button>
        {/* </Tooltip> */}

        {copyLink === propName && (
          <div className="text-xs text-green-700">Copied</div>
        )}
      </div>
    );
  };
  const generateMapLinkAllAreas = (x, y, zoomLevelAllProp, areaName) => {
    const link = `https://maps.northernminer.com/maplink`;

    const lyrs = `lyrs=m`;
    const z = `z=${zoomLevelAllProp}`;
    const c = `c=${x},${y}`;
    const companyId = `companyId=${companyidLocal}`;
    const zm = `zm=ex`;


    const mapLink = `${link}?${lyrs}&${z}&${c}&${companyId}&${zm}`;

    {
      /* <Tooltip
          showArrow={true}
          color="primary"
          content="copy link"
          placement="right"
          className="text-xs"
        > */
    } // console.log(mapLink);
    return (
      <div className="text-blue-500 text-sm flex justify-center items-center gap-2">
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-blue-700"
        >
          {"Map Link"}
        </a>

        <button>
          <IoCopyOutline
            className="text-blue-600 text-lg cursor-pointer hover:text-green-800"
            onClick={() => {
              navigator.clipboard.writeText(mapLink).then(() => {
                setCopyLink(areaName);

                setTimeout(() => {
                  setCopyLink("");
                }, 2000);
              });
            }}
          />
        </button>
        {/* </Tooltip> */}

        {copyLink === areaName && (
          <div className="text-xs text-green-700">Copied</div>
        )}
      </div>
    );
  };
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className="bg-gray-100 flex"
      style={{
        minHeight: "calc(100vh - 10vh)",
      }}
    >
      <div className="w-[50%] text-black p-5">
        <div className="text-xl font-semibold text-gray-900 mb-4">
          Company Map Link
        </div>
        {/* <Autocomplete
          allowsEmptyCollection={true}
          allowsCustomValue={true}
          label="Company Name"
          className="max-w-md"
          selectedKey={companyidLocal}
          onInputChange={(e) => {
            setStockcode("");
            setCompanyidLocal(0);
            setSearch(e);
            setCompany(e);
          }}
          onSelectionChange={(selectedKey) => {
            const selectedCompany = companyList.find(
              (companyObj) => companyObj.companyid === Number(selectedKey)
            );
            if (selectedCompany) {
              setCompany(selectedCompany.name);
              setCompanyidLocal(Number(selectedKey));
              setSelectedCompanyName(selectedCompany.name);
            }
          }}
          inputValue={company}
          classNames={customClassNames}
          inputProps={{ className: "dark:text-white text-black" }}
        >
          {companyList.length > 0 &&
            companyList.map((companyObj) => (
              <AutocompleteItem
                key={companyObj.companyid}
                value={companyObj.companyid}
                className="dark:text-white text-black"
              >
                {companyObj.name}
              </AutocompleteItem>
            ))}
        </Autocomplete> */}
        <Input
          label="Company Name"
          placeholder="Enter Company Name Here..."
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNumber(1);
          }}
          className="max-w-md shadow-lg rounded-lg"
        />

        {companyList?.length > 0 && (
          <>
            <div className="mt-2 border p-2 rounded-lg bg-white shadow-lg ">
              {companyList.map((companyObj) => (
                <div
                  key={companyObj.companyid}
                  className={`text-black text-sm mt-2 border p-2 cursor-pointer rounded-lg hover:text-blue-600 gap-3 flex flex-col ${
                    selectedCompanyName === companyObj.name
                      ? "bg-blue-100 border-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    setCompany(companyObj.name);
                    setCompanyidLocal(companyObj.companyid);
                    setSelectedCompanyName(companyObj.name);
                  }}
                >
                  {companyObj.name}
                </div>
              ))}
            </div>
          </>
        )}

        {/* {companyList.length === 0 && (
          <div className="text-sm font-semibold text-gray-800 mt-2 p-2 shadow-lg bg-white rounded-lg">
            No companies found
          </div>
        )} */}

        {!isLoading && companyList?.length === 0 && (
          <div className="text-sm font-semibold text-gray-800 mt-2 p-2 shadow-lg bg-white rounded-lg">
            No companies found
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Spinner />
          </div>
        )}
        <div className="flex justify-center gap-3 items-center mt-4">
          <button
            className="bg-white shadow-sm  px-4 py-2 rounded-lg text-blue-600"
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              }
            }}
          >
            {/* <GrPrevious className="text-blue-600" color="blue" /> */}
            <span className="text-lg">{"<"}</span>
          </button>
          <div className="text-blue-600 ">{`Page ${pageNumber}`}</div>
          <button
            className="bg-white shadow-sm  px-4 py-2 rounded-lg text-blue-600"
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
          >
            {/* <GrNext className="text-blue-600" color="blue" />
             */}
            <span className="text-lg">{">"}</span>
          </button>
        </div>
      </div>
      <div className="w-[50%] text-black p-5">
        {selectedCompanyName && (
          <div className="text-gray-700 mb-2 px-5 font-semibold ">
            Selected Company: {selectedCompanyName}
          </div>
        )}
        {selectedCompanyName && (
          <div className="px-5">
            <div className=" text-lg font-semibold text-gray-900 border p-4 my-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
              {selectedCompanyName &&
                (isLoadingFeaturedProperties ? (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  <div
                    style={{
                      maxHeight: "calc(100vh - 250px)",
                      overflowY: "auto",
                    }}
                  >
                    {featuredPropertiesLocal?.length > 0 ? (
                      <>
                        {selectedCompanyName && (
                          <div className="flex gap-2 px-1 items-center">
                            <span className="text-blue-600">
                              {selectedCompanyName}
                            </span>
                            <span>
                              {generateMapLinkAllAreas(
                                xCenter,
                                yCenter,
                                zoomLevelAllProp,
                                selectedCompanyName
                              )}
                            </span>
                          </div>
                        )}
                        {featuredPropertiesLocal.map((area) => {
                          const isExpanded =
                            expandedSections[area.map_area] || false;

                          return (
                            <div key={area.map_area} className="border-b mt-2">
                              <div
                                // onClick={() => toggleSection(area.map_area)}
                                className="bg-gray-100 text-lg font-semibold text-gray-800 py-2 px-4 rounded-t-md flex justify-start items-center gap-3"
                              >
                                <span className="text-purple-600">
                                  {area.map_area}
                                </span>
                                <span>
                                  {generateMapLink(area, area.map_area)}
                                </span>

                                <button className="text-sm text-black underline hover:text-gray-900 ">
                                  {isExpanded ? (
                                    <IoIosArrowDown
                                      onClick={() =>
                                        toggleSection(area.map_area)
                                      }
                                      size={20}
                                    />
                                  ) : (
                                    <IoIosArrowForward
                                      onClick={() =>
                                        toggleSection(area.map_area)
                                      }
                                      size={20}
                                    />
                                  )}
                                </button>
                              </div>

                              {isExpanded && (
                                <div className="p-4">
                                  {Object.keys(area.namedProps).map(
                                    (propName) => {
                                      const fps = area.namedProps[propName];
                                      const fp = fps[0];

                                      const propertyX =
                                        area.namedProps[propName][0].get("x");
                                      const propertyY =
                                        area.namedProps[propName][0].get("y");
                                      const propertyId =
                                        area.namedProps[propName][0].get(
                                          "propertyid"
                                        );
                                      return (
                                        <div
                                          key={fp.get("id")}
                                          className="text-sm text-gray-700 mb-2 gap-3 flex items-center"
                                        >
                                          <span className="text-indigo-600">
                                            {fp.get("prop_name")}
                                          </span>
                                          <span>
                                            {generateMapLinkProperty(
                                              area,
                                              propertyX,
                                              propertyY,
                                              propName,
                                              propertyId
                                            )}
                                          </span>
                                        </div>
                                      );
                                    }
                                  )}

                                  {/* {area.unnamedProps?.length > 0 && (
                                    <div className="mt-4">
                                      <div className="font-semibold text-base text-gray-900 mb-2">
                                        {"Unnamed Properties"}
                                      </div>
                                      {area.unnamedProps.map((fp) => {
                                        const propertyX = fp.get("x");
                                        const propertyY = fp.get("y");

                                       console.log("fp un", fp);

                                        return (
                                          <div
                                            key={fp.get("id")}
                                            className="text-sm text-gray-700 mb-2 gap-3 flex items-center"
                                          >
                                            <span className="text-green-600">
                                              {fp.get("prop_name")}
                                            </span>
                                            <span>
                                              {generateMapLinkProperty(
                                                area,
                                                propertyX,
                                                propertyY,
                                                fp.get("prop_name"),
                                                fp.get("propertyid")
                                              )}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )} */}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* {featuredPropertiesLocal.map((area) => {
                          const isExpanded =
                            expandedSections[area.map_area] || false;

                          return (
                            <div key={area.map_area} className="border-b mt-2">
                              <div
                                // onClick={() => toggleSection(area.map_area)}
                                className="bg-gray-100 text-lg font-semibold text-gray-800 py-2 px-4 rounded-t-md flex justify-start items-center gap-3"
                              >
                                <span className="text-purple-600">
                                  {area.map_area}
                                </span>
                                <span>
                                  {generateMapLink(area, area.map_area)}
                                </span>

                                <button className="text-sm text-black underline hover:text-gray-900 ">
                                  {isExpanded ? (
                                    <IoIosArrowDown
                                      onClick={() =>
                                        toggleSection(area.map_area)
                                      }
                                      size={20}
                                    />
                                  ) : (
                                    <IoIosArrowForward
                                      onClick={() =>
                                        toggleSection(area.map_area)
                                      }
                                      size={20}
                                    />
                                  )}
                                </button>
                              </div>

                              {isExpanded && (
                                <div className="p-4">
                                  {Object.keys(area.namedProps).map(
                                    (propName) => {
                                      const fps = area.namedProps[propName];
                                      const fp = fps[0];

                                      const propertyX =
                                        area.namedProps[propName][0].get("x");
                                      const propertyY =
                                        area.namedProps[propName][0].get("y");

                                      return (
                                        <div
                                          key={fp.get("id")}
                                          className="text-sm text-gray-700 mb-2 gap-3 flex items-center"
                                        >
                                          <span className="text-indigo-600">
                                            {fp.get("prop_name")}
                                          </span>
                                          <span>
                                            {generateMapLinkProperty(
                                              area,
                                              propertyX,
                                              propertyY,
                                              propName
                                            )}
                                          </span>
                                        </div>
                                      );
                                    }
                                  )}

                                  {area.unnamedProps.length > 0 && (
                                    <div className="mt-4">
                                      <div className="font-semibold text-base text-gray-900 mb-2">
                                        {"Unnamed Properties"}
                                      </div>
                                      {area.unnamedProps.map((fp) => {
                                        const propertyX = fp.get("x");
                                        const propertyY = fp.get("y");

                                        return (
                                          <div
                                            key={fp.get("id")}
                                            className="text-sm text-gray-700 mb-2 gap-3 flex items-center"
                                          >
                                            <span className="text-green-600">
                                              {fp.get("prop_name")}
                                            </span>
                                            <span>
                                              {generateMapLinkProperty(
                                                area,
                                                propertyX,
                                                propertyY,
                                                fp.get("prop_name")
                                              )}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })} */}
                      </>
                    ) : (
                      <div className="text-sm font-semibold text-gray-800">
                        No featured properties found
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyLink2;

"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
// import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
// import { BsFillArrowLeftSquareFill } from "react-icons/bs";
// import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
// import { setIsAreaSideNavOpen } from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import AccordionItemWithEyeWithLock from "../../common-comp/accordion-eye-with-lock";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import LayerVisibleLockDiv from "../../common-comp/layer-visible-eye-with-lock";
import { AiFillAppstore } from "react-icons/ai";
import {
  setareaAreaBoundaryLayerVisible,
  setareaAssetDepositsVisible,
  setareaAssetHistoricalVisible,
  setareaAssetLayerVisible,
  setareaAssetOccurrenceVisible,
  setareaAssetOpMineVisible,
  setareaAssetZoneVisible,
  setareaClaimLayerVisible,
  setareaFpropLayerVisible,
  setareaSyncClaimLinkLayerVisible,
  setareaSyncPropLayerVisible,
  setareaSyncPropLayerAlwaysVisible,
  setareaAssetLayerAlwaysVisible,
  setamapClaimLableVisible,
  setamapAssetLableVisible,
  setamapAreaLableVisible,
  setamapsyncPropLableVisible,
} from "@/store/area-map/area-map-slice";
import Image from "next/image";
import LayerVisibleVisibilityStateDiv from "./../../common-comp/layer-visible-eye-visibility-state";
import LayerVisibleLockVisibilityDiv from "./../../common-comp/layer-visible-eye-with-lock-with-visibility";
import AccordionItemWithEyeWithLockVisibility from "./../../common-comp/accordion-eye-with-lock-with-visibilty";
import AccordionItemWithEyeWithLockVisibilityLabel from "../../common-comp/accordion-eye-with-lock-with-visibilty-label";
import LayerVisibleWithLabelDiv from "../../common-comp/layer-visible-eye-with-label";
import LayerVisibleVisibilityStateLabelDiv from "../../common-comp/layer-visible-eye-visibility-state-label";
import LayerVisibleLockVisibilityLabelDiv from "../../common-comp/layer-visible-eye-with-lock-with-visibility-label";

const AreaBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();

  const [property_claimLinkGroupVisible, setproperty_claimLinkGroupVisible] =
    useState(true);
  const [claimsVisibilityState, setclaimsVisibilityState] = useState(true);
  const [propertyVisibilityState, setpropertyVisibilityState] = useState(true);
  const [assetVisibilityState, setassetVisibilityState] = useState(true);

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const isAreaSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isAreaSideNavOpen
  );
  const accordionItems = [
    {
      title: "Assets",
      content: "Content for Accordion Item 1",
    },
    {
      title: "Properties",
      content: "Content for Accordion Item 2",
    },
    {
      title: "Claims",
      content: "Content for Accordion Item 3",
    },
  ];

  //layer visibility redux states
  const areaFpropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaFpropLayerVisible
  );
  const areaAssetLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetLayerVisible
  );
  const areaAssetLayerAlwaysVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetLayerAlwaysVisible
  );
  const areaSyncPropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncPropLayerVisible
  );
  const areaSyncPropLayerAlwaysVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncPropLayerAlwaysVisible
  );
  const areaSyncClaimLinkLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncClaimLinkLayerVisible
  );
  const areaClaimLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaClaimLayerVisible
  );
  const areaAreaBoundaryLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaAreaBoundaryLayerVisible
  );
  //layer visibility functions
  const setareaFpropLayerVisibility = (e) => {
    dispatch(setareaFpropLayerVisible(!areaFpropLayerVisible));
  };
  const setareaAssetLayerVisibility = (e) => {
    dispatch(setareaAssetLayerVisible(!areaAssetLayerVisible));
  };
  const setareaAssetLayerAlwaysVisibility = (e) => {
    dispatch(setareaAssetLayerAlwaysVisible(!areaAssetLayerAlwaysVisible));
  };
  const setareaSyncPropLayerVisibility = (e) => {
    dispatch(setareaSyncPropLayerVisible(!areaSyncPropLayerVisible));
  };
  const setareaSyncPropLayerAlwaysVisibility = (e) => {
    dispatch(
      setareaSyncPropLayerAlwaysVisible(!areaSyncPropLayerAlwaysVisible)
    );
    if (!areaSyncPropLayerAlwaysVisible) {
      dispatch(setareaSyncPropLayerVisible(true));
    }
  };
  const setareaSyncClaimLinkLayerVisibility = (e) => {
    dispatch(setareaSyncClaimLinkLayerVisible(!areaSyncClaimLinkLayerVisible));
  };
  const setareaClaimLayerVisibility = (e) => {
    dispatch(setareaClaimLayerVisible(!areaClaimLayerVisible));
  };
  const setareaAreaBoundaryLayerVisibility = (e) => {
    dispatch(setareaAreaBoundaryLayerVisible(!areaAreaBoundaryLayerVisible));
  };

  //asset visibility redux states
  const areaAssetOpMineVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetOpMineVisible
  );
  const areaAssetDepositsVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetDepositsVisible
  );
  const areaAssetZoneVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetZoneVisible
  );
  const areaAssetHistoricalVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetHistoricalVisible
  );
  const areaAssetOccurrenceVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetOccurrenceVisible
  );

  //asset type visibility functions
  const setareaAssetOpMineVisibility = (e) => {
    dispatch(setareaAssetOpMineVisible(!areaAssetOpMineVisible));
  };
  const setareaAssetDepositVisibility = (e) => {
    dispatch(setareaAssetDepositsVisible(!areaAssetDepositsVisible));
  };
  const setareaAssetZoneVisibility = (e) => {
    dispatch(setareaAssetZoneVisible(!areaAssetZoneVisible));
  };
  const setareaAssetHistoricalVisibility = (e) => {
    dispatch(setareaAssetHistoricalVisible(!areaAssetHistoricalVisible));
  };
  const setareaAssetOccurrenceVisibility = (e) => {
    dispatch(setareaAssetOccurrenceVisible(!areaAssetOccurrenceVisible));
  };

  //layer visibility

  // mapViewScaleReducer.mapViewScales
  // const mapViewScaleReducer = useSelector((state) => state.mapViewScaleReducer);

  const areaCurrentScale = useSelector(
    (state) => state.areaMapReducer.areaCurrentScale
  );
  const areaMapViewScales = useSelector(
    (state) => state.areaMapReducer.areaMapViewScales
  );

  useEffect(() => {
   // console.log("xx1-areaCurrentScale", areaCurrentScale, areaMapViewScales);
    // mapViewScaleReducer.mapViewScales?.[0]?.claimscale > areaCurrentScale ?  setclaimsVisibilityState(true): setclaimsVisibilityState(false)
    if (areaMapViewScales) {
     // console.log("xx-if bot-compo-areaMapViewScales");
      areaMapViewScales.claimscale > areaCurrentScale
        ? setclaimsVisibilityState(true)
        : setclaimsVisibilityState(false);
      areaMapViewScales.proplayerscale > areaCurrentScale
        ? setpropertyVisibilityState(true)
        : setpropertyVisibilityState(false);
      areaMapViewScales.assetscale > areaCurrentScale
        ? setassetVisibilityState(true)
        : setassetVisibilityState(false);
    }

    // console.log("areaCurrentScale-mapViewScaleReducer ",mapViewScaleReducer.mapViewScales?.[0]?.claimscale)
  }, [areaCurrentScale, areaMapViewScales]);

  useEffect(() => {
    if (areaSyncPropLayerVisible && areaSyncClaimLinkLayerVisible) {
      setproperty_claimLinkGroupVisible(true);
    } else {
      setproperty_claimLinkGroupVisible(false);
    }
  }, [areaSyncPropLayerVisible, areaSyncClaimLinkLayerVisible]);

  //handle Properties Group Eye
  const setPropertiesGroupEye = () => {
    if (areaSyncPropLayerVisible || areaSyncClaimLinkLayerVisible) {
      dispatch(setareaSyncPropLayerVisible(false));
      dispatch(setareaSyncClaimLinkLayerVisible(false));
    } else {
      dispatch(setareaSyncPropLayerVisible(true));
      dispatch(setareaSyncClaimLinkLayerVisible(true));
    }
  };

  //handle Asset Group Eye
  const setAssetGroupEye = () => {
    if (
      areaAssetOpMineVisible ||
      areaAssetDepositsVisible ||
      areaAssetZoneVisible ||
      areaAssetHistoricalVisible ||
      areaAssetOccurrenceVisible
    ) {
      dispatch(setareaAssetOpMineVisible(false));
      dispatch(setareaAssetDepositsVisible(false));
      dispatch(setareaAssetZoneVisible(false));
      dispatch(setareaAssetHistoricalVisible(false));
      dispatch(setareaAssetOccurrenceVisible(false));
    } else {
      dispatch(setareaAssetOpMineVisible(true));
      dispatch(setareaAssetDepositsVisible(true));
      dispatch(setareaAssetZoneVisible(true));
      dispatch(setareaAssetHistoricalVisible(true));
      dispatch(setareaAssetOccurrenceVisible(true));
    }
  };

  const setClaimLabelVisibility = (state) => {
    dispatch(setamapClaimLableVisible(state));
  };
  const amapClaimLableVisible = useSelector(
    (state) => state.areaMapReducer.amapClaimLableVisible
  );

  const setsyncPropLableVisibility = (state) => {
    dispatch(setamapsyncPropLableVisible(state));
  };
  const amapsyncPropLableVisible = useSelector(
    (state) => state.areaMapReducer.amapsyncPropLableVisible
  );

  const setAreaLableVisibility = (state) => {
    dispatch(setamapAreaLableVisible(state));
  };
  const amapAreaLableVisible = useSelector(
    (state) => state.areaMapReducer.amapAreaLableVisible
  );

  const setAssetLableVisibility = (state) => {
    dispatch(setamapAssetLableVisible(state));
  };
  const amapAssetLableVisible = useSelector(
    (state) => state.areaMapReducer.amapAssetLableVisible
  );

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );

  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);
  const areaState = useSelector((state) => state.areaMapReducer.areaMiningArea);

  return (
    <div className="flex flex-col w-full h-full grow">
      <div className="ml-2 mr-2 flex items-center justify-center border-b-2 dark:text-white text-black">
        <span className="font-bold">Map Layers</span>
      </div>
      {/**
       *  className={`${
          selectedMap === "area" &&
          !isAreaSideNavOpen &&
          areaCountry != "" &&
          areaState != ""
            ? "flex justify-between"
            : "hidden"
        } `}
       */}
      <div
        // className="overflow-y-auto max-h-[53vh]"
        className={`${
          selectedMap === "area" &&
          !isAreaSideNavOpen &&
          areaCountry != "" &&
          areaState != ""
            ? "overflow-y-auto max-h-[50vh]"
            : "overflow-y-auto max-h-[53vh]"
        } `}
      >
        <Accordion>
          <div className="flex flex-col gap-1">
            <AccordionItemWithEyeWithLockVisibilityLabel
              title="Assets"
              onClick={setareaAssetLayerVisibility}
              eyeState={areaAssetLayerVisible}
              onLockClick={setareaAssetLayerAlwaysVisibility}
              lockState={areaAssetLayerAlwaysVisible}
              visibilityState={assetVisibilityState}
              labelState={amapAssetLableVisible}
              setLabelState={setAssetLableVisibility}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleVisibilityStateDiv
                  title="Operating Mines"
                  onClick={setareaAssetOpMineVisibility}
                  eyeState={areaAssetOpMineVisible}
                  visibilityState={assetVisibilityState}
                >
                  <Image
                    src="./asset-opmine.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
                <LayerVisibleVisibilityStateDiv
                  title="Deposits"
                  onClick={setareaAssetDepositVisibility}
                  eyeState={areaAssetDepositsVisible}
                  visibilityState={assetVisibilityState}
                >
                  <Image
                    src="./asset-deposit.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
                <LayerVisibleVisibilityStateDiv
                  title="Zone"
                  onClick={setareaAssetZoneVisibility}
                  eyeState={areaAssetZoneVisible}
                  visibilityState={assetVisibilityState}
                >
                  <Image
                    src="./asset-zone.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
                <LayerVisibleVisibilityStateDiv
                  title="Historical Mines"
                  onClick={setareaAssetHistoricalVisibility}
                  eyeState={areaAssetHistoricalVisible}
                  visibilityState={assetVisibilityState}
                >
                  <Image
                    src="./asset-historical.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
                <LayerVisibleVisibilityStateDiv
                  title="Occurrences"
                  onClick={setareaAssetOccurrenceVisibility}
                  eyeState={areaAssetOccurrenceVisible}
                  visibilityState={assetVisibilityState}
                >
                  <Image
                    src="./asset-occurrence.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
              </div>
            </AccordionItemWithEyeWithLockVisibilityLabel>
            <AccordionItemWithEye
              title="Properties"
              onClick={setPropertiesGroupEye}
              eyeState={property_claimLinkGroupVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleLockVisibilityLabelDiv
                  title="Property Points"
                  onClick={setareaSyncPropLayerVisibility}
                  eyeState={areaSyncPropLayerVisible}
                  onLockClick={setareaSyncPropLayerAlwaysVisibility}
                  lockState={areaSyncPropLayerAlwaysVisible}
                  visibilityState={propertyVisibilityState}
                  labelState={amapsyncPropLableVisible}
                  setLabelState={setsyncPropLableVisibility}
                >
                  <Image
                    src="./sync-prop.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleLockVisibilityLabelDiv>
                <LayerVisibleDiv
                  onClick={setareaSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={areaSyncClaimLinkLayerVisible}
                >
                  <Image
                    src="./sync-prop-outline.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye
              title="Base Layers"
              onClick={setareaClaimLayerVisibility}
              eyeState={areaClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleVisibilityStateLabelDiv
                  title="Claims"
                  onClick={setareaClaimLayerVisibility}
                  eyeState={areaClaimLayerVisible}
                  visibilityState={claimsVisibilityState}
                  labelState={amapClaimLableVisible}
                  setLabelState={setClaimLabelVisibility}
                >
                  <Image
                    src="./claims-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateLabelDiv>
                <LayerVisibleWithLabelDiv
                  title="Mining Areas"
                  onClick={setareaAreaBoundaryLayerVisibility}
                  eyeState={areaAreaBoundaryLayerVisible}
                  labelState={amapAreaLableVisible}
                  setLabelState={setAreaLableVisibility}
                >
                  <Image
                    src="./minning-areas-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleWithLabelDiv>
              </div>
            </AccordionItemWithEye>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
export default AreaBottomSideComp;

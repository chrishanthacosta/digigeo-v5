import { Accordion } from "@nextui-org/react";
import React from "react";
import AccordionItemWithEyeWithLockVisibilityLabelMapLink from "./components/accordion-item-with-eye-with-lock-visibility-label-map-link";
import LayerVisibleVisibilityStateDivMapLink from "./components/layer-visible-visibility-state-div-map-link";
import Image from "next/image";

const MapLinkController = () => {
  return (
    <Accordion>
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
            <Image src="./asset-opmine.svg" width={25} height={10} alt="prop" />
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
            <Image src="./asset-zone.svg" width={25} height={10} alt="prop" />
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
    </Accordion>
  );
};

export default MapLinkController;

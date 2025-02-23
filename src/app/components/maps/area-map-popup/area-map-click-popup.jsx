
import { useEffect,useState } from "react";
import AreaMapClickPopupHeaderRow from './area-map-click-popup-header-row';
import AreaMapClickPopupRow from './area-map-click-popup-row';
import AreaMapClickPopupRowMultiValue from './area-map-click-popup-row-multiValue';
import { useSelector } from 'react-redux';
import { Arimo } from "next/font/google";
import { Tabs, Tab } from "@nextui-org/react";
import LandingMapClickPopupRowMultiValue from "../landing-map-popup/landing-map-click-popup-row-multiValue";

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

const AreaMapClickPopup = ({ claimObj, fpropObj, assetObj, syncPropObj }) => {

  console.log("syncPropObj",syncPropObj,)

  console.log("fpropObj",fpropObj,)


  //clickObjects
  // const claimObj = useSelector(
  //   (state) => state.areaMapReducer.clickclaimObject
  // );
  // const fpropObj = useSelector(
  //   (state) => state.areaMapReducer.clickfPropertyObject
  // );
  // const assetObj = useSelector(
  //   (state) => state.areaMapReducer.clickassetObject
  // );
  // const syncPropObj = useSelector(
  //   (state) => state.areaMapReducer.clicksyncPropertyObject
  // );

  const [resourcesFormated, setresourcesFormated] = useState([]);

  // useEffect(() => {
  //   function numberWithCommas(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }

  //   const formatOunce = (amt) => {
  //     const dotLoc = amt.search(".00");
  //     if (dotLoc != -1) {
  //       let val = amt.substr(0, dotLoc + 3);
  //       val = numberWithCommas(val);
  //       return val;
  //     } else {
  //       return amt;
  //     }
  //   };
  //   const restext = fpropObj?.resources;
  //   if (restext) {
  //     const items = restext.split(" oz");

  //     const itemsTextFormated = items.map((i) => {
  //       const contents = i.split(" ");

  //       let result = "";
  //       switch (contents.length) {
  //         case 1:
  //           result = contents[0].length == 1 ? "" : contents[0];
  //           break;
  //         case 2:
  //           result = contents[0] + " " + formatOunce(contents[1]) + " oz.";
  //           break;
  //         case 3:
  //           result = contents[1] + " " + formatOunce(contents[2]) + " oz.";
  //           break;

  //         default:
  //           result = contents;
  //           break;
  //       }
  //       return result;
  //     });

  //     setresourcesFormated(itemsTextFormated);
  //     // console.log("pp1-itemsTextFormated", itemsTextFormated)
  //   }
  // }, [fpropObj]);

  return (
    // <div
    //   className={`flex-col max-h-unit-9xl overflow-auto m-2  ${arimo.className}`}
    // >
    <Tabs aria-label="Options" color="primary" variant="solid">
      {syncPropObj && Object.keys(syncPropObj).length > 0 && (
        <Tab key="Property" title="Property">
          <div>
            <AreaMapClickPopupHeaderRow label="Property Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <AreaMapClickPopupRow
                label={"Name:"}
                value={syncPropObj.prop_name}
              />
              <LandingMapClickPopupRowMultiValue
                label={"Owners:"}
                value={syncPropObj.owners}
              />
              <AreaMapClickPopupRow label={"Area:"} value={syncPropObj.area} />
              <AreaMapClickPopupRow
                label={"State/Prov:"}
                value={syncPropObj.state_prov}
              />
              <AreaMapClickPopupRow
                label={"Country:"}
                value={syncPropObj.country}
              />
            </div>
          </div>
        </Tab>
      )}
      {fpropObj && Object.keys(fpropObj).length > 0 && (
        <Tab key="fprop" title="Featured Property">
          <div>
            <AreaMapClickPopupHeaderRow label="Featured Property Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              {/* <AreaMapClickPopupRow
                label={"Sponsored owners:"}
                value={fpropObj.sponsoredowners}
                url={fpropObj.profile}
              /> */}
              <LandingMapClickPopupRowMultiValue
                label={"Sponsored owners:"}
                value={fpropObj.sponsoredowners}
                // url={fpropObj.profile}
              />
              <AreaMapClickPopupRow
                label={"Property Name:"}
                value={fpropObj.prop_name}
              />
              <AreaMapClickPopupRow
                label={"Commodity:"}
                value={fpropObj.commo_ref}
              />
              <AreaMapClickPopupRow
                label={"Asset List:"}
                value={fpropObj.assets}
              />
              <LandingMapClickPopupRowMultiValue
                label={"Resources:"}
                value={fpropObj.resources}
              />
              <AreaMapClickPopupRow
                label={"Map Area:"}
                value={fpropObj.map_area}
              />
              <AreaMapClickPopupRow
                label={"Map Event:"}
                value={fpropObj.sale_name}
              />
              <LandingMapClickPopupRowMultiValue
                label={"Ownership:"}
                value={fpropObj.owners}
              />
              <AreaMapClickPopupRow
                label={"External Property Page:"}
                value={fpropObj.prop_exturl ?? ""}
                url={fpropObj.prop_exturl}
              />
            </div>
          </div>
        </Tab>
      )}
      {assetObj && Object.keys(assetObj).length > 0 && (
        <Tab key="asset" title="Asset">
          <div>
            <AreaMapClickPopupHeaderRow label="Asset Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <AreaMapClickPopupRow
                label={"Asset Name:"}
                value={assetObj.asset_name}
              />
              <AreaMapClickPopupRow
                label={"Alias:"}
                value={assetObj.assetalias}
              />
              <AreaMapClickPopupRow
                label={"Type:"}
                value={assetObj.asset_type}
              />
              <AreaMapClickPopupRow
                label={"Commodities:"}
                value={assetObj.commodities}
              />
              <AreaMapClickPopupRow label={"Region:"} value={assetObj.region} />
            </div>
          </div>
        </Tab>
      )}
      {claimObj && Object.keys(claimObj).length > 0 && (
        <Tab key="claim" title="Claim">
          <div>
            <AreaMapClickPopupHeaderRow label="Claim Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <AreaMapClickPopupRow
                label={"Owner:"}
                value={claimObj.ownerref}
              />
              <AreaMapClickPopupRow
                label={"Claim no:"}
                value={claimObj.claimno}
              />
            </div>
          </div>
        </Tab>
      )}
    </Tabs>
    //  </div>
  );
};

export default AreaMapClickPopup
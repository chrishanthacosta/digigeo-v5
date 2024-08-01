import React, { useEffect, useState } from "react";
import CompanyCountryNode from "./company-country-treenode";
import GeoJSON from "ol/format/GeoJSON";
import { Spinner } from "@nextui-org/react";

const CompanyTreeView = ({
  syncPropFeatures,
  isOpen,
  setIsLoadingSyncAllProperties,
  isLoadingSyncAllProperties,
  featuredPropertiesLocal,
}) => {
  const [treeViewData, setTreeViewData] = useState();

  useEffect(() => {
    buildTreeViewData(syncPropFeatures);
  }, [syncPropFeatures]);

  const addNode = (
    nodes,
    country,
    stateprovName,
    propertyName,
    location,
    propertyid
  ) => {
    const countryNode = nodes.find((n) => n.label == country);
    if (countryNode) {
      addStateProvNode(
        countryNode,
        stateprovName,
        propertyName,
        location,
        propertyid
      );
    } else {
      const newcountryNode = {
        label: country,
        nodetype: "country",
        children: [],
      };
      addStateProvNode(
        newcountryNode,
        stateprovName,
        propertyName,
        location,
        propertyid
      );
      nodes.push(newcountryNode);
    }
  };

  const addStateProvNode = (
    countryNode,
    stateprovName,
    propertyName,
    location,
    propertyid
  ) => {
    const stateprovNode = countryNode.children.find(
      (n) => n.label == stateprovName
    );
    if (stateprovNode) {
      stateprovNode.children.push({
        label: propertyName,
        location,
        childrem: [],
        nodetype: "property",
        propertyid,
      });

      // return countryNode;
    } else {
      const newstateprovNode = {
        label: stateprovName,
        nodetype: "stateprov",

        children: [
          {
            label: propertyName,
            location,
            children: [],
            nodetype: "property",
            propertyid,
          },
        ],
      };
      countryNode.children.push(newstateprovNode);
    }
  };

  const buildTreeViewData = (syncPropFeatures) => {
    // console.log("syncPropFeatues", syncPropFeatures);
    if (syncPropFeatures?.features?.length > 0) {
      const features = new GeoJSON().readFeatures(syncPropFeatures);
      features.sort((a, b) => {
        return a.get("country")?.toUpperCase() > b.get("country")?.toUpperCase()
          ? 1
          : -1;
      });

      const nodes = [];
      features?.map((f) => {
        let loc = [];
        const polygon = f.getGeometry();
        if (polygon) {
          const extent = polygon.getExtent();
          loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        }

        addNode(
          nodes,
          f.get("country"),
          f.get("state_prov"),
          f.get("prop_name"),
          loc,
          f.get("propertyid")
        );
      });

      //sort according to property names

      for (const cont of nodes) {
        cont.children.sort((a, b) => {
          return a.label?.toUpperCase() > b.label?.toUpperCase() ? 1 : -1;
        });
      }

      for (const cont of nodes) {
        for (const stp of cont.children) {
          stp.children.sort((a, b) => {
            return a.label?.toUpperCase() > b.label?.toUpperCase() ? 1 : -1;
          });
        }
      }

      //move unnamed propos to end

      if (nodes[0]?.label == null) {
        const n = nodes.shift();
        n.label = "No ownership!";
        nodes.push(n);
      }

      //     const treeData = [ map_area
      //   {
      //     label: "Node 1",
      //     children: [
      //       {
      //         label: "Node 1.1",
      //         children: [
      //           {
      //             label: "Node 1.1.1",
      //             children: [
      //               {
      //                 label: "Node 1.1.1.1",
      //                 children: [],
      //               },
      //             ],
      //           },
      //           {
      //             label: "Node 1.1.2",
      //             children: [],
      //           },
      //         ],
      //       },
      //       {
      //         label: "Node 1.2",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     label: "Node 2",
      //     children: [
      //       {
      //         label: "Node 2.1",
      //         children: [],
      //       },
      //     ],
      //   },
      // ];
      setTreeViewData(nodes);
      setIsLoadingSyncAllProperties(false);
    } else {
      setTreeViewData([]);
    }
  };
  return (
    <div
      className={
        // isOpen && featuredPropertiesLocal.length > 0
        //   ? "overflow-y-auto max-h-[18vh] text-black  pb-2 grow"
        //   : "max-h-[45vh] text-black overflow-y-auto pb-2"
        isOpen
          ? featuredPropertiesLocal.length > 0
            ? "overflow-y-auto max-h-[18vh] text-black pb-2 grow"
            : "max-h-[50vh] text-black overflow-y-auto pb-2"
          : "max-h-[45vh] text-black overflow-y-auto pb-2"
      }
    >
      {isLoadingSyncAllProperties ? (
        <div className="text-center">
          <Spinner size="sm" />
        </div>
      ) : treeViewData?.length > 0 ? (
        treeViewData?.map((node) => (
          <CompanyCountryNode
            key={node.label}
            countryName={node.label}
            stateProvNodes={node.children}
            propertyid={node.propertyid}
          />
        ))
      ) : (
        <div className="text-center text-sm text-black">
          No properties found
        </div>
      )}
    </div>
  );
};

export default CompanyTreeView;

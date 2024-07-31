import React, { useEffect, useState } from "react";
import TreeView from "../../common-comp/treeview";
import { AreaCompanyNode } from "./area-company-treenode";
import AreaPropertyNode from "./area-peoperty-tree-node";
import GeoJSON from "ol/format/GeoJSON";
import { Spinner } from "@nextui-org/react";

const AreaTreeView = ({
  syncPropFeatues,
  treeViewHeight,
  isOpen,
  isLoadingSyncPropertyFeatures,
  setIsLoadingSyncPropertyFeatures,
}) => {
  const [treeViewData, setTreeViewData] = useState();

  useEffect(() => {
    // console.log("kkk",syncPropFeatues)
    buildTreeViewData(syncPropFeatues);
  }, [syncPropFeatues]);

  const addNode = (nodes, company, prop_name, location, propertyid) => {
    console.log("propertyidn", propertyid);
    const companyNode = nodes.find((n) => n.label == company);
    if (companyNode) {
      companyNode.children.push({
        label: prop_name,
        location,
        childrem: [],
        nodetype: "property",
        propertyid,
      });

      return companyNode;
    } else {
      const newcompanyNode = {
        label: company,
        nodetype: "company",
        //   id: getTreeViewNodeId(),
        children: [
          {
            label: prop_name,
            location,
            children: [],
            nodetype: "property",
            propertyid,
          },
        ],
      };
      nodes.push(newcompanyNode);
    }
  };
  const buildTreeViewData = (syncPropFeatues) => {
    console.log("syncPropFeatues", syncPropFeatues);
    if (syncPropFeatues?.features?.length > 0) {
      const features = new GeoJSON().readFeatures(syncPropFeatues);
      //sort features
      features.sort((a, b) => {
        return a.get("name")?.toUpperCase() > b.get("name")?.toUpperCase()
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
          f.get("name"),
          f.get("prop_name"),
          loc,
          f.get("propertyid")
        );
      });

      //sort according to property names

      for (const comp of nodes) {
        comp.children.sort((a, b) => {
          return a.label.toUpperCase() > b.label.toUpperCase() ? 1 : -1;
        });
      }

      //move unnamed propos to end

      if (nodes[0]?.label == null) {
        const n = nodes.shift();
        n.label = "No ownership!";
        nodes.push(n);
      }

      //     const treeData = [
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
      setIsLoadingSyncPropertyFeatures(false);
    } else {
      setTreeViewData([]);
    }
  };
  return (
    // <TreeView data={treeViewData} />

    <div
      className={
        isOpen
          ? `bg-white overflow-y-auto max-h-[${treeViewHeight}vh] text-black overflow-y-scroll h-[75vh] pb-5 `
          : `bg-white  max-h-[75vh] text-black overflow-y-scroll h-[75vh] pb-5`
        // + ` overflow-y-scroll h-[50vh] bg-red-400`
      }
    >
      {/* <div className="max-h-[150px]"> */}
      {isLoadingSyncPropertyFeatures ? (
        <div className="text-center">
          <Spinner size="sm" />
        </div>
      ) : treeViewData?.length > 0 ? (
        treeViewData?.map((node) => (
          <AreaCompanyNode
            key={node.label}
            comapanyName={node.label}
            propertyNodes={node.children}
            propertyid={node.propertyid}
          />
        ))
      ) : (
        <div className="text-center">No Companies found</div>
      )}
    </div>
  );
};

export default AreaTreeView;

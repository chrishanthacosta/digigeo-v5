import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from "ol/style";
import {
  svgDeposit,
  svgHisMine,
  svgOccurence,
  svgOpMine,
  svgZone,
} from "./assets-svg";

export const getText = function (feature, resolution) {
  // const type = dom.text.value;
  const maxResolution = 1000;
  let text = feature.get("asset_name");
  //console.log(text);
  if (text == undefined) {
    //console.log("asset_name is und");
    text = feature.get("howner_ref");
    //console.log("owner ref hot p", text);
  }
  if (resolution > maxResolution) {
    text = "";
  }
  // else if (type == "hide") {

  //   text = "";
  // } else if (type == "shorten") {
  //   text = text.trunc(12);
  // } else if (
  //   type == "wrap" &&
  //   (!dom.placement || dom.placement.value != "line")
  // ) {
  //   text = stringDivider(text, 16, "\n");
  // }

  return text;
};

export const createTextStyle = function (feature, resolution) {
  return new Text({
    font: "bold 14px serif",
    text: getText(feature, resolution),

    offsetX: 0,
    offsetY: +25,
  });
};

const assetTypesColorMappings = [
  { type: "Occurrence", color: "blue", src: "" },
  { type: "Zone", color: "red", src: "svgicons/zone_black.svg" },
  { type: "Refinery", color: "grey", src: "" },
  { type: "Mill", color: "cyan", src: "" },
  { type: "Deposit", color: "pink", src: "svgicons/deposit_black.svg" },
  { type: "Smelter", color: "orange", src: "" },
  { type: "Plant", color: "darkmagenta", src: "" },
  { type: "Tailings", color: "brown", src: "" },
  {
    type: "Operating Mine",
    color: "black",
    src: "svgicons/producing_black.svg",
  },
  {
    type: "Historical Mine",
    color: "green",
    src: "svgicons/past_producer_black.svg",
  },
];

export const areaMapAssetVectorLayerStyleFunction = (feature, resolution) => {
  const colour = feature.values_.colour;

  const fill = new Fill({
    color: colour,
    opacity: 1,
  });

  const stroke = new Stroke({
    color: "#3399CC",
    width: 1.25,
  });

  let svgScale = 0;
  let radius = 0;

  if (resolution > 1000) {
    svgScale = 0.5;
    radius = 2;
  } else if (resolution > 937.5) {
    svgScale = 0.562;
    radius = 5;
  } else if (resolution > 875) {
    svgScale = 0.625;
    radius = 5;
  } else if (resolution > 750) {
    svgScale = 0.75;
    radius = 5;
  } else if (resolution > 625) {
    svgScale = 0.875;
    radius = 5;
  } else if (resolution > 500) {
    svgScale = 1;
    radius = 5;
  } else if (resolution > 375) {
    svgScale = 1.125;
    radius = 5;
  } else if (resolution > 250) {
    svgScale = 1.25;
    radius = 5;
  } else if (resolution > 125) {
    svgScale = 1.375;
    radius = 5;
  } else {
    svgScale = 1.5;
    radius = 10;
  }
  let image;
  let text;

  if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
      scale: svgScale,
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
      scale: svgScale,
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
      scale: svgScale,
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
      scale: svgScale,
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOccurence),
      scale: svgScale,
    });
  }

  //set text Style

  text = createTextStyle(feature, resolution);

  const st = new Style({
    stroke: new Stroke({
      color: "#021691",
      width: 2,
    }),
    image,
    text: text,
    fill,
  });

  return st;
};

import { Fill, Stroke, Style, Text } from "ol/style";

export const styleFunctionClaim = (feature, resolution) => {
  const colour = "#D3D3D3";

  let fill = new Fill({
    color: colour,
    opacity: 1,
  });

  let textObj;

  const claimno = feature.get("claimno");
  
  textObj = new Text({
    font: "10px serif",
    text: claimno,

    offsetX: 2,
    offsetY: -13,
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

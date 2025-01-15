import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";

export const styleFunctionAreaBoundary = (feature, resolution) => {
  let txtObjAreaName;
  if (resolution < 3000) {
    txtObjAreaName = new Text({
      font: "20px serif",
      //   text: lmapAreaLableVisible ? feature.get("area_name") : "",
      text: feature.get("area_name"),
      fill: new Fill({ color: "red" }),

      offsetX: 0,
      offsetY: 0,

      overflow: true,
    });
  }

  const s = new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    text: txtObjAreaName,
  });

  return s;
};

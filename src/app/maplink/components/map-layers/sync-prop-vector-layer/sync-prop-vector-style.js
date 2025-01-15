import {
  Circle,
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from "ol/style";
export const commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction =
  (feature, resolution) => {
    const colour = "#e8b52a"; //feature.values_.colour;

    let fill = new Fill({
      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#8B4513",
      width: 1.25,
    });

    let image;
    let text;

    image = new Circle({
      radius: 9,
      fill: new Fill({ color: colour }),
      // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    });

    let textObj;
    const size = feature.get("features").length;
    if (size == 1 && resolution < 5000) {
      const propName = feature.get("features")[0].get("prop_name");
      textObj = new Text({
        //       // textAlign: align == "" ? undefined : align,
        //       // textBaseline: baseline,
        font: "bold 16px serif",
        text: propName,
        // fill: new Fill({ color: fillColor }),
        // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
        offsetX: 2,
        offsetY: -19,
        // placement: placement,
        // maxAngle: maxAngle,
        // overflow: overflow,
        // rotation: rotation,
      });
    } else {
      textObj = new Text({
        text: size.toString(),

        fill: new Fill({
          color: "#fff",
        }),
      });
    }
    //  if (resolution < 700) {
    //     propNameTextObj = new Text({
    //       // textAlign: align == "" ? undefined : align,
    //       // textBaseline: baseline,
    //       font: "bold 16px serif",
    //       text: propName,
    //       // fill: new Fill({ color: fillColor }),
    //       // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
    //       offsetX: 2,
    //       offsetY: -10,
    //       // placement: placement,
    //       // maxAngle: maxAngle,
    //       // overflow: overflow,
    //       // rotation: rotation,
    //     });
    //   }

    // if (resolution > 500) {
    //    image = null;
    // }
    // console.log("featuresqqqq",feature)

    //console.log("size",size)
    // let style = styleCache[size];
    // if (!style) {

    const style = new Style({
      //  stroke: new Stroke({
      //    color: "#021691",
      //    width: 2,
      //  }),
      image,
      //  text: propNameTextObj,
      text: textObj,
      fill,
    });
    // styleCache[size] = style;
    // }// console.log("st", st);
    return style;
  };

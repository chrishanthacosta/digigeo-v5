import { getBottomLeft, getWidth, getCenter } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
  Text,
} from "ol/style";

const colour = "#0000FF";

const fill = new Fill({
  color: colour,
  opacity: 0.3,
});

const stroke = new Stroke({
  color: "darkblue",
  width: 1.25,
});

export const fPropertyVectorRendererFunc = (pixelCoordinates, state) => {
  //  console.log("sssss", state);

  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);

  const svgtext2 = state.feature.get("hatch");

  const hatchimg = state.feature.get("hatchimg");

  if (!hatchimg || height < 1 || width < 1) {
    return;
  }

  context.save();
  const renderContext = toContext(context, {
    pixelRatio: 1,
  });

  renderContext.setFillStrokeStyle(fill, stroke);
  renderContext.drawGeometry(geometry);

  context.clip();

  // Fill transparent country with the hatchimg image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  const hf = width / (height * 8);
  context.drawImage(hatchimg, left, bottom, width * 20, height * hf * 20);

  context.restore();
};

export const fPropertyVectorRendererFunc_labels = (pixelCoordinates, state) => {
  //console.log("sssss", state.feature);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  // const flag = state.feature.get("flag");
  // if (!flag || height < 1 || width < 1) {
  //   return;
  // }
  // console.log("flag", flag);

  // Stitch out country shape from the blue canvas
  context.save();
  // const renderContext = toContext(context, {
  //   pixelRatio: 1,
  // });

  // renderContext.setFillStrokeStyle(fill, stroke);
  // renderContext.drawGeometry(geometry);

  //context.clip();

  // Fill transparent country with the flag image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  //context.drawImage(flag, left, bottom, width, height);

  let polcenter, widthText;
  if (state.resolution < 100) {
    // Draw the sponsor text with shadow
    // context.restore();
    // context.save();
    polcenter = getCenter(extent);
    context.font = "20px Georgia";
    widthText = context.measureText(state.feature.get("sponsors")).width ?? 10;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";
    //  console.log(" state.feature.get(", state.feature.get("sponsors"));
    context.fillText(
      state.feature.get("sponsors") ?? " ",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );
    // if (state.feature.get("prop_name")) {
    //   context.fillText(
    //     "(" + state.feature.get("prop_name") + ")",
    //     polcenter[0] - widthText / 2,
    //     polcenter[1] + 19
    //   );
    // }

    // context.restore();
  } else if (state.resolution < 400) {
    // Draw the sponsor text with shadow

    // context.restore();
    // context.save();
    polcenter = getCenter(extent);
    context.font = "10px Georgia";
    widthText = context.measureText(state.feature.get("sponsors")).width ?? 10;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";
    // console.log(" state.feature.get(", state.feature.get("sponsors"))
    context.fillText(
      state.feature.get("sponsors") ?? "a",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );

    // context.restore();
  }

  context.restore();
  // if (state.resolution < 400) {
  //   const context2 = state.context;
  //   context2.save();
  //   context2.fillText(
  //     state.feature.get("sponsors") ?? "",
  //     polcenter[0] - widthText / 2,
  //     polcenter[1]
  //   );

  //   context2.restore();
  // }
};

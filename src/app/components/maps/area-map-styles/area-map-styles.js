import { Style } from "ol/style";
import { Icon, Stroke, Fill, Circle, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";


const getText = function (feature, resolution) {
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

const createTextStyle = function (feature, resolution) {
  // const align = dom.align.value;
  // const baseline = dom.baseline.value;
  // const size = dom.size.value;
  // const height = dom.height.value;
  // const offsetX = parseInt(dom.offsetX.value, 10);
  // const offsetY = parseInt(dom.offsetY.value, 10);
  // const weight = dom.weight.value;
  // const placement = dom.placement ? dom.placement.value : undefined;
  // const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
  // const overflow = dom.overflow ? dom.overflow.value == "true" : undefined;
  // const rotation = parseFloat(dom.rotation.value);
  // if (dom.font.value == "'Open Sans'" && !openSansAdded) {
  //   const openSans = document.createElement("link");
  //   openSans.href = "https://fonts.googleapis.com/css?family=Open+Sans";
  //   openSans.rel = "stylesheet";
  //   document.head.appendChild(openSans);
  //   openSansAdded = true;
  // }
  const font = 500 + " " + 25 + "/" + 25 + " " + "Sans Serif";
  // const fillColor = dom.color.value;
  // const outlineColor = dom.outline.value;
  // const outlineWidth = parseInt(dom.outlineWidth.value, 10);

  return new Text({
    // textAlign: align == "" ? undefined : align,
    // textBaseline: baseline,
    font: font,
    text: getText(feature, resolution),
    // fill: new Fill({ color: fillColor }),
    // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
    offsetX: 0,
    offsetY: -20,
    // placement: placement,
    // maxAngle: maxAngle,
    // overflow: overflow,
    // rotation: rotation,
  });
};

export const areaMap_tbl_sync_claimlink_VectorLayerStyleFunctionHighLight = (
  feature,
  resolution
) => {
  //console.log("feature:", feature);
  //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim1.textContent = "visibility";
  // const r = Math.random() * 255;
  // const g = Math.random() * 255;
  // const b = Math.random() * 255;
  //console.log("fill", feature.values_.hatch);
  const colour = "#0000FF"; //feature.values_.colour;
  //console.log("colour", colour);
  // const fill = new Fill({
  //   color: `rgba(${r},${g},${b},1)`,
  //   opacity:1,
  // });
  // const fill = new Fill({
  //   // color: `rgba(${r},${g},${b},1)`,

  //   color:colour,
  //   opacity: 1,
  // });
  const fill = new Fill({
    // color: `rgba(${r},${g},${b},1)`,

    color: colour,
    opacity: 0.3,
  });

  const stroke = new Stroke({
    color: "darkblue",
    width: 1.25,
  });
  //console.log("res22", resolution);

  // let svgScale = 0;
  // let radius = 0;
  //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim.textContent = "visibility_off";
  // if (resolution > 1000) {
  //   svgScale = 0.5;
  //   radius = 2;
  // } else if (resolution > 937.5) {
  //   svgScale = 0.562;
  //   radius = 5;
  // } else if (resolution > 875) {
  //   svgScale = 0.625;
  //   radius = 5;
  // } else if (resolution > 750) {
  //   svgScale = 0.75;
  //   radius = 5;
  // } else if (resolution > 625) {
  //   svgScale = 0.875;
  //   radius = 5;
  // } else if (resolution > 500) {
  //   svgScale = 1;
  //   radius = 5;
  // } else if (resolution > 375) {
  //   svgScale = 1.125;
  //   radius = 5;
  // } else if (resolution > 250) {
  //   svgScale = 1.25;
  //   radius = 5;
  // } else if (resolution > 125) {
  //   svgScale = 1.375;
  //   radius = 5;
  //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //   // spanClaim.textContent = "visibility";
  // } else {
  //   svgScale = 1.5;
  //   radius = 10;
  // }
  let image;
  let text;

  // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[0].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[2].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[3].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[5].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[6].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[7].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
  //     scale: svgScale,
  //   });
  // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
  //     scale: svgScale,
  //   });
  // }
  // else {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: "pink" }),
  //     stroke: new Stroke({ color: "pink", width: 3 }),
  //   });
  // }

  //set text Style

  // text = createTextStyle(feature, resolution);
  image = new Circle({
    radius: 2,
    fill: new Fill({ color: colour }),
    stroke: new Stroke({ color: colour, width: 1 }),
  });
  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 5,
    }),
    image,
    // text,
    fill,
  });
  // console.log("st", st);
  return st;
};





export const areaMap_tbl_syncProperty_VectorLayerStyleFunctionHighLited = (
  feature,
  resolution
) => {
  console.log("featuree", feature);
  console.log("haiuhfi");
  //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim1.textContent = "visibility";
  // const r = Math.random() * 255;
  // const g = Math.random() * 255;
  // const b = Math.random() * 255;
  //console.log("fill", feature.values_.hatch);
  const colour = "#DAA520"; //feature.values_.colour;
  //console.log("colour", colour);
  // const fill = new Fill({
  //   color: `rgba(${r},${g},${b},1)`,
  //   opacity:1,
  // });
  // const fill = new Fill({
  //   // color: `rgba(${r},${g},${b},1)`,

  //   color:colour,
  //   opacity: 1,
  // });
  const fill = new Fill({
    // color: `rgba(${r},${g},${b},1)`,

    color: colour,
    opacity: 1,
  });

  const stroke = new Stroke({
    color: "#8B4513",
    width: 1.25,
  });
  //console.log("res22", resolution);

  // let svgScale = 0;
  // let radius = 0;
  //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim.textContent = "visibility_off";
  // if (resolution > 1000) {
  //   svgScale = 0.5;
  //   radius = 2;
  // } else if (resolution > 937.5) {
  //   svgScale = 0.562;
  //   radius = 5;
  // } else if (resolution > 875) {
  //   svgScale = 0.625;
  //   radius = 5;
  // } else if (resolution > 750) {
  //   svgScale = 0.75;
  //   radius = 5;
  // } else if (resolution > 625) {
  //   svgScale = 0.875;
  //   radius = 5;
  // } else if (resolution > 500) {
  //   svgScale = 1;
  //   radius = 5;
  // } else if (resolution > 375) {
  //   svgScale = 1.125;
  //   radius = 5;
  // } else if (resolution > 250) {
  //   svgScale = 1.25;
  //   radius = 5;
  // } else if (resolution > 125) {
  //   svgScale = 1.375;
  //   radius = 5;
  //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //   // spanClaim.textContent = "visibility";
  // } else {
  //   svgScale = 1.5;
  //   radius = 10;
  // }
  let image;
  let text;

  // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[0].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[2].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[3].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
  //     scale: svgScale,
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[5].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[6].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[7].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
  //     scale: svgScale,
  //   });
  // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
  //   image = new Icon({
  //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
  //     scale: svgScale,
  //   });
  // }
  // else {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: "pink" }),
  //     stroke: new Stroke({ color: "pink", width: 3 }),
  //   });
  // }

  //set text Style

  // text = createTextStyle(feature, resolution);
  image = new Circle({
    radius: 8,
    fill: new Fill({ color: colour }),
    stroke: new Stroke({ color: "red", width: 2 }),
  });

  let propName;

  if (resolution < 700) {
    propName = new Text({
      font: "bold 15px sans-serif",
      // textAlign: align == "" ? undefined : align,
      // textBaseline: baseline,
      //font: font,
      textAlign: "left",
      text: feature.get("prop_name"),
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 9,
      offsetY: 0,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
    });
  }
  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    image,
    text: propName,
    fill,
  });

  console.log(propName, "propName");
  // console.log("st", st);
  return st;
};

const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});
const stroke_SelectedProp = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 9,
});

export const areaMApPropertyVectorRendererFuncV2Highlight = (
  pixelCoordinates,
  state
) => {
  // console.log("sssss", state);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  const flag = state.feature.get("flag");
  if (!flag || height < 1 || width < 1) {
    return;
  }

  // Stitch out country shape from the blue canvas
  context.save();
  const renderContext = toContext(context, {
    pixelRatio: 1,
  });

  renderContext.setFillStrokeStyle(fill, stroke_SelectedProp);
  renderContext.drawGeometry(geometry);

  context.clip();

  // Fill transparent country with the flag image
  const bottomLeft = getBottomLeft(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  //context.drawImage(flag, left, bottom, width*30, height*30);
  const hf = width / (height * 8);
  // context.globalAlpha = 0.4;
  context.drawImage(flag, left, bottom, width * 20, height * hf * 20);
  if (state.resolution < 100) {
    const polcenter = getCenter(extent);
    context.font = "20px Georgia";
    const widthText =
      context.measureText(state.feature.get("sponsors")).width ?? 0;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";

    context.fillText(
      state.feature.get("sponsors") ?? "",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );
  } else if (state.resolution < 400) {
    const polcenter = getCenter(extent);
    context.font = "10px Georgia";
    const widthText =
      context.measureText(state.feature.get("sponsors")).width ?? 0;

    //halo
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowColor = "black";
    context.fillStyle = "white";
    context.fillText(
      state.feature.get("sponsors") ?? "",
      polcenter[0] - widthText / 2,
      polcenter[1]
    );
  }

  context.restore();
};


  const svgZone = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.8px" height="19.8x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<circle class="st0" cx="9.9" cy="10" r="9.9"/>
	<circle class="st1" cx="9.8" cy="10.9" r="3.5"/>
	<polygon class="st1" points="13.7,8.6 17.3,15.6 10.2,15.6 	"/>
	<polygon class="st1" points="9.8,0.9 13.4,7.8 6.2,7.8 	"/>
	<polygon class="st1" points="2.3,15.6 5.9,8.6 9.5,15.6 	"/>
</g>
</svg>
`;

const svgDeposit = `<?xml version="1.0" encoding="utf-8"?>
 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="20px" height="20x">
<style type="text/css">
	.st0{fill:#231F20;}
	.st1{fill:#FFFFFF;}
</style>
<path class="st0" d="M17.3,20H2.7C1.2,20,0,18.8,0,17.3V2.7C0,1.2,1.2,0,2.7,0h14.5C18.8,0,20,1.2,20,2.7v14.5
	C20,18.8,18.8,20,17.3,20z"/>
<path d="M17.8,16.7"/>
<path d="M2.5,1.4"/>
<g>
	<g>
		<path class="st1" d="M17.7,10.2c0,1.9-0.7,3.6-1.9,4.9c0.2,0.2,0.4,0.6,0.8,1c1.5-1.5,2.4-3.6,2.4-5.9c0-2.4-1-4.6-2.7-6.2
			c-0.4,0.2-0.8,0.4-1.2,0.6C16.6,6,17.7,8,17.7,10.2z"/>
		<path class="st1" d="M13.9,16.6c-1,0.5-2.2,0.9-3.4,0.9c-3.1,0-5.8-2-6.8-4.7c-0.3,0.3-0.6,0.7-0.9,1c0,0,0,0,0,0
			c1.3,2.9,4.3,4.9,7.7,4.9c1.5,0,2.9-0.4,4.2-1.1C14.3,17.1,14,16.8,13.9,16.6z"/>
		<path class="st1" d="M3.2,10.6c0-0.1,0-0.3,0-0.4c0-4,3.2-7.2,7.2-7.2c1.1,0,2.1,0.2,3,0.6c0.5-0.2,1-0.4,1.6-0.6
			c-1.3-0.8-2.9-1.3-4.5-1.3C5.8,1.7,2,5.5,2,10.2c0,0.6,0.1,1.1,0.2,1.6C2.5,11.5,2.8,11,3.2,10.6z"/>
	</g>
	<path class="st1" d="M11,9.3c-0.5,0.3-0.9,0.7-1.4,1c5.4,7.2,3,4,6.3,8.4H18C13.7,12.9,16.7,17,11,9.3z"/>
	<path class="st1" d="M0.9,14.1c0.6,0,1.1,0,1.5-0.6c1.2-1.4,2.5-2.6,4-3.7c0.5-0.4,1-0.6,1.6-0.1c0,0,0.1,0,0.2,0.1
		C7.8,9.1,7.4,8.5,6.9,8C5.4,8.7,1.7,12.5,0.9,14.1z"/>
	<path class="st1" d="M9,6C8.3,6.5,7.7,7,7,7.5c0.7,0.9,1.4,1.8,2.1,2.7c0.7-0.5,1.3-1,2-1.5C10.4,7.8,9.7,6.9,9,6z"/>
	<path class="st1" d="M18.2,2.7C15,3,12.3,4.4,9.6,6.2c0.3,0.4,0.6,0.8,0.8,1.1C12.9,5.4,15.4,3.9,18.2,2.7z"/>
	<path class="st1" d="M8.4,5.9C8.3,5.8,8.2,5.6,8.1,5.5c-0.5,0.3-0.9,0.7-1.4,1C6.9,6.6,7,6.8,7.1,6.9C7.6,6.6,8,6.3,8.4,5.9z"/>
</g>
</svg>
  `;

const svgOpMine = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.9px" height="19.9x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<path class="st0" d="M2.7,0l14.5,0c1.5,0,2.7,1.2,2.7,2.7v14.5c0,1.5-1.2,2.7-2.7,2.7H2.7c-1.5,0-2.7-1.2-2.7-2.7L0,2.7   C0,1.2,1.2,0,2.7,0z"></path>
	<path class="st1" d="M9.3,11.8c-0.3-0.3-0.6-0.6-0.8-0.8c2.3-2.2,4.4-4.7,7.2-6.4c-1.4,0.4-2.6,1-3.7,1.9c-0.5-0.5-1-1-1.5-1.5   c0.4-0.3,0.7-0.7,1.1-1c0.8-0.7,1.6-1.2,2.6-1.7c1.2-0.5,2.5-0.6,3.8-0.5c0.2,0,0.3,0,0.6,0.1c0,0.6,0.1,1.3,0.1,1.9   c0,1.6-0.7,3-1.7,4.3c-0.5,0.6-1,1.2-1.5,1.7c-0.7-0.7-1.4-1.4-2-2L9.3,11.8z"></path>
	<g>
		<path class="st1" d="M8.9,9.8C8.1,9,7.4,8.3,6.6,7.5C6.9,7.2,7.2,7,7.5,6.7C8.2,7.5,9,8.3,9.8,9L8.9,9.8z"></path>
		<path class="st1" d="M6.9,5.5c0.2,0.2,0.4,0.4,0.5,0.6C6.9,6.6,6.5,7,6,7.5C5.8,7.4,5.6,7.2,5.4,7c-1.6,1.6-3.1,3.1-4.6,4.6    c0,0,0,0,0,0c0-0.2,0.1-0.3,0.1-0.5c0.4-1.2,1.1-2.4,1.8-3.4c0.4-0.6,0.9-1.2,1.4-1.9C4,5.8,3.9,5.7,3.8,5.6    C4.4,5,4.9,4.4,5.5,3.9C5.6,4,5.7,4.1,5.8,4.2c1.7-1.5,3.5-2.8,5.8-3.3C10,2.4,8.5,3.9,6.9,5.5z"></path>
	</g>
	<path class="st1" d="M1.7,14.8c1.1-1.4,2.5-2,4.1-2.3c0.1,0,0.2,0,0.3,0c0.4,0,0.7-0.2,0.9-0.5c0.2-0.2,0.4-0.4,0.6-0.6   c0.3,0.3,0.7,0.7,1,1c-0.3,0.3-0.6,0.6-0.9,0.9c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.6-0.2,1.2-0.4,1.9c-0.2,0.9-0.7,1.7-1.4,2.4   c-0.2,0.2-0.4,0.4-0.6,0.6C4.1,17.3,2.9,16,1.7,14.8z M5.9,16.6c0.6-1,0.8-2,0.9-3.1c0-0.1-0.1-0.1-0.1-0.1   c-0.4,0.1-0.8,0.1-1.2,0.2c-0.7,0.1-1.3,0.4-1.8,0.7C4.4,15,5.1,15.8,5.9,16.6z"></path>
	<path class="st1" d="M18.4,17.7c-0.2,0.2-0.5,0.5-0.8,0.8c-2-2-5.2-5.2-7.2-7.2c0.2-0.2,0.5-0.5,0.8-0.8   C13.2,12.5,16.4,15.7,18.4,17.7z"></path>
	<path d="M1.7,1.7"></path>
	<path d="M18.5,18.5"></path>
</g>
</svg>
  `;

const svgHisMine = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.9px" height="19.8x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<path class="st0" d="M17.2,19.9H2.8c-1.5,0-2.7-1.2-2.7-2.7V2.8c0-1.5,1.2-2.7,2.7-2.7h14.5c1.5,0,2.7,1.2,2.7,2.7v14.5   C19.9,18.7,18.7,19.9,17.2,19.9z"></path>
	<path class="st1" d="M10.7,8.2C11,8.5,11.2,8.7,11.5,9c-2.3,2.2-4.4,4.7-7.2,6.4c1.4-0.4,2.6-1,3.7-1.9c0.5,0.5,1,1,1.5,1.5   c-0.4,0.3-0.7,0.6-1.1,1c-0.8,0.7-1.6,1.2-2.6,1.7c-1.2,0.5-2.5,0.6-3.8,0.5c-0.2,0-0.3,0-0.6-0.1c0-0.6-0.1-1.3-0.1-1.9   c0-1.6,0.7-3,1.7-4.3c0.5-0.6,1-1.1,1.5-1.7c0.7,0.7,1.4,1.4,2,2L10.7,8.2z"></path>
	<g>
		<path class="st1" d="M11,10.1c0.8,0.8,1.5,1.5,2.3,2.2c-0.3,0.3-0.5,0.5-0.8,0.8c-0.8-0.8-1.5-1.5-2.3-2.3L11,10.1z"></path>
		<path class="st1" d="M13,14.4c-0.2-0.2-0.4-0.4-0.5-0.6c0.5-0.5,0.9-0.9,1.4-1.4c0.2,0.1,0.4,0.3,0.6,0.5c1.5-1.5,3.1-3.1,4.6-4.6    c0,0,0,0,0,0c0,0.2-0.1,0.3-0.1,0.5c-0.4,1.2-1.1,2.4-1.8,3.4c-0.4,0.6-0.9,1.2-1.4,1.9c0.1,0.1,0.2,0.2,0.3,0.3    c-0.6,0.6-1.1,1.1-1.7,1.7c-0.1-0.1-0.2-0.2-0.3-0.3c-1.7,1.5-3.5,2.8-5.8,3.3C9.9,17.5,11.5,16,13,14.4z"></path>
	</g>
	<path class="st1" d="M18.2,5.1c-1,1.3-2.5,2-4.1,2.2c-0.1,0-0.2,0-0.3,0c-0.4,0-0.7,0.2-0.9,0.5c-0.2,0.2-0.4,0.4-0.6,0.6   c-0.3-0.3-0.7-0.7-1-1c0.3-0.3,0.6-0.6,0.9-0.9c0.1-0.1,0.1-0.2,0.1-0.3c0.1-0.6,0.2-1.2,0.4-1.9c0.2-0.9,0.7-1.7,1.4-2.4   c0.2-0.2,0.4-0.4,0.6-0.6C15.8,2.7,17,3.9,18.2,5.1z M14,3.4c-0.6,1-0.8,2-0.9,3.1c0,0.1,0.1,0.1,0.1,0.1c0.4-0.1,0.8-0.1,1.2-0.2   c0.7-0.1,1.3-0.4,1.8-0.7C15.6,4.9,14.8,4.1,14,3.4z"></path>
	<path class="st1" d="M1.5,2.2C1.8,2,2,1.7,2.3,1.4c2,2,5.2,5.2,7.2,7.2C9.3,8.9,9,9.2,8.8,9.4C6.8,7.4,3.5,4.2,1.5,2.2z"></path>
	<path d="M18.2,18.2"></path>
	<path d="M1.5,1.4"></path>
</g>
</svg>
  `;

const svgOccurence = `<?xml version="1.0" encoding="utf-8"?>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 4990 4990"
    preserveAspectRatio="xMidYMid meet">
    <g id="layer101" fill="#21201e" stroke="none">
        <path d="M0 2495 l0 -2495 2495 0 2495 0 0 2495 0 2495 -2495 0 -2495 0 0 -2495z" />
    </g>
    <g id="layer102" fill="#fefefe" stroke="none">
        <path
            d="M1 3813 c1 -707 5 -1142 10 -1088 76 821 550 1546 1276 1953 282 158 627 267 931 293 65 6 122 12 127 14 6 2 -520 4 -1167 4 l-1178 1 1 -1177z" />
        <path
            d="M2730 4979 c1123 -107 2039 -959 2225 -2069 9 -52 20 -133 24 -180 5 -49 9 413 10 1088 l1 1172 -1172 -1 c-675 -1 -1137 -5 -1088 -10z" />
        <path
            d="M1484 3656 c-57 -18 -102 -54 -132 -106 l-27 -45 -3 -984 c-3 -1106 -6 -1057 68 -1131 74 -74 25 -71 1131 -68 l984 3 46 27 c54 32 94 86 109 148 8 32 10 337 8 1026 l-3 981 -30 49 c-19 30 -49 60 -79 79 l-49 30 -991 2 c-786 1 -999 -1 -1032 -11z" />
        <path
            d="M4977 2303 c-19 -471 -217 -972 -546 -1380 -94 -118 -296 -315 -406 -400 -389 -295 -828 -468 -1300 -512 -54 -5 381 -9 1088 -10 l1177 -1 0 1220 c0 671 -2 1220 -4 1220 -2 0 -6 -62 -9 -137z" />
        <path
            d="M2 1178 l-2 -1178 1223 2 c699 0 1162 4 1082 9 -468 25 -949 210 -1345 517 -117 91 -306 277 -401 395 -232 288 -391 602 -483 958 -24 94 -62 327 -69 424 -2 28 -4 -480 -5 -1127z" />
    </g>

</svg>`;

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
export const areaMapAssetVectorLayerStyleFunctionHighlited = (
  feature,
  resolution
) => {
  //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim1.textContent = "visibility";
  // const r = Math.random() * 255;
  // const g = Math.random() * 255;
  // const b = Math.random() * 255;

  const colour = feature.values_.colour;
  //console.log("colour", colour);
  // const fill = new Fill({
  //   color: `rgba(${r},${g},${b},1)`,
  //   opacity:1,
  // });
  const fill = new Fill({
    // color: `rgba(${r},${g},${b},1)`,
    color: colour,
    opacity: 1,
  });

  const stroke = new Stroke({
    color: "#3399CC",
    width: 1.25,
  });
  //console.log("res22", resolution);

  let svgScale = 0;
  let radius = 0;
  //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
  //  spanClaim.textContent = "visibility_off";
  if (resolution > 1000) {
    svgScale = 0.8;
    radius = 2;
  } else if (resolution > 937.5) {
    svgScale = 0.862;
    radius = 5;
  } else if (resolution > 875) {
    svgScale = 0.925;
    radius = 5;
  } else if (resolution > 750) {
    svgScale = 1.05;
    radius = 5;
  } else if (resolution > 625) {
    svgScale = 1.175;
    radius = 5;
  } else if (resolution > 500) {
    svgScale = 1.3;
    radius = 5;
  } else if (resolution > 375) {
    svgScale = 1.425;
    radius = 5;
  } else if (resolution > 250) {
    svgScale = 1.55;
    radius = 5;
  } else if (resolution > 125) {
    svgScale = 1.675;
    radius = 5;
    // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
    // spanClaim.textContent = "visibility";
  } else {
    svgScale = 1.8;
    radius = 10;
  }
  let image;
  let text;

  // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[0].color,
  //       width: 3,
  //     }),
  //   });
  // }
  if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
      scale: svgScale,
      color: "red",
    });
  }
  // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[2].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[3].color,
  //       width: 3,
  //     }),
  //   });
  // }
  else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
      scale: svgScale,
      color: "red",
    });
  }
  // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[5].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[6].color,
  //       width: 3,
  //     }),
  //   });
  // }
  // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
  //     stroke: new Stroke({
  //       color: assetTypesColorMappings[7].color,
  //       width: 3,
  //     }),
  //   });
  // }
  else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
      scale: svgScale,
      color: "red",
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
      scale: svgScale,
      color: "red",
    });
  } else if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
    image = new Icon({
      src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOccurence),
      scale: svgScale,
      color: "red",
    });
  }
  // else {
  //   image = new Circle({
  //     radius: 10,
  //     fill: new Fill({ color: "pink" }),
  //     stroke: new Stroke({ color: "pink", width: 3 }),
  //   });
  // }

  //set text Style

  text = createTextStyle(feature, resolution);

  const st = new Style({
    stroke: new Stroke({
      color: "red",
      width: 9,
    }),
    image,
    text,
    fill,
  });

  return st;
};

export const areaMApPropertyVectorRendererFuncV2_labels = (
  pixelCoordinates,
  state
) => {
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

export  const styleFunctionClaimHighlight = (feature, resolution) => {
    // console.log("sf claims")
    const colour = "#FFF8DC"; //feature.values_.colour;
    //console.log("colour", colour);
    // const fill = new Fill({
    //   color: `rgba(${r},${g},${b},1)`,
    //   opacity:1,
    // });
    // const fill = new Fill({
    //   // color: `rgba(${r},${g},${b},1)`,

    //   color:colour,
    //   opacity: 1,
    // });
    let fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      opacity: 1,
    });

    // const stroke = new Stroke({
    //   color: "#8B4513",
    //   width: 1.25,
    // });

    // let image;
    // let text;

    // image = new Circle({
    //   radius: 9,
    //   fill: new Fill({ color: colour }),
    //   // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    // });

    let textObj;

    const claimno = feature.get("claimno");
    textObj = new Text({
      //       // textAlign: align == "" ? undefined : align,
      //       // textBaseline: baseline,
      font: "10px serif",
      text: claimno,
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 2,
      offsetY: -13,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
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

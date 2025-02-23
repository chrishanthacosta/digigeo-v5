import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZoomMode } from "../types";

const initialState = {
  isAreaSideNavOpen: false,
  areaCountry: "",
  areaMiningArea: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  areaZoomMode: ZoomMode.ExTENT,
  areaFpropLayerVisible: true,
  areaAssetLayerVisible: true,
  areaSyncPropLayerVisible: true,
  areaSyncClaimLinkLayerVisible: true,
  areaClaimLayerVisible: true,
  areaAreaBoundaryLayerVisible: true,
  areaAssetOpMineVisible: true,
  areaAssetDepositsVisible: true,
  areaAssetZoneVisible: true,
  areaAssetHistoricalVisible: true,
  areaAssetOccurrenceVisible: true,
  areaFlyToLocation: [],
  clickclaimObject: undefined,
  clickfPropertyObject: undefined,
  clickassetObject: undefined,
  clicksyncPropertyObject: undefined,
  navigatedFPropId: 0,
  popupFcompanyId: 0,
  areaSyncPropLayerAlwaysVisible: false,
  areaAssetLayerAlwaysVisible: false,
  areaCurrentScale: 5,
  areaSelectedAreaId: 0,
  areaMapViewScales: {},
  amapsyncPropLableVisible: true,
  amapFpropLableVisible: false,
  amapAssetLableVisible: true,
  amapClaimLableVisible: true,
  amapAreaLableVisible: true,
  amapNavigationExtent: [],
  amapNavigationHighlightFProps: [],
  isFeaturedPropertyLoaded: false,
  navigatePropertyId: 0,
};

const areaMapSlice = createSlice({
  name: "xAreaMap",
  initialState,
  reducers: {
    setamapNavigationExtent: (state, action) => {
      state.amapNavigationExtent = action.payload;
    },
    setamapNavigationHighlightFProps: (state, action) => {
      state.amapNavigationHighlightFProps = action.payload;
    },
    setIsAreaSideNavOpen: (state, action) => {
      state.isAreaSideNavOpen = action.payload;
    },
    setAreaCountry: (state, action) => {
      state.areaCountry = action.payload;
    },
    setAreaMiningArea: (state, action) => {
      state.areaMiningArea = action.payload;
    },
    setSyncPropertyFeatures: (state, action) => {
      state.syncPropertyFeatures = action.payload;
    },
    setFPropertyFeatures: (state, action) => {
      state.featuredPropertyFeatures = action.payload;
    },
    setsyncClaimLinkPropertyFeatures: (state, action) => {
      state.syncClaimLinkPropertyFeatures = action.payload;
    },
    setAssetFeatures: (state, action) => {
      state.assetFeatures = action.payload;
    },
    setAreaZoomMode: (state, action) => {
      state.areaZoomMode = action.payload;
    },
    //layer visibility
    setareaFpropLayerVisible: (state, action) => {
      state.areaFpropLayerVisible = action.payload;
    },
    setareaAssetLayerVisible: (state, action) => {
      state.areaAssetLayerVisible = action.payload;
    },
    setareaSyncPropLayerVisible: (state, action) => {
      state.areaSyncPropLayerVisible = action.payload;
    },
    setareaSyncClaimLinkLayerVisible: (state, action) => {
      state.areaSyncClaimLinkLayerVisible = action.payload;
    },
    setareaClaimLayerVisible: (state, action) => {
      state.areaClaimLayerVisible = action.payload;
    },
    setareaAreaBoundaryLayerVisible: (state, action) => {
      state.areaAreaBoundaryLayerVisible = action.payload;
    },
    //asset types
    setareaAssetOpMineVisible: (state, action) => {
      state.areaAssetOpMineVisible = action.payload;
    },
    setareaAssetDepositsVisible: (state, action) => {
      state.areaAssetDepositsVisible = action.payload;
    },
    setareaAssetZoneVisible: (state, action) => {
      state.areaAssetZoneVisible = action.payload;
    },
    setareaAssetHistoricalVisible: (state, action) => {
      state.areaAssetHistoricalVisible = action.payload;
    },
    setareaAssetOccurrenceVisible: (state, action) => {
      state.areaAssetOccurrenceVisible = action.payload;
    },
    setareaFlyToLocation: (state, action) => {
      state.areaFlyToLocation = action.payload;
    },
    //single click objects
    setclickclaimObject: (state, action) => {
      state.clickclaimObject = action.payload;
    },
    setclickfPropertyObject: (state, action) => {
      state.clickfPropertyObject = action.payload;
    },
    setclickassetObject: (state, action) => {
      state.clickassetObject = action.payload;
    },
    setclicksyncPropertyObject: (state, action) => {
      state.clicksyncPropertyObject = action.payload;
    },
    setnavigatedFPropId: (state, action) => {
      state.navigatedFPropId = action.payload;
    },
    setpopupFcompanyId: (state, action) => {
      state.popupFcompanyId = action.payload;
    },
    setareaSyncPropLayerAlwaysVisible: (state, action) => {
      state.areaSyncPropLayerAlwaysVisible = action.payload;
    },
    setareaAssetLayerAlwaysVisible: (state, action) => {
      state.areaAssetLayerAlwaysVisible = action.payload;
    },
    setareaCurrentScale: (state, action) => {
      state.areaCurrentScale = action.payload;
    },
    setareaSelectedAreaId: (state, action) => {
      state.areaSelectedAreaId = action.payload;
    },
    setareaMapViewScales: (state, action) => {
      state.areaMapViewScales = action.payload;
    },
    setamapsyncPropLableVisible: (state, action) => {
      state.amapsyncPropLableVisible = action.payload;
    },
    setamapFpropLableVisible: (state, action) => {
      state.amapFpropLableVisible = action.payload;
    },
    setamapAssetLableVisible: (state, action) => {
      state.amapAssetLableVisible = action.payload;
    },
    setamapClaimLableVisible: (state, action) => {
      state.amapClaimLableVisible = action.payload;
    },
    setamapAreaLableVisible: (state, action) => {
      state.amapAreaLableVisible = action.payload;
    },
    setisFeaturedPropertyLoaded: (state, action) => {
      state.isFeaturedPropertyLoaded = action.payload;
    },
    setnavigatePropertyId: (state, action) => {
      state.navigatePropertyId = action.payload;
    },
  },
});

export const {
  setamapNavigationHighlightFProps,
  setamapNavigationExtent,
  setAreaCountry,
  setAreaMiningArea,
  setIsAreaSideNavOpen,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setAreaZoomMode,
  setareaFpropLayerVisible,
  setareaAssetLayerVisible,
  setareaSyncPropLayerVisible,
  setareaSyncClaimLinkLayerVisible,
  setareaClaimLayerVisible,
  setareaAssetOpMineVisible,
  setareaAssetDepositsVisible,
  setareaAssetZoneVisible,
  setareaAssetHistoricalVisible,
  setareaAssetOccurrenceVisible,
  setareaAreaBoundaryLayerVisible,
  setareaFlyToLocation,
  setclickclaimObject,
  setclickfPropertyObject,
  setclickassetObject,
  setclicksyncPropertyObject,
  setnavigatedFPropId,
  setpopupFcompanyId,
  setareaSyncPropLayerAlwaysVisible,
  setareaAssetLayerAlwaysVisible,
  setareaCurrentScale,
  setareaSelectedAreaId,
  setareaMapViewScales,
  setamapsyncPropLableVisible,
  setamapFpropLableVisible,
  setamapAssetLableVisible,
  setamapClaimLableVisible,
  setamapAreaLableVisible,
  setisFeaturedPropertyLoaded,
  setnavigatePropertyId,
} = areaMapSlice.actions;

export default areaMapSlice.reducer;

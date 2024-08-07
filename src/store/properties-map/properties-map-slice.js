import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isPropertiesSideNavOpen: false,
  propertySearchQuery: "",
  propertyMapPropertyAssetIdCsv: { propertyids: [], assetids: [] },
  propertyMapAssetCsv: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  propertyMapZoomMode: "custom",
  propertyMapFpropLayerVisible: true,
  propertyMapAssetLayerVisible: true,
  propertyMapSyncPropLayerVisible: true,
  propertyMapSyncClaimLinkLayerVisible: true,
  propertyMapClaimLayerVisible: true,
  propertyMapAreaBoundaryLayerVisible: true,
  propertyMapAssetOpMineVisible: true,
  propertyMapAssetDepositsVisible: true,
  propertyMapAssetZoneVisible: true,
  propertyMapAssetHistoricalVisible: true,
  propertyMapAssetOccurrenceVisible: true,
  propertyMapFlyToLocation: [],
  clickclaimObject: undefined,
  clickfPropertyObject: undefined,
  clickassetObject: undefined,
  clicksyncPropertyObject: undefined,
  searchParamPropertyName: "",
  searchParamCountry: "",
  searchParamStateProv: "",
  searchParamMiningArea: "",
  searchParamAssetTypeList: [],
  searchParamCommodityList: [],
  navigatedFPropId: 0,
  popupFcompanyId: 0,
  propertySyncPropLayerAlwaysVisible: false,
  propertyAssetLayerAlwaysVisible: false,
  propertyCurrentScale: 5,
  propertyMapViewScales: {},
  pmapsyncPropLableVisible: true,
  pmapFpropLableVisible: false,
  pmapAssetLableVisible: true,
  pmapClaimLableVisible: true,
  pmapAreaLableVisible: true,
  pmapSelectedPropertyIds: [],
  pmapNavigationExtent: [],
  pmapNavigationHighlightFProps: [],
  navigateProPropertyId: 0,
};

const propertiesMapSlice = createSlice({
  name: "PropertiesaMap",
  initialState,
  reducers: {
    setpmapNavigationExtent: (state, action) => {
      state.pmapNavigationExtent = action.payload;
    },
    setpmapNavigationHighlightFProps: (state, action) => {
      state.pmapNavigationHighlightFProps = action.payload;
    },
    setpmapSelectedPropertyIds: (state, action) => {
      state.pmapSelectedPropertyIds = action.payload;
    },
    setIsPropertiesSideNavOpen: (state, action) => {
      state.isPropertiesSideNavOpen = action.payload;
    },
    setpropertySearchQuery: (state, action) => {
      state.propertySearchQuery = action.payload;
    },
    // setpropertyMapPropertyAssetIdCsv: (state, action) => {
    //   state.propertyMapPropertyAssetIdCsv = action.payload;
    // },
    // setpropertyMapAssetCsv: (state, action) => {
    //   state.propertyMapAssetCsv = action.payload;
    // },
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
    setpropertyMapZoomMode: (state, action) => {
      state.propertyMapZoomMode = action.payload;
    },
    //layer visibility
    setpropertyMapFpropLayerVisible: (state, action) => {
      state.propertyMapFpropLayerVisible = action.payload;
    },
    setpropertyMapAssetLayerVisible: (state, action) => {
      state.propertyMapAssetLayerVisible = action.payload;
    },
    setpropertyMapSyncPropLayerVisible: (state, action) => {
      state.propertyMapSyncPropLayerVisible = action.payload;
    },
    setpropertyMapSyncClaimLinkLayerVisible: (state, action) => {
      state.propertyMapSyncClaimLinkLayerVisible = action.payload;
    },
    setpropertyMapClaimLayerVisible: (state, action) => {
      state.propertyMapClaimLayerVisible = action.payload;
    },
    setpropertyMapAreaBoundaryLayerVisible: (state, action) => {
      state.propertyMapAreaBoundaryLayerVisible = action.payload;
    },
    //asset types
    setpropertyMapAssetOpMineVisible: (state, action) => {
      state.propertyMapAssetOpMineVisible = action.payload;
    },
    setpropertyMapAssetDepositsVisible: (state, action) => {
      state.propertyMapAssetDepositsVisible = action.payload;
    },
    setpropertyMapAssetZoneVisible: (state, action) => {
      state.propertyMapAssetZoneVisible = action.payload;
    },
    setpropertyMapAssetHistoricalVisible: (state, action) => {
      state.propertyMapAssetHistoricalVisible = action.payload;
    },
    setpropertyMapAssetOccurrenceVisible: (state, action) => {
      state.propertyMapAssetOccurrenceVisible = action.payload;
    },
    setpropertyMapFlyToLocation: (state, action) => {
      state.propertyMapFlyToLocation = action.payload;
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

    setsearchParamPropertyName: (state, action) => {
      state.searchParamPropertyName = action.payload;
    },
    setsearchParamCountry: (state, action) => {
      state.searchParamCountry = action.payload;
    },
    setsearchParamStateProv: (state, action) => {
      state.searchParamStateProv = action.payload;
    },
    setsearchParamMiningArea: (state, action) => {
      state.searchParamMiningArea = action.payload;
    },
    setsearchParamAssetTypeList: (state, action) => {
      state.searchParamAssetTypeList = action.payload;
    },
    setsearchParamCommodityList: (state, action) => {
      state.searchParamCommodityList = action.payload;
    },
    setnavigatedFPropId: (state, action) => {
      state.navigatedFPropId = action.payload;
    },
    setpopupFcompanyId: (state, action) => {
      state.popupFcompanyId = action.payload;
    },
    setpropertySyncPropLayerAlwaysVisible: (state, action) => {
      state.propertySyncPropLayerAlwaysVisible = action.payload;
    },
    setpropertyAssetLayerAlwaysVisible: (state, action) => {
      state.propertyAssetLayerAlwaysVisible = action.payload;
    },
    setpropertyCurrentScale: (state, action) => {
      state.propertyCurrentScale = action.payload;
    },

    setpropertyMapViewScales: (state, action) => {
      state.propertyMapViewScales = action.payload;
    },
    setpmapsyncPropLableVisible: (state, action) => {
      state.pmapsyncPropLableVisible = action.payload;
    },
    setpmapFpropLableVisible: (state, action) => {
      state.pmapFpropLableVisible = action.payload;
    },
    setpmapAssetLableVisible: (state, action) => {
      state.pmapAssetLableVisible = action.payload;
    },
    setpmapClaimLableVisible: (state, action) => {
      state.pmapClaimLableVisible = action.payload;
    },
    setpmapAreaLableVisible: (state, action) => {
      state.pmapAreaLableVisible = action.payload;
    },
    setNavigateProPropertyId: (state, action) => {
      state.navigateProPropertyId = action.payload;
    },
  },
});

export const {
  setpmapNavigationHighlightFProps,
  setpmapNavigationExtent,
  setIsPropertiesSideNavOpen,
  setpropertySearchQuery,
  setpropertyMapPropertyAssetIdCsv,
  setpropertyMapAssetCsv,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setpropertyMapZoomMode,
  setpropertyMapFpropLayerVisible,
  setpropertyMapAssetLayerVisible,
  setpropertyMapSyncPropLayerVisible,
  setpropertyMapSyncClaimLinkLayerVisible,
  setpropertyMapClaimLayerVisible,
  setpropertyMapAssetOpMineVisible,
  setpropertyMapAssetDepositsVisible,
  setpropertyMapAssetZoneVisible,
  setpropertyMapAssetHistoricalVisible,
  setpropertyMapAssetOccurrenceVisible,
  setpropertyMapAreaBoundaryLayerVisible,
  setpropertyMapFlyToLocation,
  setclickclaimObject,
  setclickfPropertyObject,
  setclickassetObject,
  setclicksyncPropertyObject,
  setsearchParamPropertyName,
  setsearchParamStateProv,
  setsearchParamCountry,
  setsearchParamMiningArea,
  setsearchParamAssetTypeList,
  setsearchParamCommodityList,
  setnavigatedFPropId,
  setpopupFcompanyId,
  setpropertySyncPropLayerAlwaysVisible,
  setpropertyAssetLayerAlwaysVisible,
  setpropertyCurrentScale,
  setpropertyMapViewScales,
  setpmapsyncPropLableVisible,
  setpmapFpropLableVisible,
  setpmapAssetLableVisible,
  setpmapClaimLableVisible,
  setpmapAreaLableVisible,
  setpmapSelectedPropertyIds,
  setNavigateProPropertyId,
} = propertiesMapSlice.actions;

export default propertiesMapSlice.reducer;

"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";


import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {
  setIsCompanySideNavOpen,
  setcompanyId,
  setcompanyName,
  setcompanyStockcode,
  setcompanyZoomMode,
} from "@/store/company-map/company-map-slice";
import useDebounce from "./useDebounce";
import { updateWindowsHistoryCmap } from "@/app/utils/helpers/window-history-replace";
import { useMediaQuery } from "react-responsive";
import { setIsSideNavOpen } from "@/store/map-selector/map-selector-slice";
import { ToastContainer, toast } from "react-toastify";
const CompanyFilter = ({ isOpenIn, closePopup }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [searchStockcode, setSearchStockcode] = useState("");
  const debouncedSearchStockcode = useDebounce(searchStockcode, 300);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  // const [company, setCompany] = useState("");
  const [company, setCompany] = useState("");
  const [stockcode, setStockcode] = useState("");
  const [companyidLocal, setCompanyidLocal] = useState(0);
  const [companyList, setCompanyList] = useState([]);
  const [StockcodeList, setStockcodeList] = useState([]);
  const [historicalCompany, sethistoricalCompany] = useState(false);
  // const [areaList, setAreaList] = useState([]);
  // const [miningArea, setMiningArea] = useState("");
  // const [miningArea, setMiningArea] = useState("Timmins");

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const companyLyrs = useSelector(
    (state) => state.mapSelectorReducer.companyLyrs
  );
  const companyZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.companyZoomLevel
  );
  const companyInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.companyInitialCenter
  );
  const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  const companyName = useSelector(
    (state) => state.companyMapReducer.companyName
  );
  const companyId = useSelector((state) => state.companyMapReducer.companyId);
  const companyStockcode = useSelector(
    (state) => state.companyMapReducer.companyStockcode
  );

  useEffect(() => {
    setCompany(companyName);
  }, [companyName]);

  useEffect(() => {
    setStockcode(companyStockcode);
  }, [companyStockcode]);

  useEffect(() => {
    // console.log("companyIdqq",companyId)
    setCompanyidLocal(companyId);
  }, [companyId]);

  const [customStyles, setcustomStyles] = useState({
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  });

  // const areaCompany = "Test";
  // const areaState = "Test";

  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  // const areaCompany = useSelector((state) => state.areaMapReducer.areaCompany);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 480px)" });

  useEffect(() => {
    if (isTabletOrMobile) {
      setcustomStyles({
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 50,
        },
        content: {
          top: "0",
          left: "0",
          right: "0",
          bottom: "auto",
          // marginRight: "-50%",
          // transform: "translate(-50%, -50%)",
          backgroundColor: "transparent",
          border: "none",
          width: "70%"
        },
      });
    }
  }, [isTabletOrMobile]);

  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);
  useEffect(() => {
    // dispatch(setcompanyId(companyidLocal));
    const c = companyList.find((c) => c.companyid == companyidLocal);
    if (c) {
      // dispatch(setcompanyName(c.name));
      setStockcode(c.stockcode);
      setCompany(c.name);
    }

    // if(companyId==0){
    //    console.log("set stockcode to 0 an d other-",companyId )
    //   setStockcode("")
    // }
    // else{
    //    setStockcode("")
    // }
  }, [companyidLocal]);

  // useEffect(() => {
  //   setCompany(areaCompany);
  //   setMiningArea(areaName);
  // }, [areaName, areaCompany]);
  //areal load
  // useEffect(() => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/areas/${company}`,
  //       { cache: "force-cache" }
  //     );
  //     const d = await res.json();
  //     console.log("areas", d.data);
  //     setAreaList(d.data);
  //   };

  //   f().catch(console.error);
  // }, [company]);

  const searchAction = async () => {
    // if (company && miningArea) {
    console.log("companyidLocal", companyidLocal,)
      if(companyidLocal){
    dispatch(setcompanyId(companyidLocal));
    dispatch(setcompanyName(company));
    dispatch(setcompanyZoomMode("extent"));
    // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    updateWindowsHistoryCmap({
      isSideNavOpen,
      lyrs: companyLyrs,
      zoomLevel: companyZoomLevel,
      initialCenter: companyInitialCenter,
      companyId,
    });

    //window.history.replaceState({}, "", newUrl);
    if (isTabletOrMobile) {
      dispatch(setIsCompanySideNavOpen(false));
      dispatch(setIsSideNavOpen(false));
    } else {
      dispatch(setIsCompanySideNavOpen(true));

    }
    dispatch(setcompanyStockcode(stockcode));
    closePopup();
    // }
  }else{
    toast.error("Company Not Found")
  }
  };

  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/companylist/${search}`,
        {
          cache: "force-cache",
        }
      );
      const d = await res.json();
      setCompanyList(d.data);
      setStockcodeList(d.data);
    };
    if (debouncedSearch) {
      f().catch(console.error);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/stockcodelist/${searchStockcode}`,
        {
          cache: "no-store",
        }
      );
      const d = await res.json();
      setStockcodeList(d.data);
      setCompanyList(d.data);
    };
    if (debouncedSearchStockcode) {
      f().catch(console.error);
    }
  }, [debouncedSearchStockcode]);

  const resetHandler = () => {
    setStockcode("");
    setCompany("");
    setCompanyidLocal(0);
    dispatch(setcompanyId(0));
    dispatch(setcompanyName(""));
    dispatch(setcompanyStockcode(""));
  };

  const customClassNames = {
    base: " text-white", // Class for the overall container

    // inputWrapper: 'dark:text-white text-black', // Class for the input field wrapper
    // ... other elements you want to customize
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Company Filters
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6 text-black"
            />
          </div>
          <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8">
                <div className="w-full px-3 flex flex-col gap-3">
                  <div className="flex-col gap-2">
                    <span className="block">Filter By Company Name</span>
                    <Autocomplete
                      allowsEmptyCollection={true}
                      allowsCustomValue={true}
                      label="Company Name"
                      className="max-w-xs"
                      selectedKey={companyidLocal}
                      onInputChange={(e) => {
                        setSearch(e);
                        setCompany(e);
                      }}
                      onSelectionChange={(e) => {
                        setCompanyidLocal(e);
                        const c = companyList.find((c) => c.companyid == e);
                        if (c) {
                          sethistoricalCompany(c.historical);
                        } else {
                          sethistoricalCompany(false);
                        }
                      }}
                      defaultSelectedKey={company}
                      inputValue={company}
                      classNames={customClassNames}
                      inputProps={{ className: "dark:text-white text-black" }}
                    >
                      {companyList.map((companyObj) => (
                        <AutocompleteItem
                          key={companyObj.companyid}
                          value={companyObj.name}
                          className="dark:text-white text-black"
                        >
                          {companyObj.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <span className="block">Filter By Stock Code</span>
                    <Autocomplete
                      allowsEmptyCollection={true}
                      allowsCustomValue={true}
                      label="Stock Code"
                      className="max-w-xs"
                      selectedKey={companyidLocal}
                      onInputChange={(e) => {
                        setSearchStockcode(e);
                        setStockcode(e);
                      }}
                      onSelectionChange={(e) => {
                        setCompanyidLocal(e);
                      }}
                      // defaultSelectedKey={stockcode}
                      inputValue={stockcode}
                      classNames={customClassNames}
                      inputProps={{ className: "dark:text-white text-black" }}
                    >
                      {StockcodeList.map((companyObj) => (
                        <AutocompleteItem
                          key={companyObj.companyid}
                          value={companyObj.stockcode}
                          className="dark:text-white text-black"
                        >
                          {companyObj.stockcode}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 sm:fixed sm:bottom-8 border-t-2 border-gray-300 text-black">
                <div className="mt-2">
                  <Chip
                    color="default"
                    variant="light"
                    className="cursor-pointer"
                    onClick={resetHandler}
                  >
                    Reset
                  </Chip>
                </div>
                <div className="mt-2">
                  <Chip
                    color="primary"
                    className="cursor-pointer hover:bg-blue-600 custom-button-1 right-0 bg-blue-700"
                    onClick={searchAction}
                    isDisabled={!company}
                  >
                    Search
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default CompanyFilter;

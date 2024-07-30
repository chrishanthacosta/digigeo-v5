"use client";
import { useEffect } from "react";
import { LandingPage } from "./components/landing-page/landing-page";
import { setJwtToken } from "@/store/token/token-slice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.tokenReducer.jwtToken);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/auth/generateToken"
        );
        const data = await response.json();
        console.log("data", data.token);
        localStorage.setItem("token", data.token);
        dispatch(setJwtToken(data.token));
      } catch (error) {
        console.error(error);
      }
    };
    fetchToken();
  }, [dispatch]);

  // const Test = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/auth/secret", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       method: "POST",
  //     });

  //     console.log("response", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     Test();
  //   }, 2000);
  // }, []);

  console.log("sss", jwtToken);

  return <LandingPage />;
}

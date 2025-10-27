"use client";

import React, { useEffect } from "react";

import { TranslationProvider } from "@/components/UseTranslation";

import Footer from "@/components/Footer";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { fetchAllData } from "@/redux/Thunk";
import Headeruser from "@/components/Headeruser.jsx";
import About from "@/components/Aboutuser";
import Skillsusers from "@/components/Skillsusers.jsx";
import Comment from "../components/Connectuser.jsx";
function InitDataLoader() {
  const dispatch = useDispatch();

  const alreadyFetched = sessionStorage.getItem("dataFetched");

  if (!alreadyFetched) {
    console.log("✅ fetching all data for the first time...");
    dispatch(fetchAllData());
    sessionStorage.setItem("dataFetched", "true");
  } else {
    console.log("🟡 data already fetched, skipping...");
  }

  return null;
}
export default function page() {
  return (
    <div className="dark:bg-gray-800 ">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitDataLoader />
          <TranslationProvider>
            <Headeruser />
            <About />
            <Skillsusers />
            <Comment />
            <Footer />
          </TranslationProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

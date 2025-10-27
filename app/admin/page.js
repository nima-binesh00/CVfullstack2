"use client";
import React, { useEffect } from "react";
import About from "@/components/About";
import Header from "@/components/Header";
import { TranslationProvider } from "@/components/UseTranslation";
import Skills from "@/components/Skills";
import Comment from "../../components/Connect";
import Footer from "@/components/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { fetchAllData } from "@/redux/Thunk";

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
            <Header />
            <About />
            <Skills />
            <Comment />
            <Footer />
          </TranslationProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

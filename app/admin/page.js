"use client";
import React, { useEffect, useState } from "react";
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
import bcrypt from "bcryptjs";
import Hashed from "@/components/Hashed";
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
export default function Page() {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHash() {
      const result = await Hashed();

      setHashedPassword(result);
    }
    fetchHash();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hashedPassword) {
      setError("در حال بارگذاری...");
      return;
    }

    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("رمز اشتباه است");
      setIsAuthorized(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="رمز را وارد کنید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            ورود
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    );
  }

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

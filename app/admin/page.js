"use client";
import React, { useEffect, useState } from "react";
import About from "@/components/About";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import Comment from "@/components/Connect";
import Footer from "@/components/Footer";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { loginAction } from "@/components/Token";
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
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    if (t) setIsAuthorized(true);
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginAction(password);
      console.log(result);

      if (!result?.ok) {
        setError(result?.message || "رمز اشتباه است");
        return;
      }

      localStorage.setItem("auth_token", result.token);
      setIsAuthorized(true);
    } catch (err) {
      console.error(err);
      setError("خطا در ورود");
    }
  };

  if (loading) return <div>در حال بررسی...</div>;

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز را وارد کنید"
            className="p-2 border rounded"
          />
          <button className="p-2 bg-blue-500 text-white rounded">ورود</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitDataLoader />
          <Header />
          <About setIsAuthorized={setIsAuthorized} />
          <Skills />
          <Comment />
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}

import { createAsyncThunk } from "@reduxjs/toolkit";

// فرض می‌کنیم endpoint تو این مسیره
export const saveHeader = createAsyncThunk(
  "CV/saveHeader",
  async (headerData) => {
    const { header, about, SkillsIcon, Connect } = headerData;
    const res = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ header, about, SkillsIcon, Connect }),
    });
    const data = await res.json();
    // console.dir(data[0]);
    // alert(data.data);
    if (!data.success) throw new Error(data.message);
    alert("Done successfully ✔");
    return data.data;
  }
);

// 🔹 AsyncThunk برای گرفتن کل دیتا از API
export const fetchAllData = createAsyncThunk(
  "data/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/data");
      if (!res.ok) throw new Error("Failed to fetch data");
      const resd = await res.json();
      // console.dir(resd);

      return resd[0];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllData, saveHeader } from "./Thunk"; // مسیر فایل thunk

const initialState = {
  Data: {
    header: { en: [], fn: [] },
    about: { image: "", en: [], fn: [] },
    SkillsIcon: {
      en: [],
      fn: [],
    },
    Connect: {
      en: [],
      fn: [],
      Link: { fn: [], en: [] },
    },
  },

  loading: false,
  error: null,
};

const state = createSlice({
  name: "CV",
  initialState,
  reducers: {
    Cheange: (state, action) => {
      const { text, index, language } = action.payload;
      if (language === "en") {
        state.Data.header.en[index] = text;
      } else {
        state.Data.header.fn[index] = text;
      }
    },
    Changebody: (state, action) => {
      const { text, index, language } = action.payload;

      if (language === "en") {
        state.Data.about.en[index] = text;
      } else {
        state.Data.about.fn[index] = text;
      }
    },
    Changestylename: (state, action) => {
      const { text, index, language } = action.payload;

      if (language === "en") {
        state.Data.SkillsIcon.en[index].name = text;
      } else {
        state.Data.SkillsIcon.fn[index].name = text;
      }
    },
    Changestyledescription: (state, action) => {
      const { text, index, language } = action.payload;

      if (language === "en") {
        state.Data.SkillsIcon.en[index].description = text;
      } else {
        state.Data.SkillsIcon.fn[index].description = text;
      }
    },
    DeleteSkill: (state, action) => {
      const { index, language } = action.payload;

      if (language === "en") {
        state.Data.SkillsIcon.en.splice(index, 1);
      } else {
        state.Data.SkillsIcon.fn.splice(index, 1);
      }
    },
    CheangeConnect: (state, action) => {
      const { text, index, language } = action.payload;
      if (language === "en") {
        state.Data.Connect.en[index] = text;
      } else {
        state.Data.Connect.fn[index] = text;
      }
    },
    ChangeConnectdescription: (state, action) => {
      const { text, index, language } = action.payload;

      if (language === "en") {
        state.Data.Connect.Link.en[index].link = text;
      } else {
        state.Data.Connect.Link.fn[index].link = text;
      }
    },
    ChangeConnectname: (state, action) => {
      const { text, index, language } = action.payload;

      if (language === "en") {
        state.Data.Connect.Link.en[index].name = text;
      } else {
        state.Data.Connect.Link.fn[index].name = text;
      }
    },
    newskill: (state, action) => {
      const { text, language } = action.payload;

      if (language === "en") {
        state.Data.SkillsIcon.en.push(text);
      } else {
        state.Data.SkillsIcon.fn.push(text);
      }
    },
    newLink: (state, action) => {
      const { text, language } = action.payload;

      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }

      if (language === "en") {
        state.Data.Connect.Link.en.push({ ...text, id });
      } else {
        state.Data.Connect.Link.fn.push({ ...text.id });
      }
    },
    DeleteLink: (state, action) => {
      const { index, language } = action.payload;

      if (language === "en") {
        state.Data.Connect.Link.en.splice(index, 1);
      } else {
        state.Data.Connect.Link.fn.splice(index, 1);
      }
    },
    Changeimage: (state, action) => {
      const { text } = action.payload;

      state.Data.about.image = text;
    },
    DeleteSkillicon: (state, action) => {
      const { index, language, icon } = action.payload;

      if (language === "en") {
        state.Data.SkillsIcon.en[index].icon = icon;
      } else {
        state.Data.SkillsIcon.fn[index].icon = icon;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveHeader.fulfilled, (state, action) => {
        state.loading = false;

        state.Data = action.payload; // جایگزینی کل header با داده جدید
      })
      .addCase(saveHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        console.log("all/data");

        state.Data = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  Cheange,
  Changebody,
  Changestyledescription,
  Changestylename,
  DeleteSkill,
  CheangeConnect,
  ChangeConnectdescription,
  ChangeConnectname,
  newskill,
  newLink,
  DeleteLink,
  Changeimage,
  DeleteSkillicon,
} = state.actions;
export default state.reducer;

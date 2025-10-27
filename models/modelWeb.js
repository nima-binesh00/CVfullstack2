// models/YourModel.js
import mongoose from "mongoose";

const yourSchema = new mongoose.Schema({
  header: {
    en: { type: [String], default: [] },
    fn: { type: [String], default: [] },
  },
  about: {
    en: { type: [String], default: [] },
    fn: { type: [String], default: [] },
  },
  SkillsIcon: {
    en: [
      {
        name: String,
        icon: String,
        description: String,
      },
    ],
    fn: [
      {
        name: String,
        icon: String,
        description: String,
      },
    ],
  },
  Connect: {
    fn: { type: [String], default: [] },
    en: { type: [String], default: [] },
    Link: {
      en: [
        {
          id: String,
          name: String,
          icon: String,
          description: String,
          link: String,
        },
      ],
      fn: [
        {
          id: String,
          name: String,
          icon: String,
          description: String,
          link: String,
        },
      ],
    },
  },
});

export default mongoose.models.CvWeb || mongoose.model("CvWeb", yourSchema);

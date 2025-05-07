import dotenv from "dotenv";
dotenv.config();

export default {
  gemini: {
    API_KEY: process.env.GEMINI_API_KEY,
    MODEL: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    apiVersion: "v1",
  },
};
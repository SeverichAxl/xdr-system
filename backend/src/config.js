import dotenv from "dotenv";
dotenv.config();

export default {
  gemini: {
    API_KEY: process.env.GEMINI_API_KEY,
    MODEL: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    apiVersion: "v1",
  },
  kafka: {
    BROKERS: process.env.KAFKA_BROKERS || "localhost:9092",
  },
  opensearch: {
    URL: process.env.OPENSEARCH_URL || "http://localhost:9200",
  },
  thehive: {
    URL: process.env.THEHIVE_URL || "http://localhost:9000",
    API_KEY: process.env.THEHIVE_API_KEY || "",
  },
  cortex: {
    URL: process.env.CORTEX_URL || "http://localhost:9001",
    API_KEY: process.env.CORTEX_API_KEY || "",
  },
  misp: {
    URL: process.env.MISP_URL || "http://localhost:80",
    API_KEY: process.env.MISP_API_KEY || "",
  },
};
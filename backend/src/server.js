import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.routes.js";
import healthRouter from "./api/health/index.js";
import pool from "./db.js";
import userRoutes from "./routes/user.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import eventRoutes from "./routes/event.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
import consultaRoutes from "./routes/consulta.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/users", userRoutes);

// Rutas
app.get("/", (req, res) => {
  res.send("✅ Bienvenido a la API de XDR System 🚀");
});

app.use("/api", indexRoutes);
// debajo de app.use('/', indexRoutes);
app.use("/api/alerts", alertRoutes);
// después de app.use('/api/alerts', alertRoutes);
app.use("/api/events", eventRoutes);
// Después de otras rutas:
app.use("/api/sensors", sensorRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/health", healthRouter);
app.use("/api/chatbot", chatbotRoutes);
// Ruta de prueba para verificar conexión a PostgreSQL
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error("❌ Error de conexión a la base de datos:", err);
    res.status(500).json({ error: "Error de conexión a la base de datos" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

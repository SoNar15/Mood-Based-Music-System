import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/api", photoRoutes);

app.use("/api/songs", songRoutes);
// app.use("/api", pageRoutes);
app.use("/api", pageRoutes);

app.use("/esp", espRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/emotion", emotionRoutes);

app.use("/songs", express.static(path.join(__dirname, "songs")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "starter.html"));
});

import photoRoutes from "./routes/photoRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import espRoutes from "./routes/espRoutes.js";
import emotionRoutes from "./routes/emotionRoutes.js";

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

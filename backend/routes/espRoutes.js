import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import http from "http";
import { pipeline } from "stream";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentIP = null;

// Make sure upload directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, "latest.jpg"),
});
const upload = multer({ storage });

// Set ESP IP
router.post("/set-ip", (req, res) => {
  const { ip } = req.body;
  if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
    return res.status(400).send("Invalid IP format");
  }
  currentIP = ip;
  console.log("IP Set to:", ip);
  res.send("IP updated");
});

// Stream route
router.get("/esp-stream", (req, res) => {
  if (!currentIP) return res.status(400).send("IP not set");

  const options = {
    hostname: currentIP,
    port: 81,
    path: "/stream",
    method: "GET",
  };

  const proxy = http.request(options, (streamRes) => {
    res.writeHead(streamRes.statusCode, streamRes.headers);
    pipeline(streamRes, res, (err) => {
      if (err) console.error("Pipeline error:", err.message);
    });
  });

  proxy.on("error", (err) => {
    console.error("Stream error:", err.message);
    res.status(500).send("Stream error");
  });

  proxy.end();
});

// Capture image from ESP
router.get("/capture-photo", (req, res) => {
  if (!currentIP) return res.status(400).send("IP not set");

  const options = {
    hostname: currentIP,
    port: 80,
    path: "/capture",
    method: "GET",
  };

  const proxy = http.request(options, (espRes) => {
    res.writeHead(espRes.statusCode, espRes.headers);
    pipeline(espRes, res, (err) => {
      if (err) console.error("Pipeline error (capture):", err.message);
    });
  });

  proxy.on("error", (err) => {
    console.error("Capture error:", err.message);
    res.status(500).send("Capture error");
  });

  proxy.end();
});

// Upload image
router.post("/upload-photo", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  console.log("Image saved to:", req.file.path);
  res.send("Photo captured and saved!");
});

export default router;

// import express from "express";
// import bodyParser from "body-parser";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import http from "http";
// import { pipeline } from "stream";
// import { fileURLToPath } from "url";

// // Required for __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// let currentIP = null;

// // ✅ Create uploads directory in project root (not inside routes)
// const uploadDir = path.join(__dirname, "..", "..", "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `photo-${Date.now()}.jpg`),
// });
// const upload = multer({ storage });

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "..", "..", "public"))); // Serve frontend if needed

// // ✅ Set ESP32 IP
// app.post("/set-ip", (req, res) => {
//   const { ip } = req.body;
//   if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
//     return res.status(400).send("Invalid IP format");
//   }
//   currentIP = ip;
//   console.log("IP Set to:", ip);
//   res.send("IP updated");
// });

// // ✅ Stream proxy route
// app.get("/esp-stream", (req, res) => {
//   if (!currentIP) return res.status(400).send("IP not set");

//   const options = {
//     hostname: currentIP,
//     port: 81,
//     path: "/stream",
//     method: "GET",
//   };

//   const proxy = http.request(options, (streamRes) => {
//     res.writeHead(streamRes.statusCode, streamRes.headers);
//     pipeline(streamRes, res, (err) => {
//       if (err) console.error("Pipeline error:", err.message);
//     });
//   });

//   proxy.on("error", (err) => {
//     console.error("Stream error:", err.message);
//     res.status(500).send("Stream error");
//   });

//   proxy.end();
// });

// // ✅ Fetch a single image from ESP32's /capture endpoint
// app.get("/capture-photo", (req, res) => {
//   if (!currentIP) return res.status(400).send("IP not set");

//   const options = {
//     hostname: currentIP,
//     port: 80,
//     path: "/capture",
//     method: "GET",
//   };

//   const proxy = http.request(options, (espRes) => {
//     res.writeHead(espRes.statusCode, espRes.headers);
//     pipeline(espRes, res, (err) => {
//       if (err) console.error("Pipeline error (capture):", err.message);
//     });
//   });

//   proxy.on("error", (err) => {
//     console.error("Capture error:", err.message);
//     res.status(500).send("Capture error");
//   });

//   proxy.end();
// });

// // ✅ Upload endpoint to store photo
// app.post("/upload-photo", upload.single("photo"), (req, res) => {
//   if (!req.file) return res.status(400).send("No file uploaded");

//   console.log("Image saved to:", req.file.path);
//   res.send("Photo captured and saved!");
// });

// app.listen(PORT, () => {
//   console.log(`ESP32 Route Test Server running at http://localhost:${PORT}`);
// });

// -------------------------------------------------------

// const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const http = require("http");
// const { pipeline } = require("stream");

// const app = express();
// const PORT = 3000;

// let currentIP = null;

// // Create uploads directory if not exist
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `photo-${Date.now()}.jpg`),
// });
// const upload = multer({ storage });

// app.use(bodyParser.json());
// // app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "public")));

// // Set ESP IP
// app.post("/set-ip", (req, res) => {
//   const { ip } = req.body;
//   if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
//     return res.status(400).send("Invalid IP format");
//   }
//   currentIP = ip;
//   console.log("IP Set to:", ip);
//   res.send("IP updated");
// });

// // Stream proxy route
// app.get("/esp-stream", (req, res) => {
//   if (!currentIP) {
//     return res.status(400).send("IP not set");
//   }

//   const options = {
//     hostname: currentIP,
//     port: 81,
//     path: "/stream",
//     method: "GET",
//   };

//   const proxy = http.request(options, (streamRes) => {
//     res.writeHead(streamRes.statusCode, streamRes.headers);
//     pipeline(streamRes, res, (err) => {
//       if (err) console.error("Pipeline error:", err.message);
//     });
//   });

//   proxy.on("error", (err) => {
//     console.error("Stream error:", err.message);
//     res.status(500).send("Stream error");
//   });

//   proxy.end();
// });

// // Fetch a single image from ESP32's /capture endpoint
// app.get("/capture-photo", (req, res) => {
//   if (!currentIP) return res.status(400).send("IP not set");

//   const options = {
//     hostname: currentIP,
//     port: 80, // ESP32's /capture is usually on port 80
//     path: "/capture", // not /stream
//     method: "GET",
//   };

//   const proxy = http.request(options, (espRes) => {
//     res.writeHead(espRes.statusCode, espRes.headers);
//     pipeline(espRes, res, (err) => {
//       if (err) console.error("Pipeline error (capture):", err.message);
//     });
//   });

//   proxy.on("error", (err) => {
//     console.error("Capture error:", err.message);
//     res.status(500).send("Capture error");
//   });

//   proxy.end();
// });

// // Upload image
// app.post("/upload-photo", upload.single("photo"), (req, res) => {
//   if (!req.file) return res.status(400).send("No file uploaded");

//   console.log("Image saved to:", req.file.path);
//   res.send("Photo captured and saved!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

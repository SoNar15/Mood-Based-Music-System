import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Handle __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const detectEmotion = async (req, res) => {
  try {
    const pythonScriptPath = path.join(
      __dirname,
      "..",
      "python",
      "detect_emotion.py"
    );

    const pythonProcess = spawn("python", [pythonScriptPath]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Emotion detection failed." });
      }

      try {
        const parsed = JSON.parse(result);
        res.status(200).json(parsed);
      } catch (err) {
        console.error("Error parsing emotion detection output:", err);
        res.status(500).json({ error: "Invalid output from emotion script." });
      }
    });
  } catch (err) {
    console.error("Emotion detection error:", err);
    res.status(500).json({ error: "Server error during emotion detection." });
  }
};

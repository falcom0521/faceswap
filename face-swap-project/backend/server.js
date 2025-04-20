const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Increase the timeout for axios requests
axios.defaults.timeout = 25000; // 25 second timeout

// Optimize body parser for your needs
app.use(bodyParser.json({ limit: "5mb" })); // Consider reducing limit if possible
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

const api_key = process.env.SEGMIND_API_KEY || "SG_eac4e03c1cf21232";
const url = "https://api.segmind.com/v1/sd2.1-faceswapper";

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve assets files
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Add a simple health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.post("/faceswap", async (req, res) => {
  const startTime = Date.now();
  console.log("Face swap request received");
  
  try {
    const { sourceImg, targetImg } = req.body;
    
    if (!sourceImg || !targetImg) {
      return res.status(400).json({ error: "Missing required images" });
    }

    // Log image sizes to diagnose potential issues
    console.log(`Source image size: ~${Math.round(sourceImg.length / 1.37 / 1024)}KB`);
    console.log(`Target image size: ~${Math.round(targetImg.length / 1.37 / 1024)}KB`);

    const data = {
      input_face_image: sourceImg,
      target_face_image: targetImg,
      face_restore: "codeformer-v0.1.0.pth",
      file_type: "jpg",
      base64: true,
    };

    // Set a timeout for the API request
    const response = await axios.post(url, data, {
      headers: { 
        "x-api-key": api_key,
        "Content-Type": "application/json"
      },
    });

    const processingTime = Date.now() - startTime;
    console.log(`Face swap successful in ${processingTime}ms`);
    
    res.json(response.data);
  } catch (error) {
    const errorTime = Date.now() - startTime;
    console.error(`Error after ${errorTime}ms: ${error.message}`);
    
    // Check if this is a timeout error
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return res.status(504).json({ 
        error: "The request to the face swap API timed out. Please try with smaller images or try again later."
      });
    }
    
    // If the error has a response from the API
    if (error.response) {
      console.error(`API responded with status ${error.response.status}`);
      return res.status(error.response.status).json({
        error: "API Error",
        details: error.response.data
      });
    }
    
    res.status(500).json({ 
      error: "Server error processing the request", 
      message: error.message 
    });
  }
});

// Add graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  // Close server here if needed
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

require("dotenv").config();

const Surprise = require("./models/Surprise");

const app = express();


// ============================
// CLOUDINARY CONFIGURATION
// ============================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ============================
// MULTER CONFIGURATION
// ============================

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});


// ============================
// MIDDLEWARE
// ============================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


// ============================
// HOME / TEST ROUTE
// ============================

app.get("/", (req, res) => {
  res.json({
    message: "SurpriseMe server is running ❤️",
  });
});


// ============================
// CLOUDINARY IMAGE UPLOAD
// ============================

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image was provided.",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "surpriseme",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);

          return res.status(500).json({
            message: "Image upload failed.",
            error: error.message,
          });
        }

        res.status(200).json({
          message: "Image uploaded successfully ❤️",
          url: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      message: "Image upload failed.",
      error: error.message,
    });
  }
});


// ============================
// CREATE SURPRISE
// ============================

app.post("/api/surprises", async (req, res) => {
  try {
    const {
      type,
      occasion,
      recipient,
      sender,
      message,
      design,
      template,
      photos,
    } = req.body;

    if (!recipient || !message) {
      return res.status(400).json({
        message: "Recipient and message are required.",
      });
    }

    const surprise = new Surprise({
      type: type || "surprise",
      occasion: occasion || "proposal",
      recipient,
      sender: sender || "",
      message,
      design: design || template || "romantic",
      template: template || "romantic",
      photos: photos || [],
    });

    const savedSurprise = await surprise.save();

    res.status(201).json({
      message: "Surprise created successfully ❤️",
      surprise: savedSurprise,
    });

  } catch (error) {
    console.error("Error creating surprise:", error);

    res.status(500).json({
      message: "Failed to create surprise",
      error: error.message,
    });
  }
});


// ============================
// GET PUBLIC SURPRISE
// ============================

app.get("/api/surprises/:id", async (req, res) => {
  try {
    const surprise = await Surprise.findById(req.params.id);

    if (!surprise) {
      return res.status(404).json({
        message: "Surprise not found.",
      });
    }

    res.json({
      surprise,
    });

  } catch (error) {
    console.error("Error getting surprise:", error);

    res.status(500).json({
      message: "Failed to load surprise.",
      error: error.message,
    });
  }
});


// ============================
// UPDATE SURPRISE
// ============================

app.put("/api/surprises/:id", async (req, res) => {
  try {
    const {
      type,
      occasion,
      recipient,
      sender,
      message,
      design,
      template,
      photos,
    } = req.body;

    const surprise = await Surprise.findByIdAndUpdate(
      req.params.id,
      {
        type: type || "surprise",
        occasion: occasion || "proposal",
        recipient,
        sender: sender || "",
        message,
        design: design || template || "romantic",
        template: template || "romantic",
        photos: photos || [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!surprise) {
      return res.status(404).json({
        message: "Surprise not found.",
      });
    }

    res.json({
      message: "Surprise updated successfully ❤️",
      surprise,
    });

  } catch (error) {
    console.error("Error updating surprise:", error);

    res.status(500).json({
      message: "Failed to update surprise.",
      error: error.message,
    });
  }
});


// ============================
// CONNECT TO MONGODB
// ============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ❤️");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
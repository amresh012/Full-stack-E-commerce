const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Set up storage destination and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle image upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/public/uploads/${req.file.filename}`,
  });
});

// Serve static files from the upload directory
app.use("/upload", express.static(path.join(__dirname, "public/uploads")));
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

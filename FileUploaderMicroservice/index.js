require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();

// Configure multer to store file data in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure AWS S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
  region: "Asia Pacific (Mumbai) ap-south-1",
});

// Define an upload endpoint
app.post('/upload', upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file provided' });

  // Create a unique file name
  const fileName = `${Date.now()}-${file.originalname}`;
  console.log('Uploading file:', fileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // Makes the file publicly readable (optional)
  };

  // Upload file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('S3 upload error:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    // Return the uploaded file data (includes file URL)
    res.status(200).json({ message: 'File uploaded successfully', data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`File uploader service is running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const app = express();

app.use(cors());

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(process.env.SPACES_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.BUCKET,
  acl: "public-read",
  key: function (request, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});

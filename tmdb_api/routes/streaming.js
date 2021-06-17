const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/video/:path", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("No range header found.");
  }

  const basePath = "D:\\Knight's Movies/";
  const { path } = req.params;
  const fullPath = basePath + path;

  const videoSize = fs.statSync(fullPath).size;
  const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
  const start = Number(range.replace(/\D/g, "")); // Removes all non-digit characters
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": `video/${extractExtension(path)}`,
  };

  res.writeHead(206, headers); // 206 means partial content

  const videoStream = fs.createReadStream(fullPath, { start, end });

  videoStream.pipe(res);
});

const extractExtension = (src) => {
  const extension = src.split(".")[1];
  return extension;
};

module.exports = router;

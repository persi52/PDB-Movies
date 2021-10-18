const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');

router.get('/graph', (req, res) => {
    

    const range = req.headers.range;
    if(!range) {
        res.status(400).send('Requires range header');
    }
    const videoPath = './GraphQL.mp4';
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize -1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
   
    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
});

module.exports = router;
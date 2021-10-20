const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verify = require('../routes/verifyToken')
const index = require('./index.js');

router.get("/", function (req, res) {
    //var filePath = ('simpleStream.html', { root: "views" });
    //const id = req.params.id;    
    //res.setHeader('id',req.params.id);
    
    //res.sendFile(filePath);     
});

const getView = (req,res) => {
   // res.sendFile('index.js', { root: "views" }); 
    index.Video();
}

const stream_video_get = async(req,res) =>{
    console.log(req.headers.id)
    // pool.query(
    //     'SELECT * FROM movies' + 
    //     ' WHERE movie_id = $1', [req.body.id],
    //     (err, results) => {
    //         if(err){
    //             throw err;
    //         } 
    // })      
    const range = req.headers.range;
    if(!range) {
        res.status(400).send('Requires range header')
    }
    const videoPath = './movies/Zielona mila.mp4';
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

}



module.exports = {
    stream_video_get,
    getView
};
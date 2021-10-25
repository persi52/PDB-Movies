const express = require("express");
const fs = require('fs');
const { useCallback } = require("react");
const { callbackify } = require("util");
const router = express.Router();
const pool = require('../models/db');
const verify = require('../routes/verifyToken')


router.get("/", function (req, res) {
    // var filePath = ('simpleStream.html', { root: "views" });
    // //const id = req.params.id;    
    // //res.setHeader('id',req.params.id);
    
    // res.sendFile(filePath);     
});

const getView = (req,res) => {
    //var filePath = ('simpleStream.html', { root: "views" });
    res.sendFile(__dirname + '/simpleStream.html');  
}

const stream_video = async(req,res) =>{
   // console.log(req.params.id)
    let movie;
    try{
        await pool.query(
            'SELECT * FROM movies' + 
            ' WHERE movie_id = $1', [req.params.id],
            (err, results) => {
                if(err){
                    throw err;
                }  
                    
          movie = results.rows[0];          
          console.log(movie);
  
    
    const range = req.headers.range;//"Range: bytes=0-323234";
    if(!range) {
        res.status(400).send('Requires range header')
    }
    const videoPath = movie.url;
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
})
    }catch(err){
        console.log(err);
    }

}


module.exports = {
    stream_video, 
    getView 
};
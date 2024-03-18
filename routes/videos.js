const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


function videoData() {
    const notesData = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(notesData);
    return parsedData;
}


router.get("/", (_req, res) => {
    const videos = videoData();
    console.log(videos);
    res.json(videos);
});


router.get("/:videoId", (req, res) => {
    const video = videoData();
    const singleVideo = video.find((video) => video.id === req.params.videoId);

    res.json(singleVideo);
});

router.post("/", (req, res) => {
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
    };

    const videos = videoData();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo);
});

module.exports = router;
const express = require("express");
const app = express();
const PORT = 8080;
const videosRoute = require("./routes/videos");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/public-images", express.static("./files"));

app.use((req, res, next) => {
    console.log("Logging a request from middleware");
    next();
});

app.use("/videos", videosRoute);

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});


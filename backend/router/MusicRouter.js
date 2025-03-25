const express = require("express")
const router = express.Router();
const {createPlaylist} = require("../controller/MusicController")


router.post("/createplaylist",createPlaylist);



module.exports = router;
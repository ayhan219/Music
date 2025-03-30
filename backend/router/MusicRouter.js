const express = require("express")
const router = express.Router();
const {createPlaylist,addMusicToPlaylist,getPlaylistMusics} = require("../controller/MusicController")


router.post("/createplaylist",createPlaylist);
router.post("/addmusictoplaylist",addMusicToPlaylist)
router.get("/playlistmusics",getPlaylistMusics)



module.exports = router;
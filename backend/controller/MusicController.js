const db = require("../db");


const createPlaylist = async(req,res)=>{
    const {user_id,playlist_name,playlist_description} = req.body;
    const query = "insert into playlists (user_id,playlist_name,playlist_description) value(?,?,?)";
    try {
        db.query(query,[user_id,playlist_name,playlist_description],(err,result)=>{
            if(err){
                res.status(500).json({message:"error occured while creating playlist"})
            }
            else{
                res.status(200).json({message:"playlist created successfully"})
            }
        })
    } catch (error) {
        return res.status(500).json({message:"error occured while creating playlist"})
    }
}


module.exports = {
    createPlaylist
}
const db = require("../db");

const createPlaylist = async (req, res) => {
  const { user_id, playlist_name, playlist_description } = req.body;
  const query =
    "INSERT INTO playlists (user_id, playlist_name, playlist_description) VALUES (?, ?, ?)";

  try {
    db.query(
      query,
      [user_id, playlist_name, playlist_description],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error occurred while creating playlist" });
        }
        const lastInsertedId = result.insertId;
        const query2 = "SELECT * FROM playlists WHERE id = ?";

        db.query(query2, [lastInsertedId], (err, playlistResult) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error occurred while fetching playlist" });
          }

          res.status(200).json(playlistResult[0]);
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred while creating playlist" });
  }
};

const addMusicToPlaylist = async (req, res) => {
  const { musicData } = req.body;

  if (Object.keys(musicData).length === 0) {
    return res.status(400).json({ message: "Provide all area" });
  }

  try {
    const query = `
      INSERT INTO musicdatas 
      (user_id, playlist_id, music_name, artist, music_url, music_image, music_duration, music_rank) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      musicData.user_id,
      musicData.playlist_id,
      musicData.music_name,
      musicData.artist,
      musicData.music_url,
      musicData.music_image,
      musicData.music_duration,
      musicData.music_rank,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "db error.", error: err });
      }
      return res.status(201).json({ message: "successfully added" });
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(500)
      .json({ message: "Error occurred while creating playlist" });
  }
};

const getPlaylistMusics = async (req, res) => {
  const { user_id, playlist_id } = req.query;
  try {
    const query =
      "SELECT * FROM musicdatas WHERE user_id = ? AND playlist_id = ?";
    db.query(query, [user_id, playlist_id], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "db error.", error: err });
      }

      const musicDataArray = results.map((row) => ({
        artist: {
          name: row.artist, 
        },
        album: {
          cover_medium: row.music_image,
        },
        duration: row.music_duration,
        id: row.id,
        md5_image: row.music_image,
        preview: row.music_url,
        rank: row.music_rank,
        title: row.music_name,
      }));

      
      return res.status(200).json(musicDataArray); 
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred while fetching playlist" });
  }
};


module.exports = {
  createPlaylist,
  addMusicToPlaylist,
  getPlaylistMusics,
};

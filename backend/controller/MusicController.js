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

module.exports = {
  createPlaylist,
};

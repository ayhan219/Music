const jwt = require("jsonwebtoken");
const db = require("../db");

const verifyToken = (req, res, next) => {
  const token = req.headers.cookie;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const tokenValue = token
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  if (!tokenValue) {
    return res.status(401).json({ message: "unauthorized - token not found" });
  }
  const jwtToken = tokenValue.split("=")[1];

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    
    const sql = `
      SELECT u.id AS user_id, u.username, u.email, u.created_at,
             p.playlist_name, p.playlist_description, p.id
      FROM user u
      LEFT JOIN playlists p ON u.id = p.user_id
      WHERE u.id = ?;
    `;

    db.query(sql, [decoded.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "unauthorized" });
      }

      const user = {
        id: results[0].user_id,
        username: results[0].username,
        email: results[0].email,
        created_at:results[0].created_at,
        playlists: []
      };
      

      results.forEach(row => {
        if (row.playlist_name) {  
          user.playlists.push({
            playlist_id: row.id,
            playlist_name: row.playlist_name,
            playlist_description: row.playlist_description,
            user_id:row.user_id
          });
        }
      });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

module.exports = verifyToken;

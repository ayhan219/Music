const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "provide all area" });
  }

  try {
    const hashedPW = await bcrypt.hash(password, 10);

    const sql = "insert into user (username, email, password) values (?, ?, ?)";
    const values = [username, email, hashedPW];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "error", err });
      }
      return res.status(200).json({ message: "signup successfull" });
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "provide all area" });
  }
  try {
    const sql = `SELECT u.id AS user_id, u.username, u.email,u.password, u.created_at,
       p.playlist_name, p.playlist_description
       FROM user u
       LEFT JOIN playlists p ON u.id = p.user_id
       WHERE u.email = ?;
      `;

    db.query(sql, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "invalid email or password" });
      }
      console.log("results", results);

      const user = {
        id: results[0].user_id,
        username: results[0].username,
        email: results[0].email,
        password: results[0].password,
        created_at: results[0].created_at,
        playlists: [],
      };

      results.forEach((row) => {
        if (row.playlist_name) {
          user.playlists.push({
            name: row.playlist_name,
            description: row.playlist_description,
          });
        }
      });

      const isPasswordMatch = await bcrypt.compare(
        password,
        results[0].password
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600000,
      });
      console.log("checking user", user);

      return res.status(200).json(user);
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logout successfull" });
};

const authGoogle = async (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

const googleCallback = async (req, res) => {
  passport.authenticate("google", async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Server error", err });
    }

    const userData = {
      username: user.displayName,
      email: user.emails[0].value,
    };

    const sql = "SELECT * FROM user WHERE email=?";
    try {
      db.query(sql, [userData.email], (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error", err });
        }

        if (results.length === 0) {
          const insertSql = "INSERT INTO user (username, email) VALUES (?, ?)";
          db.query(
            insertSql,
            [userData.username, userData.email],
            (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Error inserting user", err });
              }

              const getSqlUser = "select * from user where id=?";
              db.query(getSqlUser, [result.insertId], (err, results) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ message: "Error fetching user", err });
                }
                const token = jwt.sign(
                  {
                    id: results[0].id,
                    username: results[0].username,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                  }
                );
                res.cookie("token", token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "strict",
                  maxAge: 3600000,
                });
                res.redirect("http://localhost:5173/redirect");
              });
            }
          );
        } else {
          const token = jwt.sign(
            {
              id: results[0].id,
              username: results[0].username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
          });
          res.redirect("http://localhost:5173/redirect");
        }
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  })(req, res);
};

module.exports = {
  signup,
  login,
  getUser,
  logout,
  authGoogle,
  googleCallback,
};

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
    const sql = "select * from user where email=?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "invalid email or password" });
      }
      const user = results[0];

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" });
      }
      delete user.password;
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
      username: user.displayName.replace(/\s+/g, "_"),
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
              res.redirect("http://localhost:5173/redirect");
            }
          );
        } else {
          const token = jwt.sign(
            {
              id: results[0].id,
              username: results[0].username.replace(/\s+/g, "_"),
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
            secure: process.env.NODE_ENV === 'production',
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

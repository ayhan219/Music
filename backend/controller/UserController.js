const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({user, token});
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signup,
  login,
};

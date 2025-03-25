const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./router/UserRouter");
const musicRouter = require("./router/MusicRouter");
dotenv.config();
const app = express();
const cookie = require("cookie-parser")
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
require('./passport')


app.use(cookie());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());

app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/music",musicRouter)

app.listen(process.env.port, async () => {
  console.log(`server listening on port ${process.env.port}`);
});

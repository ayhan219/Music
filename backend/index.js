const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./router/UserRouter");
dotenv.config();
const app = express();
const cookie = require("cookie-parser")
const cors = require("cors");


app.use(cookie());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.port, async () => {
  console.log(`server listening on port ${process.env.port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./router/UserRouter");
dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.port, async () => {
  console.log(`server listening on port ${process.env.port}`);
});

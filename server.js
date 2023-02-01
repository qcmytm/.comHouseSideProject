const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const houseRoute = require("./routes").house;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 7070;
//連結mongoDB
mongoose
  .connect(
    process.env.MONGODB_ATLAS
    // "mongodb://localhost:27017/mernDB"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => {
    console.log("成功連結mongodb atlas...");
  })
  .catch((e) => {
    console.log(e);
  });
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/user", authRoute);
//只有登入系統的使用者,才能夠新增或註冊課程,驗證JWT
app.use(
  "/api/houses",
  passport.authenticate("jwt", { session: false }),
  houseRoute
);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("後端伺服器聆聽在port" + PORT);
});

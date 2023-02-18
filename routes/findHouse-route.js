const router = require("express").Router();
const House = require("../models").house;

router.use((req, res, next) => {
  console.log("findHouse route 正在接收一個request....");
  next();
});
//用house名稱尋找house
router.get("/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let houseFound = await House.find({ title: name })
      .populate("houseSeller", ["username", "email"])
      .exec();
    return res.send(houseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;

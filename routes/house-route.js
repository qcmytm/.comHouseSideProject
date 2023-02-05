const router = require("express").Router();
const houseValidation = require("../validation").houseValidation;
const House = require("../models").house;

router.use((req, res, next) => {
  console.log("house route 正在接收一個request....");
  next();
});
router.get("/", async (req, res) => {
  try {
    let houseFound = await House.find({})
      .populate("houseSeller", ["username", "email"])
      .exec();
    return res.send(houseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//用house名稱尋找house
router.get("/findByName/:name", async (req, res) => {
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

//用houseBuyer id來尋找houseBuyer預約鑑賞中的 house
router.get("/houseBuyer/:_houseBuyer_id", async (req, res) => {
  let { _houseBuyer_id } = req.params;
  try {
    let houseFound = await House.find({ houseBuyerAppointment: _houseBuyer_id })
      .populate("houseSeller", ["username", "email"])
      .exec();
    return res.send(houseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用houseSeller id來尋找  此id正委賣的所有house
router.get("/houseSeller/:_houseSeller_id", async (req, res) => {
  let { _houseSeller_id } = req.params;
  try {
    let houseFound = await House.find({ houseSeller: _houseSeller_id })
      .populate("houseSeller", ["username", "email"])
      .exec();
    return res.send(houseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let houseFound = await House.find({ _id })
      .populate("houseSeller", ["username", "email"])
      .exec();
    return res.send(houseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//新增委賣house
router.post("/", async (req, res) => {
  //驗證數據符合規範
  let { error } = houseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isHouseBuyer()) {
    return res
      .status(400)
      .send(
        "只有houseSeller才能發布新委賣物件.若你已經是houseSeller,請透過houseSeller帳號登入."
      );
  }
  let { title, description, image, image2, image3, price } = req.body;
  try {
    let newHouse = new House({
      title,
      description,
      image,
      image2,
      image3,
      price,
      houseSeller: req.user._id,
    });
    let savedHouse = await newHouse.save();
    return res.send("新增委賣物件已經發布");
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法新增委賣物件....");
  }
});
//讓houseBuyer透過houseId來預約 委賣house 鑑賞,另需確認是否重複預約
router.post("/appointment/:_id", async (req, res) => {
  let { _id } = req.params;
  let result;
  let house = await House.findOne({ _id });
  for (let i = 0; i < house.houseBuyerAppointment.length; i++) {
    if (house.houseBuyerAppointment[i] == req.user._id) {
      result = true;
    }
  }
  if (result) {
    res.status(403).send("已成功預約,請勿重複預約鑑賞謝謝~");
  } else {
    house.houseBuyerAppointment.push(req.user._id);
    await house.save();
    res.send("預約鑑賞完成");
  }
});
//讓houseBuyer透過houseId來  取消  預約
router.post("/deleteAppointment/:_id", async (req, res) => {
  console.log("1111");
  let { _id } = req.params;
  let result;
  let house = await House.findOne({ _id });
  for (let i = 0; i < house.houseBuyerAppointment.length; i++) {
    if (house.houseBuyerAppointment[i] == req.user._id) {
      house.houseBuyerAppointment.splice(i, 1);
      result = true;
      console.log("3333");
    }
  }
  if (!result) {
    res.status(403).send("錯誤錯誤,請再嘗試一次謝謝~");
  } else {
    await house.save();
    res.send("取消預約成功");
  }
});

//更改委賣物件
router.patch("/:_id", async (req, res) => {
  //驗證數據符合規範
  let { error } = houseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  //確認課程是否存在
  try {
    let houseFound = await House.findOne({ _id }).exec();
    if (!houseFound) {
      return res.status(400).send("找不到委賣物件.無法更新委賣物件內容.");
    }
    //使用者必須是此委賣物件發布者,才能編輯此委賣物件
    if (houseFound.houseSeller.equals(req.user._id)) {
      console.log("first");
      let updatedHouse = await House.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        msg: "委賣物件已經更新成功",
        updatedHouse,
      });
    } else {
      return res.status(403).send("只有此委賣物件的發布者,才能編輯此委賣物件");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  //確認委賣物件是否存在
  try {
    let houseFound = await House.findOne({ _id }).exec();
    if (!houseFound) {
      return res.status(400).send("找不到委賣物件.無法刪除.");
    }
    //使用者必須是此委賣物件發布者,才能刪除此委賣物件
    if (houseFound.houseSeller.equals(req.user._id)) {
      let deleteHouse = await House.deleteOne({ _id }).exec();
      return res.send("委賣物件已被刪除");
    } else {
      return res.status(403).send("只有此委賣物件的發布者才能刪除此委賣物件");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;

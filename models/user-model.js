const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["houseBuyer", "houseSeller"],
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//instance methods
userSchema.methods.isHouseBuyer = function () {
  return this.role == "houseBuyer";
};
userSchema.methods.isHouseSeller = function () {
  return this.role == "houseSeller";
};

userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};
//mongoose middlewares
//若使用者為新用戶,或者是正在更改密碼,則將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
  //this 代表 mongoDB 內的document 用function才抓的到this
  if (this.isNew || this.isModified("password")) {
    //將密碼進行雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

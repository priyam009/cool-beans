const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  employee: [{
    type: Schema.Types.ObjectId,
    ref: "Employee"
  }],
  ngo: [{
    type: Schema.Types.ObjectId,
    ref: "Ngo"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
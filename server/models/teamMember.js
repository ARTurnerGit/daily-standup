const mongoose = require("mongoose");

const sizeValidator = [
  function (val) {
    return val.trim().length > 0 && val.trim().length <= 50;
  },
  "{PATH} must be between 1 and 50 characters long",
];

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: sizeValidator },
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);

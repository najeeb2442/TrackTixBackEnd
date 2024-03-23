const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inviteSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    member: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invite", inviteSchema);

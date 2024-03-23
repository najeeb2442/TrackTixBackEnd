const mongoose = require("mongoose")
const Schema = mongoose.Schema

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Team", teamSchema)

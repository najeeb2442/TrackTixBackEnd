const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    image: [{ type: String }],
    password: { type: String, required: true },
    email: { type: String, required: true },
    // role: { type: String, required: true },
    // tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    // stadiums: [{ type: Schema.Types.ObjectId, ref: "Stadium" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)

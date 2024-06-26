const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: "No Number Provider" },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    invites: [{ type: Schema.Types.ObjectId, ref: "Invite" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)

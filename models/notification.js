const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    content: { type: String, required: true },
    member: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);

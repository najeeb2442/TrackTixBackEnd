const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    member: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    priority: { type: String, required: true }, //enum: [""]
    status: { type: String, required: true }, //enum: ["pending"] and other words
    createdBy: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    solvedBy: { type: Schema.Types.ObjectId, ref: "Ticket" },
    comments: [{ type: String }],
    attachments: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", userSchema);

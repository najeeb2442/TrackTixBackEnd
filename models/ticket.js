const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ticketSchema = new Schema(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    member: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority: { type: String, required: true }, //enum: [""]
    status: { type: String, required: true }, //enum: ["pending"] and other words
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    solvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    attachments: [{ type: String }],
    logs: [{ type: Object }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Ticket", ticketSchema)

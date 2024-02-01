import mongoose, { Schema, model } from "mongoose";

const announcementSchema = new Schema(
  {
    date: Date,
    title: String,
    content: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = model("Announcement", announcementSchema);
export default Announcement;

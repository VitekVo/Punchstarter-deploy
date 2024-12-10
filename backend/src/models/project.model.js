import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Tech", "Art", "Film", "Music", "Food", "Game", "Other"],
    required: false,
  },
  followCount: {
    type: Number,
    default: 0,
  },
  followList: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    default: 0,
  },
  images: {
    type: [Buffer],
    required: false,
  },
});

ProjectSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "project_id",
});

ProjectSchema.virtual("donations", {
  ref: "Donation",
  localField: "_id",
  foreignField: "project_id",
});

ProjectSchema.set("toObject", { virtuals: true });
ProjectSchema.set("toJSON", { virtuals: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;

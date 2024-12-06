import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    caption: { type: String, required: true },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);

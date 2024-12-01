import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, default: '' }, 
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    totalPosts: { type: Number, default: 0 },
    followers: [{ type:String }],
    following: [{ type:String }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
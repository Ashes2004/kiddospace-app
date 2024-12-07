import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema( {
   sentUser:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   receiveUser:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   text:{type:String},
   post:{ type: mongoose.Schema.Types.ObjectId, ref: "Post"},
   isSeen:{type:Boolean , default:false},
  },
  { timestamps: true });

  export default mongoose.model('Notification', notificationSchema);
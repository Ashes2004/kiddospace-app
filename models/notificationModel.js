import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema( {
   sentUser:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   receiveUser:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   text:{type:String},
   followBacklink:{type:String},
   postLink:{type:String},
   image:{type:String},
   isSeen:{type:Boolean , default:false},
  },
  { timestamps: true });

  export default mongoose.model('Notification', notificationSchema);
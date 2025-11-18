import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    body: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);



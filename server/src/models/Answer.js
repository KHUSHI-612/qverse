import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: Number, enum: [1, -1], required: true }
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    body: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    votes: { type: [voteSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Answer', answerSchema);

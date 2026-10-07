import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    age: { type: Number, required: true, min: 13 },
    activityGoal: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true },
);

export default mongoose.models.User ?? mongoose.model('User', userSchema);
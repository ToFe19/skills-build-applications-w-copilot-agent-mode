import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    periodStart: { type: Date, required: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ user: 1, period: 1, periodStart: 1 }, { unique: true });

export default mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);
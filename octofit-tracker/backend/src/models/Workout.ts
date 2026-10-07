import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['running', 'cycling', 'strength', 'mobility'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    exercises: [{ type: String, trim: true }],
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
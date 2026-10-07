import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userData = [
  { name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, activityGoal: 'Run a 5K under 25 minutes' },
  { name: 'Luis Romero', email: 'luis.romero@example.com', age: 34, activityGoal: 'Ride 100 km each week' },
  { name: 'Aisha Patel', email: 'aisha.patel@example.com', age: 27, activityGoal: 'Build a consistent strength routine' },
  { name: 'Noah Williams', email: 'noah.williams@example.com', age: 31, activityGoal: 'Walk 10,000 steps each day' },
];

const teamData = [
  {
    name: 'Tempo Crew',
    description: 'A steady-paced team focused on running and cycling goals.',
    memberEmails: ['maya.chen@example.com', 'luis.romero@example.com'],
  },
  {
    name: 'Summit Movers',
    description: 'A supportive team building strength and everyday movement.',
    memberEmails: ['aisha.patel@example.com', 'noah.williams@example.com'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const users = await Promise.all(
      userData.map(async ({ name, email, age, activityGoal }) => {
        const userDataItem = { name, email, age, activityGoal };
        const user = await User.findOneAndUpdate(
          { email },
          { $set: userDataItem },
          { returnDocument: 'after' },
        );
        return user ?? User.create(userDataItem);
      }),
    );

    for (const teamDataItem of teamData) {
      const members = teamDataItem.memberEmails.map((email) => {
        const user = users.find((candidate) => candidate?.email === email);
        if (!user) {
          throw new Error(`No seeded user found for ${email}`);
        }
        return user._id;
      });
      const teamFields = {
        name: teamDataItem.name,
        description: teamDataItem.description,
        members,
      };
      const team = await Team.findOneAndUpdate(
        { name: teamDataItem.name },
        { $set: teamFields },
        { returnDocument: 'after' },
      );
      const savedTeam = team ?? (await Team.create(teamFields));

      await User.updateMany({ _id: { $in: members } }, { $set: { team: savedTeam._id } });
    }

    const activities = [
      { email: 'maya.chen@example.com', type: 'running', durationMinutes: 32, distanceKm: 5.2, caloriesBurned: 390, date: '2026-10-06T17:30:00.000Z' },
      { email: 'luis.romero@example.com', type: 'cycling', durationMinutes: 54, distanceKm: 22.5, caloriesBurned: 510, date: '2026-10-06T16:00:00.000Z' },
      { email: 'aisha.patel@example.com', type: 'strength', durationMinutes: 45, distanceKm: 0, caloriesBurned: 280, date: '2026-10-05T18:15:00.000Z' },
      { email: 'noah.williams@example.com', type: 'walking', durationMinutes: 42, distanceKm: 3.4, caloriesBurned: 190, date: '2026-10-05T08:20:00.000Z' },
    ];

    for (const activity of activities) {
      const user = users.find((candidate) => candidate?.email === activity.email);
      if (!user) {
        throw new Error(`No seeded user found for ${activity.email}`);
      }

      const date = new Date(activity.date);
      const activityFields = {
        user: user._id,
        type: activity.type,
        durationMinutes: activity.durationMinutes,
        distanceKm: activity.distanceKm,
        caloriesBurned: activity.caloriesBurned,
        date,
      };
      const existingActivity = await Activity.findOneAndUpdate(
        { user: user._id, type: activity.type, date },
        { $set: activityFields },
        { returnDocument: 'after' },
      );
      if (!existingActivity) {
        await Activity.create(activityFields);
      }
    }

    const periodStart = new Date('2026-10-05T00:00:00.000Z');
    const leaderboardEntries = [
      { email: 'maya.chen@example.com', points: 480, rank: 1 },
      { email: 'luis.romero@example.com', points: 435, rank: 2 },
      { email: 'aisha.patel@example.com', points: 390, rank: 3 },
      { email: 'noah.williams@example.com', points: 345, rank: 4 },
    ];

    for (const entry of leaderboardEntries) {
      const user = users.find((candidate) => candidate?.email === entry.email);
      if (!user) {
        throw new Error(`No seeded user found for ${entry.email}`);
      }

      const leaderboardFields = {
        user: user._id,
        points: entry.points,
        rank: entry.rank,
        period: 'weekly',
        periodStart,
      };
      const leaderboardEntry = await Leaderboard.findOneAndUpdate(
        { user: user._id, period: 'weekly', periodStart },
        { $set: leaderboardFields },
        { returnDocument: 'after' },
      );
      if (!leaderboardEntry) {
        await Leaderboard.create(leaderboardFields);
      }
    }

    const workouts = [
      {
        title: 'Steady 5K Builder',
        description: 'A conversational-pace run with short pickups to build endurance.',
        category: 'running',
        difficulty: 'beginner',
        durationMinutes: 35,
        caloriesBurned: 320,
        exercises: ['5-minute warm-up walk', '25-minute easy run', '5-minute cooldown'],
        equipment: ['Running shoes'],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'A balanced circuit of foundational movements with controlled rests.',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        caloriesBurned: 300,
        exercises: ['Squats', 'Incline push-ups', 'Reverse lunges', 'Dead bugs'],
        equipment: ['Resistance band'],
      },
      {
        title: 'Recovery Mobility Flow',
        description: 'Gentle mobility work for hips, shoulders, and the upper back.',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        caloriesBurned: 90,
        exercises: ['Cat-cow', 'Worlds greatest stretch', 'Glute bridge', 'Childs pose'],
        equipment: ['Exercise mat'],
      },
    ];

    await Promise.all(
      workouts.map(async ({ title, ...workout }) => {
        const workoutFields = { title, ...workout };
        const existingWorkout = await Workout.findOneAndUpdate(
          { title },
          { $set: workoutFields },
          { returnDocument: 'after' },
        );
        return existingWorkout ?? Workout.create(workoutFields);
      }),
    );

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);
    console.log(`Seeded users: ${counts[0]}, teams: ${counts[1]}, activities: ${counts[2]}, leaderboard: ${counts[3]}, workouts: ${counts[4]}`);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();

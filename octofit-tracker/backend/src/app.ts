import cors from 'cors';
import express from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import database from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_request, response) => {
  const apiBaseUrl = app.locals.apiBaseUrl ?? 'http://localhost:8000';
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: {
      users: `${apiBaseUrl}/api/users/`,
      teams: `${apiBaseUrl}/api/teams/`,
      activities: `${apiBaseUrl}/api/activities/`,
      leaderboard: `${apiBaseUrl}/api/leaderboard/`,
      workouts: `${apiBaseUrl}/api/workouts/`,
    },
  });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team', 'name').sort({ name: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').sort({ name: 1 }).lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name').sort({ date: -1 }).lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate({ path: 'user', select: 'name team', populate: { path: 'team', select: 'name' } })
      .sort({ periodStart: -1, rank: 1 })
      .lean(),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

export default app;
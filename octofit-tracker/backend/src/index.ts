import cors from 'cors';
import express from 'express';
import database from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api', (_request, response) => {
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

const emptyCollection = (_request: express.Request, response: express.Response) => {
  response.json([]);
};

app.get('/api/users/', emptyCollection);
app.get('/api/teams/', emptyCollection);
app.get('/api/activities/', emptyCollection);
app.get('/api/leaderboard/', emptyCollection);
app.get('/api/workouts/', emptyCollection);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});
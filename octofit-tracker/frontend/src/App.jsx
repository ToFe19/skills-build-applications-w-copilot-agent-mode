import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { path: 'activities', label: 'Activities', mark: 'A' },
  { path: 'leaderboard', label: 'Leaderboard', mark: 'L' },
  { path: 'teams', label: 'Teams', mark: 'T' },
  { path: 'users', label: 'People', mark: 'P' },
  { path: 'workouts', label: 'Workouts', mark: 'W' },
]

function App() {
  return (
    <div className="tracker-shell">
      <aside className="sidebar">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit Tracker home">
          <img src="/octofitapp-small.png" alt="" />
          <span className="brand-copy">
            <strong>OctoFit</strong>
            <small>TRACKER</small>
          </span>
        </NavLink>

        <div className="sidebar-caption">YOUR TRAINING SPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ path, label, mark }) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) => `side-link${isActive ? ' is-active' : ''}`}
            >
              <span className="nav-mark" aria-hidden="true">{mark}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <span className="sidebar-foot-rule" />
          <span>OCTOFIT / 01</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <span className="topbar-kicker">MOVEMENT, MADE VISIBLE</span>
          <span className="topbar-status"><span /> OCTOFIT TRACKER</span>
        </header>

        <main className="workspace-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

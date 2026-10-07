import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main className="container py-5">
      <Routes>
        <Route
          path="/"
          element={
            <section className="border-bottom pb-4">
              <p className="text-uppercase text-secondary small mb-2">Activity and wellbeing</p>
              <h1 className="display-5 fw-semibold">OctoFit Tracker</h1>
              <p className="lead mb-0">Your training, teams, and progress in one place.</p>
            </section>
          }
        />
        <Route
          path="*"
          element={
            <section>
              <h1 className="h2">Page not found</h1>
              <Link to="/">Return to OctoFit Tracker</Link>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App

import { API_BASE_URL } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceView from './ResourceView.jsx'

const loadWorkouts = (signal) => fetch(`${API_BASE_URL}/api/workouts/`, { signal })

const columns = [
  {
    label: 'Workout',
    render: (workout) => (
      <>
        <strong className="table-primary">{workout.title}</strong>
        <span className="table-secondary">{workout.description}</span>
      </>
    ),
  },
  { label: 'Category', render: (workout) => <span className={`data-pill pill-${workout.category}`}>{workout.category}</span> },
  { label: 'Difficulty', render: (workout) => workout.difficulty },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  {
    label: 'Plan',
    render: (workout) => `${workout.exercises?.length ?? 0} movements / ${workout.caloriesBurned} kcal`,
  },
]

export default function Workouts() {
  const state = useCollection(loadWorkouts)

  return (
    <ResourceView
      eyebrow="Training library"
      title="Workouts"
      description="Suggested sessions for strength, endurance, and recovery."
      columns={columns}
      {...state}
    />
  )
}
import { API_BASE_URL } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceView from './ResourceView.jsx'

const loadActivities = (signal) => fetch(`${API_BASE_URL}/api/activities/`, { signal })

const columns = [
  { label: 'Member', render: (activity) => activity.user?.name ?? 'Unknown member' },
  {
    label: 'Activity',
    render: (activity) => <span className={`data-pill pill-${activity.type}`}>{activity.type}</span>,
  },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  {
    label: 'Distance',
    render: (activity) => activity.distanceKm > 0 ? `${activity.distanceKm} km` : '—',
  },
  { label: 'Calories', render: (activity) => `${activity.caloriesBurned} kcal` },
  {
    label: 'Date',
    render: (activity) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(activity.date)),
  },
]

export default function Activities() {
  const state = useCollection(loadActivities)

  return (
    <ResourceView
      eyebrow="Movement log"
      title="Activities"
      description="Recent sessions recorded across your OctoFit community."
      columns={columns}
      {...state}
    />
  )
}
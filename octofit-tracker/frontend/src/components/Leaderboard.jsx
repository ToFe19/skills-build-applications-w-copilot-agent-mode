import { API_BASE_URL } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceView from './ResourceView.jsx'

const loadLeaderboard = (signal) => fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })

const columns = [
  {
    label: 'Rank',
    render: (entry) => (
      <span className={`rank-number${entry.rank === 1 ? ' is-first' : ''}`}>
        {String(entry.rank).padStart(2, '0')}
      </span>
    ),
  },
  { label: 'Member', render: (entry) => entry.user?.name ?? 'Unknown member' },
  { label: 'Team', render: (entry) => entry.user?.team?.name ?? 'Independent' },
  { label: 'Points', render: (entry) => <strong className="table-primary">{entry.points}</strong> },
  { label: 'Period', render: (entry) => <span className="data-pill">{entry.period}</span> },
]

export default function Leaderboard() {
  const state = useCollection(loadLeaderboard)

  return (
    <ResourceView
      eyebrow="Community standings"
      title="Leaderboard"
      description="A snapshot of this period's points and team progress."
      columns={columns}
      {...state}
    />
  )
}
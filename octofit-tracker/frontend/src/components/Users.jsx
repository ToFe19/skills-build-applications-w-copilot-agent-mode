import { API_BASE_URL } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceView from './ResourceView.jsx'

const loadUsers = (signal) => fetch(`${API_BASE_URL}/api/users/`, { signal })

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

const columns = [
  {
    label: 'Member',
    render: (user) => (
      <span className="person-cell">
        <span className="person-initials" aria-hidden="true">{initials(user.name)}</span>
        <span>{user.name}</span>
      </span>
    ),
  },
  { label: 'Email', key: 'email' },
  { label: 'Age', render: (user) => user.age ? `${user.age} years` : '—' },
  { label: 'Team', render: (user) => user.team?.name ?? 'Independent' },
  { label: 'Activity goal', key: 'activityGoal' },
]

export default function Users() {
  const state = useCollection(loadUsers)

  return (
    <ResourceView
      eyebrow="Community directory"
      title="People"
      description="Member profiles, teams, and personal activity goals."
      columns={columns}
      {...state}
    />
  )
}
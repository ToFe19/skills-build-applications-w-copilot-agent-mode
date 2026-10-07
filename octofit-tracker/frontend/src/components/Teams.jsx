import { API_BASE_URL } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceView from './ResourceView.jsx'

const loadTeams = (signal) => fetch(`${API_BASE_URL}/api/teams/`, { signal })

const columns = [
  { label: 'Team', render: (team) => <strong className="table-primary">{team.name}</strong> },
  { label: 'About', key: 'description' },
  {
    label: 'Members',
    render: (team) => (
      <>
        <strong>{team.members?.length ?? 0}</strong>
        <span className="table-secondary">
          {team.members?.map((member) => member.name).filter(Boolean).join(', ') || 'No members'}
        </span>
      </>
    ),
  },
]

export default function Teams() {
  const state = useCollection(loadTeams)

  return (
    <ResourceView
      eyebrow="Shared goals"
      title="Teams"
      description="Groups moving toward their goals together."
      columns={columns}
      {...state}
    />
  )
}
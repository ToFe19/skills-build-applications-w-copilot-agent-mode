function rowKey(item, index) {
  return item._id ?? item.id ?? item.email ?? item.title ?? item.name ?? index
}

function ResourceTable({ title, columns, items }) {
  return (
    <div className="collection-frame">
      <div className="collection-scroll">
        <table className="collection-table" aria-label={`${title} records`}>
          <thead>
            <tr>
              {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={rowKey(item, index)}>
                {columns.map((column) => {
                  const value = column.render ? column.render(item) : item[column.key]
                  return (
                    <td key={column.label}>
                      {value ?? <span className="text-secondary">Not set</span>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ResourceView({
  eyebrow,
  title,
  description,
  columns,
  items,
  status,
  error,
  retry,
}) {
  const count = status === 'loading' ? '--' : String(items.length).padStart(2, '0')

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div className="view-title-group">
          <p className="view-eyebrow">{eyebrow}</p>
          <h1 className="view-title">{title}</h1>
          <p className="view-description">{description}</p>
        </div>
        <div className="view-actions">
          <div className="record-count" aria-label={`${items.length} records`}>
            <strong>{count}</strong>
            <span>records</span>
          </div>
          <button
            className="refresh-button"
            type="button"
            onClick={retry}
            disabled={status === 'loading'}
            title="Refresh data"
          >
            Refresh
          </button>
        </div>
      </header>

      {status === 'loading' && (
        <div className="collection-frame state-message" role="status">Loading {title.toLowerCase()}...</div>
      )}
      {status === 'error' && (
        <div className="collection-frame state-message state-error" role="alert">
          <strong>Could not load {title.toLowerCase()}</strong>
          <span>{error}</span>
          <div><button className="state-action" type="button" onClick={retry}>Try again</button></div>
        </div>
      )}
      {status === 'ready' && items.length === 0 && (
        <div className="collection-frame state-message" role="status">
          <strong>No {title.toLowerCase()} yet</strong>
          <span>New records will appear here when they are available.</span>
        </div>
      )}
      {status === 'ready' && items.length > 0 && (
        <ResourceTable title={title} columns={columns} items={items} />
      )}
    </section>
  )
}
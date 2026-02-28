import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTables } from '../api/queryApi';
import type { TableInfo } from '../types';

export default function HomePage() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTables()
      .then(setTables)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load tables';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Tables</h1>
          <p className="page-header__subtitle">
            Select a table to view and manage its data
          </p>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner" style={{ width: '40px', height: '40px' }} />
          <p>Loading tables…</p>
        </div>
      )}

      {error && (
        <div className="alert alert--error">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && tables.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🗄️</div>
          <h2 className="empty-state__title">No tables found</h2>
          <p className="empty-state__desc">
            No tables are available in the service. Make sure the backend is running.
          </p>
        </div>
      )}

      {!loading && !error && tables.length > 0 && (
        <div className="card-grid">
          {tables.map((table) => (
            <Link
              key={table.name}
              to={`/tables/${table.name}`}
              className="table-card"
            >
              <div className="table-card__icon">🗃️</div>
              <div className="table-card__name">
                {table.displayName || table.name}
              </div>
              <div className="table-card__meta">{table.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

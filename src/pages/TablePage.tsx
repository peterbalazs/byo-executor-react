import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { queryTable } from '../api/queryApi';
import { createLine } from '../api/newLineApi';
import { updateLine } from '../api/updateLineApi';
import { deleteLine } from '../api/deleteLineApi';
import TableDataGrid from '../components/TableDataGrid';
import LineForm from '../components/LineForm';
import ConfirmDialog from '../components/ConfirmDialog';
import type { QueryResult, TableRow } from '../types';

type ModalState =
  | { type: 'none' }
  | { type: 'new' }
  | { type: 'edit'; row: TableRow }
  | { type: 'delete'; row: TableRow };

export default function TablePage() {
  const { tableName } = useParams<{ tableName: string }>();
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = useCallback(() => {
    if (!tableName) return;
    setLoading(true);
    setError(null);
    queryTable(tableName)
      .then(setQueryResult)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load data';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [tableName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleNewLine = async (data: Record<string, unknown>) => {
    if (!tableName) return;
    await createLine({ tableName, data });
    setModal({ type: 'none' });
    showSuccess('Record created successfully.');
    loadData();
  };

  const handleUpdateLine = async (data: Record<string, unknown>) => {
    if (!tableName || modal.type !== 'edit') return;
    await updateLine({ tableName, id: modal.row.id, data });
    setModal({ type: 'none' });
    showSuccess('Record updated successfully.');
    loadData();
  };

  const handleDeleteLine = async () => {
    if (!tableName || modal.type !== 'delete') return;
    setActionLoading(true);
    try {
      await deleteLine({ tableName, id: modal.row.id });
      setModal({ type: 'none' });
      showSuccess('Record deleted successfully.');
      loadData();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="breadcrumb">
        <Link to="/">Tables</Link>
        <span className="breadcrumb__separator">›</span>
        <span className="breadcrumb__current">{tableName}</span>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-header__title">{tableName}</h1>
          <p className="page-header__subtitle">
            {queryResult ? `${queryResult.rows.length} record(s)` : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn--secondary" onClick={loadData}>
            🔄 Refresh
          </button>
          <button
            className="btn btn--primary"
            onClick={() => setModal({ type: 'new' })}
          >
            + New Line
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert--success" style={{ marginBottom: '1rem' }}>
          ✅ {successMsg}
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner" style={{ width: '40px', height: '40px' }} />
          <p>Loading data…</p>
        </div>
      )}

      {error && (
        <div className="alert alert--error">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && queryResult && (
        <>
          <div className="table-toolbar">
            <span className="table-toolbar__title">
              {queryResult.tableName}
            </span>
            <div className="table-toolbar__actions">
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {queryResult.rows.length} rows · {queryResult.columns.length} columns
              </span>
            </div>
          </div>
          <TableDataGrid
            columns={queryResult.columns}
            rows={queryResult.rows}
            onEdit={(row) => setModal({ type: 'edit', row })}
            onDelete={(row) => setModal({ type: 'delete', row })}
          />
          <div className="table-footer">
            <span>Showing {queryResult.rows.length} record(s)</span>
          </div>
        </>
      )}

      {/* New Line Modal */}
      {modal.type === 'new' && queryResult && (
        <LineForm
          title="New Line"
          tableName={tableName!}
          columns={queryResult.columns}
          submitLabel="Create"
          onSubmit={handleNewLine}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}

      {/* Edit Line Modal */}
      {modal.type === 'edit' && queryResult && (
        <LineForm
          title="Edit Line"
          tableName={tableName!}
          columns={queryResult.columns}
          initialData={modal.row}
          submitLabel="Update"
          onSubmit={handleUpdateLine}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}

      {/* Delete Confirm Dialog */}
      {modal.type === 'delete' && (
        <ConfirmDialog
          title="Delete Record"
          message={`Are you sure you want to delete record #${modal.row.id}? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteLine}
          onCancel={() => setModal({ type: 'none' })}
          loading={actionLoading}
        />
      )}
    </div>
  );
}

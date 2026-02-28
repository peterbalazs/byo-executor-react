import type { ColumnDefinition, TableRow } from '../types';

interface TableDataGridProps {
  columns: ColumnDefinition[];
  rows: TableRow[];
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
}

export default function TableDataGrid({
  columns,
  rows,
  onEdit,
  onDelete,
}: TableDataGridProps) {
  const showActions = onEdit || onDelete;

  if (rows.length === 0) {
    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.name}>{col.name}</th>
              ))}
              {showActions && <th className="data-table__th--actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="data-table__td--empty"
                colSpan={columns.length + (showActions ? 1 : 0)}
              >
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name}>{col.name}</th>
            ))}
            {showActions && <th className="data-table__th--actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row.id)}>
              {columns.map((col) => (
                <td key={col.name} title={String(row[col.name] ?? '')}>
                  {String(row[col.name] ?? '')}
                </td>
              ))}
              {showActions && (
                <td className="data-table__td--actions">
                  <div className="btn-group">
                    {onEdit && (
                      <button
                        className="btn btn--icon btn--icon--edit"
                        onClick={() => onEdit(row)}
                        title="Edit"
                        aria-label="Edit row"
                      >
                        ✏️
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn--icon btn--icon--delete"
                        onClick={() => onDelete(row)}
                        title="Delete"
                        aria-label="Delete row"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

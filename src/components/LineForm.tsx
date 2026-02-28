import { useState, useEffect } from 'react';
import type { ColumnDefinition, TableRow } from '../types';

interface LineFormProps {
  columns: ColumnDefinition[];
  initialData?: TableRow;
  title: string;
  submitLabel?: string;
  tableName: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function LineForm({
  columns,
  initialData,
  title,
  submitLabel = 'Save',
  tableName,
  onSubmit,
  onCancel,
}: LineFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initial: Record<string, string> = {};
    columns.forEach((col) => {
      initial[col.name] = initialData ? String(initialData[col.name] ?? '') : '';
    });
    setFormData(initial);
  }, [columns, initialData]);

  const editableColumns = columns.filter(
    (col) => col.name.toLowerCase() !== 'id'
  );

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2>{title}</h2>
          <button className="modal__close" onClick={onCancel} aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal__body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
              Table: <strong>{tableName}</strong>
            </p>
            {error && (
              <div className="alert alert--error" style={{ marginBottom: '1rem' }}>
                ⚠️ {error}
              </div>
            )}
            <div className="form-body" style={{ padding: 0 }}>
              {editableColumns.map((col) => (
                <div className="form-field" key={col.name}>
                  <label htmlFor={`field-${col.name}`}>
                    {col.name}
                    {col.type && (
                      <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: '0.25rem' }}>
                        ({col.type})
                      </span>
                    )}
                  </label>
                  <input
                    id={`field-${col.name}`}
                    type="text"
                    value={formData[col.name] ?? ''}
                    onChange={(e) => handleChange(col.name, e.target.value)}
                    placeholder={`Enter ${col.name}`}
                    required={!col.nullable}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

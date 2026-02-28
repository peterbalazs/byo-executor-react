interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button className="modal__close" onClick={onCancel} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal__body">
          <p>{message}</p>
        </div>
        <div className="modal__footer">
          <button className="btn btn--secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button className="btn btn--danger" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="spinner" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

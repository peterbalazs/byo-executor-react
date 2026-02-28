import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-content">
      <div className="empty-state">
        <div className="empty-state__icon">🔍</div>
        <h1 className="empty-state__title">404 – Page Not Found</h1>
        <p className="empty-state__desc">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

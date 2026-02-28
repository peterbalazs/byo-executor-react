import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <div className="navbar__brand-logo">BYO</div>
          <span className="navbar__brand-title">BYO Executor</span>
        </NavLink>
        <div className="navbar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link${isActive ? ' navbar__link--active' : ''}`
            }
          >
            Tables
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

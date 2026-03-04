// Sidebar.jsx — Reusable sidebar navigation.
// It takes a list of nav items and renders them, highlighting the active one.
// Used by both Doctor and Patient dashboards with different nav items.

function Sidebar({ brand, navItems, activeView, onNavChange, footerUser, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>{brand.title}</h1>
        <p>{brand.subtitle}</p>
      </div>

      <ul className="sidebar-nav">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              className={activeView === item.id ? 'active' : ''}
              onClick={() => onNavChange(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{footerUser.avatar}</div>
          <div className="user-chip-info">
            <p>{footerUser.name}</p>
            <span>{footerUser.role}</span>
          </div>
        </div>
        <button className="logout-btn" style={{ marginTop: 12, width: '100%' }} onClick={onLogout}>
          Sign out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

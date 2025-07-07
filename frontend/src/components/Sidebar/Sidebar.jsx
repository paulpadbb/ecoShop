import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ cartItemCount }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navigationItems = [
    { path: '/', icon: '🏠', label: 'Home', description: 'Shop Products' },
    { path: '/about', icon: 'ℹ️', label: 'About', description: 'Our Story' },
    { path: '/faq', icon: '❓', label: 'FAQ', description: 'Help Center' },
    { path: '/contact', icon: '📞', label: 'Contact', description: 'Get in Touch' },
    { path: '/checkout', icon: '🛒', label: 'Cart', description: 'Checkout', badge: cartItemCount }
  ];

  const accountItems = [
    { path: '/login', icon: '🔐', label: 'Login', description: 'Sign In' },
    { path: '/register', icon: '📝', label: 'Register', description: 'Create Account' },
    { path: '/profile', icon: '👤', label: 'Profile', description: 'My Account' }
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="mobile-toggle d-lg-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title="Toggle Menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <span className="brand-icon">🛍️</span>
            {!isCollapsed && <span className="brand-text">EcoShop</span>}
          </div>
          <button 
            className="toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {!isCollapsed && <div className="nav-section-title">Navigation</div>}
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    title={isCollapsed ? `${item.label} - ${item.description}` : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <div className="nav-content">
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-description">{item.description}</span>
                      </div>
                    )}
                    {item.badge && item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-section">
            {!isCollapsed && <div className="nav-section-title">Account</div>}
            <ul className="nav-list">
              {accountItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    title={isCollapsed ? `${item.label} - ${item.description}` : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <div className="nav-content">
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-description">{item.description}</span>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="footer-content">
              <div className="support-info">
                <div className="support-item">
                  <span className="support-icon">📧</span>
                  <span className="support-text">hello@ecoshop.com</span>
                </div>
                <div className="support-item">
                  <span className="support-icon">📞</span>
                  <span className="support-text">1-800-ECOSHOP</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="sidebar-overlay d-lg-none" 
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export { Sidebar }; 
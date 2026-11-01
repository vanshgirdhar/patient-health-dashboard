import React from 'react';
import {
  Activity,
  Users,
  Calendar,
  FileSpreadsheet,
  LineChart,
  Settings,
  Heart,
  X
} from 'lucide-react';

/**
 * @component Sidebar
 * Primary navigation sidebar for clinical staff.
 */
export function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'Patient Overview', icon: Activity, active: true },
    { label: 'Patients Directory', icon: Users, badge: '42' },
    { label: 'Appointments', icon: Calendar },
    { label: 'Lab Reports', icon: FileSpreadsheet },
    { label: 'Analytics & Trends', icon: LineChart },
    { label: 'Clinical Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 45
          }}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Clinical Navigation">
        {/* Brand Header */}
        <div className="app-sidebar__brand">
          <div className="app-sidebar__logo-icon">
            <Heart size={20} fill="#ffffff" />
          </div>
          <div>
            <div className="app-sidebar__brand-title">PulseCare EHR</div>
            <div className="app-sidebar__brand-sub">Clinical Monitoring Suite</div>
          </div>
          {isOpen && (
            <button
              type="button"
              onClick={onClose}
              className="ui-btn ui-btn-icon menu-toggle-btn"
              style={{ marginLeft: 'auto' }}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="app-sidebar__nav">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`nav-link ${item.active ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (isOpen) onClose();
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && <span className="nav-link__badge">{item.badge}</span>}
              </a>
            );
          })}
        </nav>

        {/* Attending Physician Footer */}
        <div className="app-sidebar__footer">
          <div className="physician-badge">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=128&q=80"
              alt="Dr. Marcus Vance"
              className="physician-avatar"
            />
            <div className="physician-info">
              <span className="physician-name">Dr. Marcus Vance</span>
              <span className="physician-role">Lead Cardiologist</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


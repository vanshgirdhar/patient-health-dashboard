import React from 'react';
import { Menu, RefreshCw, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';
import { getSimulateErrorState, setSimulateError } from '../../services/api';

/**
 * @component Header
 * Top clinical navigation bar containing system indicators,
 * real-time sync actions, and educational error-state simulators.
 */
export function Header({ onToggleSidebar, onReload, isReloading }) {
  const [isErrorMode, setIsErrorMode] = React.useState(getSimulateErrorState());

  const handleToggleErrorMode = () => {
    const nextVal = !isErrorMode;
    setSimulateError(nextVal);
    setIsErrorMode(nextVal);
    if (onReload) onReload();
  };

  return (
    <header className="app-header">
      <div className="app-header__left">
        <button
          type="button"
          className="ui-btn ui-btn-icon menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="clinic-indicator">
          <span className="clinic-dot" aria-hidden="true" />
          <span>Saint Jude Medical Center &bull; Electronic Health Records</span>
        </div>
      </div>

      <div className="app-header__actions">
        {/* Educational Mock API Error State Toggle */}
        <button
          type="button"
          onClick={handleToggleErrorMode}
          className={`debug-mode-btn ${isErrorMode ? 'active' : ''}`}
          title="Toggle HTTP 503 response simulation to test error boundaries"
        >
          <AlertTriangle size={15} />
          <span>{isErrorMode ? 'Simulate Error: ON' : 'Test Error State'}</span>
        </button>

        {/* Refresh API Data Button */}
        <button
          type="button"
          onClick={onReload}
          disabled={isReloading}
          className="ui-btn ui-btn-secondary ui-btn-sm"
          title="Refetch latest patient records from API"
          aria-label="Refresh clinical data"
        >
          <RefreshCw
            size={14}
            className={isReloading ? 'animate-spin' : ''}
            style={isReloading ? { animation: 'spin 1s linear infinite' } : {}}
          />
          <span>{isReloading ? 'Syncing...' : 'Sync Record'}</span>
        </button>
      </div>
    </header>
  );
}


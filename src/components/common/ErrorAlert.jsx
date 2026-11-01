import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * @component ErrorAlert
 * Clinical error feedback banner with retry trigger.
 *
 * @param {Object} props
 * @param {string} props.message
 * @param {Function} [props.onRetry]
 */
export function ErrorAlert({ message = 'An unexpected error occurred.', onRetry }) {
  return (
    <div className="ui-error-banner" role="alert">
      <div className="ui-error-banner__content">
        <AlertCircle size={20} strokeWidth={2.2} aria-hidden="true" />
        <div>
          <strong>System Communication Notice: </strong>
          <span>{message}</span>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="ui-btn ui-btn-outline ui-btn-sm"
          style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
        >
          <RefreshCw size={14} aria-hidden="true" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
}


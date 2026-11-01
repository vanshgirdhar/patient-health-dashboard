import React from 'react';

/**
 * @component Badge
 * Clinical status indicator pill.
 *
 * @param {Object} props
 * @param {'success'|'warning'|'danger'|'info'|'neutral'} [props.variant='neutral']
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} props.children
 */
export function Badge({ variant = 'neutral', icon, children, className = '' }) {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`.trim()}>
      {icon && <span className="ui-badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}


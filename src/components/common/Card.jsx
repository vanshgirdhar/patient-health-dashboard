import React from 'react';

/**
 * @component Card
 * A reusable container component providing clinical surface styling,
 * optional header, subtitle, and action slot.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.headerAction] - Optional action (buttons, dropdowns)
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export function Card({ title, subtitle, headerAction, children, className = '', ...rest }) {
  const hasHeader = Boolean(title || subtitle || headerAction);

  return (
    <article className={`ui-card ${className}`.trim()} {...rest}>
      {hasHeader && (
        <header className="ui-card-header">
          <div>
            {title && <h2 className="ui-card-title">{title}</h2>}
            {subtitle && <p className="ui-card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="ui-card-header__action">{headerAction}</div>}
        </header>
      )}
      <div className="ui-card-body">{children}</div>
    </article>
  );
}


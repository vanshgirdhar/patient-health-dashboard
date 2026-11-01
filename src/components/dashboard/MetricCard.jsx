import React from 'react';
import { Badge } from '../common/Badge';
import { StatTrendBadge } from '../common/StatTrendBadge';

/**
 * @component MetricCard
 * Single vital sign status card.
 *
 * @param {Object} props
 * @param {string} props.title - e.g., 'Respiratory Rate'
 * @param {string|number} props.value - e.g., 20
 * @param {string} props.unit - e.g., 'bpm'
 * @param {string} props.status - e.g., 'Normal'
 * @param {string} props.normalRange - e.g., '12 - 20 bpm'
 * @param {'up'|'down'|'steady'} [props.trend='steady']
 * @param {'respiratory'|'temperature'|'heartrate'|'oxygen'} props.variant
 * @param {React.ReactNode} props.icon
 */
export function MetricCard({
  title,
  value,
  unit,
  status,
  normalRange,
  trend = 'steady',
  variant = 'respiratory',
  icon
}) {
  let badgeVariant = 'success';
  if (status.includes('Higher') || status.includes('Stage') || status.includes('Critical')) {
    badgeVariant = 'danger';
  } else if (status.includes('Lower') || status.includes('Elevated')) {
    badgeVariant = 'warning';
  } else if (status.includes('Optimal')) {
    badgeVariant = 'info';
  }

  return (
    <div className={`metric-card metric-card--${variant}`}>
      <div className="metric-card__header">
        <div className="metric-card__icon-box">{icon}</div>
        <StatTrendBadge trend={trend} />
      </div>

      <div>
        <div className="metric-card__title">{title}</div>
        <div className="metric-card__value-row">
          <span className="metric-card__value">{value}</span>
          <span className="metric-card__unit">{unit}</span>
        </div>
      </div>

      <div className="metric-card__footer">
        <Badge variant={badgeVariant}>{status}</Badge>
        {normalRange && (
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            Ref: {normalRange}
          </span>
        )}
      </div>
    </div>
  );
}


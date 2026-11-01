import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

/**
 * @component StatTrendBadge
 * Displays health metric trajectory (e.g. up, down, or steady).
 *
 * @param {Object} props
 * @param {'up'|'down'|'steady'} props.trend
 * @param {string} [props.text]
 */
export function StatTrendBadge({ trend = 'steady', text }) {
  let icon = <Minus size={12} strokeWidth={2.5} aria-hidden="true" />;
  let label = 'Steady';

  if (trend === 'up') {
    icon = <ArrowUp size={12} strokeWidth={2.5} aria-hidden="true" />;
    label = 'Trending up';
  } else if (trend === 'down') {
    icon = <ArrowDown size={12} strokeWidth={2.5} aria-hidden="true" />;
    label = 'Trending down';
  }

  return (
    <span
      className={`ui-trend-badge ui-trend-badge--${trend}`}
      title={label}
      aria-label={`${label} ${text || ''}`}
    >
      {icon}
      {text && <span>{text}</span>}
    </span>
  );
}


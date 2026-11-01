import React from 'react';

/**
 * @component Skeleton
 * Shimmering placeholder box for perceived latency optimization.
 */
export function Skeleton({ width = '100%', height = '20px', circle = false, className = '' }) {
  return (
    <div
      className={`ui-skeleton ${circle ? 'ui-skeleton-circle' : ''} ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
      aria-hidden="true"
    />
  );
}

/**
 * @component DashboardSkeleton
 * Matches the layout structure of the full health dashboard during initial API retrieval.
 */
export function DashboardSkeleton() {
  return (
    <div className="dashboard-grid" aria-label="Loading clinical health dashboard..." aria-busy="true">
      {/* Left Column Skeleton */}
      <div className="dashboard-left-column">
        {/* Blood Pressure Chart Skeleton */}
        <div className="ui-card" style={{ height: '390px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <Skeleton width="220px" height="28px" />
            <Skeleton width="180px" height="32px" />
          </div>
          <Skeleton width="100%" height="280px" />
        </div>

        {/* 4 Metric Cards Skeleton */}
        <div className="metrics-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ui-card" style={{ height: '170px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="44px" height="44px" />
                <Skeleton width="60px" height="20px" />
              </div>
              <Skeleton width="100px" height="16px" style={{ marginTop: '16px' }} />
              <Skeleton width="130px" height="32px" style={{ marginTop: '8px' }} />
            </div>
          ))}
        </div>

        {/* Diagnostic Table Skeleton */}
        <div className="ui-card" style={{ height: '260px' }}>
          <Skeleton width="180px" height="24px" style={{ marginBottom: '16px' }} />
          <Skeleton width="100%" height="40px" style={{ marginBottom: '10px' }} />
          <Skeleton width="100%" height="40px" style={{ marginBottom: '10px' }} />
          <Skeleton width="100%" height="40px" />
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="dashboard-right-column">
        {/* Profile Card Skeleton */}
        <div className="ui-card" style={{ display: 'flex', alignItems: 'center', padding: '32px 20px' }}>
          <Skeleton width="96px" height="96px" circle style={{ marginBottom: '16px' }} />
          <Skeleton width="160px" height="24px" style={{ marginBottom: '8px' }} />
          <Skeleton width="110px" height="16px" style={{ marginBottom: '24px' }} />
          <Skeleton width="100%" height="240px" />
        </div>

        {/* Yearly Stats Skeleton */}
        <div className="ui-card" style={{ height: '220px' }}>
          <Skeleton width="160px" height="24px" style={{ marginBottom: '16px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Skeleton height="70px" />
            <Skeleton height="70px" />
            <Skeleton height="70px" />
            <Skeleton height="70px" />
          </div>
        </div>
      </div>
    </div>
  );
}


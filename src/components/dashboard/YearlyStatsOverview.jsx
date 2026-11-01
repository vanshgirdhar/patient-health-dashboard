import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Award, CheckCircle2, TrendingDown, CalendarDays } from 'lucide-react';

/**
 * @component YearlyStatsOverview
 * Displays aggregated yearly patient clinical statistics & compliance indices.
 *
 * @param {Object} props
 * @param {Object} props.yearlyStats
 */
export function YearlyStatsOverview({ yearlyStats }) {
  if (!yearlyStats) return null;

  const {
    averageSystolic,
    averageDiastolic,
    highestSystolic,
    lowestSystolic,
    recordedVisits,
    vitalsStabilityIndex,
    medicationAdherence,
    healthScore
  } = yearlyStats;

  return (
    <Card
      title="Yearly Statistics"
      subtitle="Annual vital sign aggregate summary & clinical compliance"
      headerAction={<Badge variant="success">{healthScore || 'Grade A'}</Badge>}
    >
      <div className="stats-kpi-grid">
        {/* Average Blood Pressure */}
        <div className="stat-kpi-box">
          <span className="stat-kpi-box__label">Annual Avg BP</span>
          <span className="stat-kpi-box__val">
            {Math.round(averageSystolic)}/{Math.round(averageDiastolic)}
          </span>
          <span className="stat-kpi-box__desc">mmHg combined average</span>
        </div>

        {/* Stability Index */}
        <div className="stat-kpi-box">
          <span className="stat-kpi-box__label">Stability Index</span>
          <span className="stat-kpi-box__val" style={{ color: 'var(--color-primary)' }}>
            {vitalsStabilityIndex}%
          </span>
          <span className="stat-kpi-box__desc">Clinical variance rating</span>
        </div>

        {/* Medication Adherence */}
        <div className="stat-kpi-box">
          <span className="stat-kpi-box__label">Med Adherence</span>
          <span className="stat-kpi-box__val" style={{ color: 'var(--color-success)' }}>
            {medicationAdherence}%
          </span>
          <span className="stat-kpi-box__desc">Prescription compliance</span>
        </div>

        {/* Total Consultations */}
        <div className="stat-kpi-box">
          <span className="stat-kpi-box__label">Total Visits</span>
          <span className="stat-kpi-box__val">{recordedVisits}</span>
          <span className="stat-kpi-box__desc">Physician consultations</span>
        </div>
      </div>

      {/* Systolic Variance Range Bar */}
      <div style={{ marginTop: '16px', padding: '12px', background: '#fafbfc', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Systolic Annual Bounds:</span>
          <span>
            <strong>{lowestSystolic}</strong> mmHg min &bull; <strong>{highestSystolic}</strong> mmHg max
          </span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.min(100, (averageSystolic / 160) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-systolic))'
            }}
          />
        </div>
      </div>
    </Card>
  );
}


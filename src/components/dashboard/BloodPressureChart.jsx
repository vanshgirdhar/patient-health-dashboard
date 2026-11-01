import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { classifyBloodPressure } from '../../utils/healthCalculators';
import { TIMEFRAMES } from '../../utils/constants';
import { Activity, Clock } from 'lucide-react';

// Register Chart.js modular components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * @component BloodPressureChart
 * Interactive dual-axis vital sign monitor visualizing Systolic & Diastolic trends.
 *
 * @param {Object} props
 * @param {Array} props.records - Dynamic records array fetched from API
 * @param {string} props.timeframe - Active timeframe filter ('6m' | '1y' | 'all')
 * @param {Function} props.onTimeframeChange - Filter change handler
 * @param {boolean} [props.isLoading] - Loading indicator during timeframe queries
 */
export function BloodPressureChart({
  records = [],
  timeframe = TIMEFRAMES.ONE_YEAR,
  onTimeframeChange,
  isLoading = false
}) {
  // Extract latest observation for the clinical summary panel
  const latestRecord = records[records.length - 1] || { systolic: 0, diastolic: 0 };
  const bpClassification = useMemo(
    () => classifyBloodPressure(latestRecord.systolic, latestRecord.diastolic),
    [latestRecord.systolic, latestRecord.diastolic]
  );

  // Map API records to Chart.js dataset structure
  const chartData = useMemo(() => {
    const labels = records.map((r) => r.month || r.date);
    const systolicPoints = records.map((r) => r.systolic);
    const diastolicPoints = records.map((r) => r.diastolic);

    return {
      labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicPoints,
          borderColor: '#E11D48', // Clinical Rose
          backgroundColor: 'rgba(225, 29, 72, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#E11D48',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          borderWidth: 2.5
        },
        {
          label: 'Diastolic',
          data: diastolicPoints,
          borderColor: '#7C3AED', // Clinical Violet
          backgroundColor: 'rgba(124, 58, 237, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#7C3AED',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          borderWidth: 2.5
        }
      ]
    };
  }, [records]);

  // Chart configuration options
  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false // Using custom accessible HTML summary cards
        },
        tooltip: {
          backgroundColor: '#0F172A',
          titleFont: { family: 'Plus Jakarta Sans', size: 13, weight: '700' },
          bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 12,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label(context) {
              const datasetLabel = context.dataset.label || '';
              const value = context.parsed.y;
              return ` ${datasetLabel}: ${value} mmHg`;
            },
            afterBody(tooltipItems) {
              const sysItem = tooltipItems.find((item) => item.dataset.label === 'Systolic');
              const diaItem = tooltipItems.find((item) => item.dataset.label === 'Diastolic');
              if (sysItem && diaItem) {
                const diagnosis = classifyBloodPressure(sysItem.parsed.y, diaItem.parsed.y);
                return `\nAssessment: ${diagnosis.category}`;
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: { family: 'Plus Jakarta Sans', size: 11, weight: '500' },
            color: '#64748B',
            maxRotation: 0
          }
        },
        y: {
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            font: { family: 'Plus Jakarta Sans', size: 11 },
            color: '#94A3B8',
            callback: (val) => `${val}`
          },
          grid: {
            color: '#F1F5F9'
          },
          border: {
            dash: [4, 4]
          }
        }
      }
    };
  }, []);

  return (
    <Card
      title="Blood Pressure Monitoring"
      subtitle="Systolic vs Diastolic continuous clinical trends"
      headerAction={
        <div className="bp-header-controls">
          <div className="bp-filter-group" role="group" aria-label="Timeframe selection">
            <button
              type="button"
              className={`bp-filter-btn ${timeframe === TIMEFRAMES.SIX_MONTHS ? 'active' : ''}`}
              onClick={() => onTimeframeChange(TIMEFRAMES.SIX_MONTHS)}
              disabled={isLoading}
            >
              6 Months
            </button>
            <button
              type="button"
              className={`bp-filter-btn ${timeframe === TIMEFRAMES.ONE_YEAR ? 'active' : ''}`}
              onClick={() => onTimeframeChange(TIMEFRAMES.ONE_YEAR)}
              disabled={isLoading}
            >
              1 Year
            </button>
            <button
              type="button"
              className={`bp-filter-btn ${timeframe === TIMEFRAMES.ALL ? 'active' : ''}`}
              onClick={() => onTimeframeChange(TIMEFRAMES.ALL)}
              disabled={isLoading}
            >
              All Records
            </button>
          </div>
        </div>
      }
      className="bp-chart-card"
    >
      <div className="bp-layout-wrapper">
        {/* Canvas Chart Area */}
        <div className="bp-canvas-container">
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
            >
              <Badge variant="info" icon={<Clock size={14} />}>
                Syncing timeframe...
              </Badge>
            </div>
          )}
          {records.length > 0 ? (
            <Line data={chartData} options={options} />
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
              No blood pressure records available for selected timeframe.
            </div>
          )}
        </div>

        {/* Side Clinical Summary Panel */}
        <aside className="bp-summary-panel" aria-label="Latest blood pressure readings">
          {/* Systolic Stat */}
          <div className="bp-stat-tile">
            <div className="bp-stat-tile__header">
              <span className="bp-stat-dot bp-stat-dot--systolic" aria-hidden="true" />
              <span>Systolic</span>
            </div>
            <div className="bp-stat-tile__value">
              {latestRecord.systolic}{' '}
              <span className="bp-stat-tile__unit">mmHg</span>
            </div>
            <div className="bp-stat-tile__meta">
              <Badge
                variant={latestRecord.systolic >= 130 ? 'danger' : latestRecord.systolic >= 120 ? 'warning' : 'success'}
              >
                {latestRecord.systolic >= 130
                  ? 'Higher than Avg'
                  : latestRecord.systolic >= 120
                  ? 'Elevated'
                  : 'Normal'}
              </Badge>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-subtle)' }} />

          {/* Diastolic Stat */}
          <div className="bp-stat-tile">
            <div className="bp-stat-tile__header">
              <span className="bp-stat-dot bp-stat-dot--diastolic" aria-hidden="true" />
              <span>Diastolic</span>
            </div>
            <div className="bp-stat-tile__value">
              {latestRecord.diastolic}{' '}
              <span className="bp-stat-tile__unit">mmHg</span>
            </div>
            <div className="bp-stat-tile__meta">
              <Badge variant={latestRecord.diastolic >= 85 ? 'warning' : 'success'}>
                {latestRecord.diastolic >= 85 ? 'Higher than Avg' : 'Normal'}
              </Badge>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-subtle)' }} />

          {/* Clinical Classification */}
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <strong>Latest Status: </strong>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {bpClassification.category}
            </span>
          </div>
        </aside>
      </div>
    </Card>
  );
}


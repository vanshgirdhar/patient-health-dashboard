import React from 'react';
import { MetricCard } from './MetricCard';
import { Wind, Thermometer, Heart, Activity } from 'lucide-react';

/**
 * @component HealthMetricsGrid
 * Dashboard grid rendering real-time core vital signs.
 *
 * @param {Object} props
 * @param {Object} props.vitals - Patient vitals object from API
 */
export function HealthMetricsGrid({ vitals }) {
  if (!vitals) return null;

  const { respiratoryRate, temperature, heartRate, oxygenSaturation } = vitals;

  return (
    <section className="metrics-grid" aria-label="Real-time vital signs">
      {/* Respiratory Rate */}
      {respiratoryRate && (
        <MetricCard
          title="Respiratory Rate"
          value={respiratoryRate.value}
          unit={respiratoryRate.unit}
          status={respiratoryRate.status}
          normalRange={respiratoryRate.normalRange}
          trend={respiratoryRate.trend}
          variant="respiratory"
          icon={<Wind size={22} color="#0D9488" />}
        />
      )}

      {/* Temperature */}
      {temperature && (
        <MetricCard
          title="Body Temperature"
          value={temperature.value}
          unit={temperature.unit}
          status={temperature.status}
          normalRange={temperature.normalRange}
          trend={temperature.trend}
          variant="temperature"
          icon={<Thermometer size={22} color="#E11D48" />}
        />
      )}

      {/* Heart Rate */}
      {heartRate && (
        <MetricCard
          title="Heart Rate"
          value={heartRate.value}
          unit={heartRate.unit}
          status={heartRate.status}
          normalRange={heartRate.normalRange}
          trend={heartRate.trend}
          variant="heartrate"
          icon={<Heart size={22} color="#EA580C" />}
        />
      )}

      {/* Oxygen Saturation */}
      {oxygenSaturation && (
        <MetricCard
          title="SpO2 Blood Oxygen"
          value={oxygenSaturation.value}
          unit={oxygenSaturation.unit}
          status={oxygenSaturation.status}
          normalRange={oxygenSaturation.normalRange}
          trend={oxygenSaturation.trend}
          variant="oxygen"
          icon={<Activity size={22} color="#4F46E5" />}
        />
      )}
    </section>
  );
}


import React from 'react';
import { usePatientData } from '../hooks/usePatientData';
import { useTimeframeFilter } from '../hooks/useTimeframeFilter';
import { DashboardSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { BloodPressureChart } from '../components/dashboard/BloodPressureChart';
import { HealthMetricsGrid } from '../components/dashboard/HealthMetricsGrid';
import { DiagnosticList } from '../components/dashboard/DiagnosticList';
import { PatientProfileCard } from '../components/dashboard/PatientProfileCard';
import { YearlyStatsOverview } from '../components/dashboard/YearlyStatsOverview';
import { LabResultsCard } from '../components/dashboard/LabResultsCard';
import { TIMEFRAMES } from '../utils/constants';

/**
 * @page DashboardPage
 * Primary page orchestrating patient health monitoring widgets,
 * state subscriptions, and asynchronous lifecycle handling.
 */
export function DashboardPage() {
  // 1. Fetch core patient profile and initial vitals
  const { patient, loading, error, refetch } = usePatientData('pat_001');

  // 2. Manage dynamic blood pressure historical data with interactive timeframe filters
  const {
    timeframe,
    setTimeframe,
    records: bpRecords,
    loading: bpLoading,
    error: bpError,
    refetch: refetchBp
  } = useTimeframeFilter('pat_001', TIMEFRAMES.ONE_YEAR);

  // Initial full-page loading state
  if (loading && !patient) {
    return (
      <main className="dashboard-viewport">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Patient Clinical Overview</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            Fetching verified Electronic Health Record (EHR) from secure clinical endpoint...
          </p>
        </div>
        <DashboardSkeleton />
      </main>
    );
  }

  // Error boundary state
  if (error) {
    return (
      <main className="dashboard-viewport">
        <ErrorAlert message={error} onRetry={refetch} />
      </main>
    );
  }

  return (
    <main className="dashboard-viewport">
      {/* Title & Patient Identification Row */}
      <div className="dashboard-title-row">
        <div className="patient-header-title">
          <h1>Clinical Health Dashboard</h1>
          <span className="patient-id-tag">ID: {patient?.id}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          Assigned Physician:{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {patient?.primaryPhysician?.name}
          </strong>
        </div>
      </div>

      {/* Sub-component Error Banner (if timeframe chart fetch specifically failed) */}
      {bpError && (
        <ErrorAlert
          message={`Blood pressure sync error: ${bpError}`}
          onRetry={refetchBp}
        />
      )}

      {/* 2-Column Responsive Clinical Grid */}
      <div className="dashboard-grid">
        {/* Left / Primary Column */}
        <div className="dashboard-left-column">
          {/* 1. Blood Pressure Dual-Series Chart */}
          <BloodPressureChart
            records={bpRecords}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            isLoading={bpLoading}
          />

          {/* 2. Real-time Vital Sign Metrics Cards */}
          <HealthMetricsGrid vitals={patient?.vitals} />

          {/* 3. Diagnostic History List */}
          <DiagnosticList diagnostics={patient?.diagnostics} />
        </div>

        {/* Right / Secondary Column */}
        <aside className="dashboard-right-column">
          {/* 4. Patient Profile & Demographics Card */}
          <PatientProfileCard patient={patient} />

          {/* 5. Yearly Health Statistics */}
          <YearlyStatsOverview yearlyStats={patient?.yearlyStats} />

          {/* 6. Laboratory Reports */}
          <LabResultsCard labResults={patient?.labResults} />
        </aside>
      </div>
    </main>
  );
}

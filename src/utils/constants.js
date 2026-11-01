/**
 * @file constants.js
 * Centralized application constants for healthcare status definitions,
 * blood pressure thresholds, API configuration, and UI options.
 */

export const HEALTH_STATUS = {
  NORMAL: 'Normal',
  ELEVATED: 'Elevated',
  STAGE_1_HYPERTENSION: 'Stage 1 Hypertension',
  STAGE_2_HYPERTENSION: 'Stage 2 Hypertension',
  CRITICAL: 'Critical',
  OPTIMAL: 'Optimal',
  HIGHER_THAN_AVERAGE: 'Higher than Average',
  LOWER_THAN_AVERAGE: 'Lower than Average'
};

export const STATUS_COLORS = {
  NORMAL: {
    bg: '#ecfdf5',
    text: '#065f46',
    border: '#a7f3d0'
  },
  ELEVATED: {
    bg: '#fffbeb',
    text: '#92400e',
    border: '#fde68a'
  },
  STAGE_1: {
    bg: '#fff1f2',
    text: '#9f1239',
    border: '#fecdd3'
  },
  CRITICAL: {
    bg: '#fef2f2',
    text: '#991b1b',
    border: '#fca5a5'
  },
  INFO: {
    bg: '#eff6ff',
    text: '#1e40af',
    border: '#bfdbfe'
  }
};

export const TIMEFRAMES = {
  SIX_MONTHS: '6m',
  ONE_YEAR: '1y',
  ALL: 'all'
};

export const TIMEFRAME_LABELS = {
  [TIMEFRAMES.SIX_MONTHS]: 'Last 6 Months',
  [TIMEFRAMES.ONE_YEAR]: 'Last 1 Year',
  [TIMEFRAMES.ALL]: 'All Records'
};

export const API_CONFIG = {
  DEFAULT_LATENCY_MS: 650, // Realistic clinical EHR network latency
  ENABLE_CACHE: true
};


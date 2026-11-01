/**
 * @file healthCalculators.js
 * Clinical validation and classification logic for vital signs
 * according to standard American Heart Association (AHA) and medical reference bounds.
 */

import { HEALTH_STATUS } from './constants.js';

/**
 * Classifies blood pressure readings based on AHA guidelines.
 * @param {number} systolic - Systolic reading (mmHg)
 * @param {number} diastolic - Diastolic reading (mmHg)
 * @returns {{ category: string, variant: string, description: string }}
 */
export function classifyBloodPressure(systolic, diastolic) {
  if (!systolic || !diastolic) {
    return { category: 'Unknown', variant: 'info', description: 'No reading' };
  }

  if (systolic >= 180 || diastolic >= 120) {
    return {
      category: HEALTH_STATUS.CRITICAL,
      variant: 'danger',
      description: 'Hypertensive Crisis - Immediate medical attention required'
    };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return {
      category: HEALTH_STATUS.STAGE_2_HYPERTENSION,
      variant: 'danger',
      description: 'Stage 2 Hypertension - Exceeds safe threshold'
    };
  }
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      category: HEALTH_STATUS.STAGE_1_HYPERTENSION,
      variant: 'warning',
      description: 'Stage 1 Hypertension - Mild elevation'
    };
  }
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return {
      category: HEALTH_STATUS.ELEVATED,
      variant: 'warning',
      description: 'Elevated - Lifestyle monitoring advised'
    };
  }
  if (systolic < 120 && diastolic < 80) {
    return {
      category: HEALTH_STATUS.NORMAL,
      variant: 'success',
      description: 'Optimal blood pressure levels'
    };
  }

  return {
    category: HEALTH_STATUS.NORMAL,
    variant: 'success',
    description: 'Within clinical expectations'
  };
}

/**
 * Classifies Heart Rate (Resting bpm)
 */
export function classifyHeartRate(bpm) {
  if (bpm < 60) return { status: 'Lower than Average', variant: 'warning' };
  if (bpm > 100) return { status: 'Higher than Average', variant: 'warning' };
  return { status: 'Normal', variant: 'success' };
}

/**
 * Classifies Respiratory Rate (breaths per min)
 */
export function classifyRespiratoryRate(rate) {
  if (rate < 12) return { status: 'Lower than Average', variant: 'warning' };
  if (rate > 20) return { status: 'Higher than Average', variant: 'warning' };
  return { status: 'Normal', variant: 'success' };
}

/**
 * Classifies Temperature (°F)
 */
export function classifyTemperature(tempF) {
  if (tempF > 99.5) return { status: 'Higher than Average', variant: 'warning' };
  if (tempF < 97.0) return { status: 'Lower than Average', variant: 'warning' };
  return { status: 'Normal', variant: 'success' };
}

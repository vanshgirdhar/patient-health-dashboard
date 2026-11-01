/**
 * @file patientService.js
 * Domain Service Layer for Patient Data.
 *
 * Senior Best Practice:
 * UI components NEVER make raw fetch calls or hardcode endpoints.
 * They call named service functions, allowing backend URL changes,
 * caching layers, or mocks to be swapped without modifying a single React component.
 */

import { apiClient } from './api.js';

export const patientService = {
  /**
   * Fetch complete patient record by ID
   * @param {string} patientId
   * @param {AbortSignal} [signal]
   * @returns {Promise<Object>}
   */
  async getPatient(patientId = 'pat_001', signal) {
    return apiClient(`/api/patients/${patientId}`, { signal });
  },

  /**
   * Fetch blood pressure history with optional timeframe filter
   * @param {string} patientId
   * @param {'6m' | '1y' | 'all'} [timeframe='1y']
   * @param {AbortSignal} [signal]
   * @returns {Promise<{ timeframe: string, records: Array }>}
   */
  async getBloodPressureHistory(patientId = 'pat_001', timeframe = '1y', signal) {
    return apiClient(`/api/patients/${patientId}/blood-pressure?timeframe=${encodeURIComponent(timeframe)}`, { signal });
  },

  /**
   * Fetch real-time vitals
   * @param {string} patientId
   * @param {AbortSignal} [signal]
   * @returns {Promise<{ vitals: Object }>}
   */
  async getVitals(patientId = 'pat_001', signal) {
    return apiClient(`/api/patients/${patientId}/vitals`, { signal });
  }
};

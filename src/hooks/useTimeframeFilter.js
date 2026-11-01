/**
 * @file useTimeframeFilter.js
 * Custom Hook: Manages interactive timeframe filters and dynamic data queries.
 *
 * Demonstrates:
 * - Dynamic data fetching triggered by user UI interactions (filtering)
 * - State synchronization
 * - Independent loading and error states for sub-components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { patientService } from '../services/patientService.js';
import { TIMEFRAMES } from '../utils/constants.js';

export function useTimeframeFilter(patientId = 'pat_001', initialTimeframe = TIMEFRAMES.ONE_YEAR) {
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchRecords = useCallback(async (selectedTimeframe) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await patientService.getBloodPressureHistory(
        patientId,
        selectedTimeframe,
        controller.signal
      );
      setRecords(response.records || []);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to update blood pressure records');
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchRecords(timeframe);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [timeframe, fetchRecords]);

  return {
    timeframe,
    setTimeframe,
    records,
    loading,
    error,
    refetch: () => fetchRecords(timeframe)
  };
}

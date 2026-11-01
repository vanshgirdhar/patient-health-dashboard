/**
 * @file usePatientData.js
 * Custom React Hook: Data Fetching and Lifecycle Management
 *
 * Senior Engineering Principles Demonstrated:
 * 1. Encapsulation: Separates async lifecycle (loading, error, data, refetch) from UI presentation.
 * 2. Race Condition Prevention: Uses standard Web AbortController to cancel in-flight requests if unmounted.
 * 3. Declarative API: Components consume clean states: `{ patient, loading, error, refetch }`.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { patientService } from '../services/patientService.js';

export function usePatientData(patientId = 'pat_001') {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep track of active AbortController to abort previous requests if needed
  const abortControllerRef = useRef(null);

  const fetchPatient = useCallback(async () => {
    // Cancel any previous pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await patientService.getPatient(patientId, controller.signal);
      setPatient(data);
    } catch (err) {
      // Ignore cancellations caused by component unmounting
      if (err.name === 'AbortError') {
        return;
      }
      setError(err.message || 'Failed to load patient clinical data');
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchPatient();

    // Cleanup: cancel request if component unmounts before response returns
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPatient]);

  return {
    patient,
    loading,
    error,
    refetch: fetchPatient
  };
}

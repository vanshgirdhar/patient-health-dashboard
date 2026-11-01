/**
 * @file api.js
 * Senior Architecture Pattern: Reusable HTTP Client Wrapper
 *
 * Demonstrates:
 * - Native Fetch API usage
 * - Async / Await paradigm
 * - HTTP status code validation (response.ok check)
 * - Standardized error transformation
 * - Request cancellation via AbortController
 * - Network simulation layer for educational development
 */

import { SYNTHETIC_PATIENT_DATABASE } from './mockData.js';
import { API_CONFIG } from '../utils/constants.js';

// Simulated server state flag to allow testing error handling directly from UI!
let shouldSimulateError = false;

/**
 * Toggle simulated network failures (for educational demonstration of error states)
 * @param {boolean} value
 */
export function setSimulateError(value) {
  shouldSimulateError = Boolean(value);
}

export function getSimulateErrorState() {
  return shouldSimulateError;
}

/**
 * Simulates a realistic REST HTTP Network layer returning a standard Web Response
 * @param {string} endpoint - e.g., '/api/patients/pat_001'
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
async function mockFetchTransport(endpoint, options = {}) {
  const signal = options.signal;

  // Simulate network roundtrip latency
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, API_CONFIG.DEFAULT_LATENCY_MS);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Request aborted by client', 'AbortError'));
      });
    }
  });

  // If user requested simulated error testing
  if (shouldSimulateError) {
    return new Response(
      JSON.stringify({
        error: 'Simulated Clinical EHR Service Unavailable (HTTP 503)',
        code: 'SERVICE_UNAVAILABLE',
        timestamp: new Date().toISOString()
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Parse simulated route
  // Examples:
  // /api/patients/pat_001
  // /api/patients/pat_001/blood-pressure?timeframe=6m
  const url = new URL(endpoint, 'http://localhost:3000');
  const pathParts = url.pathname.split('/').filter(Boolean); // ['api', 'patients', 'pat_001', ...]
  const patientId = pathParts[2] || 'pat_001';
  const resource = pathParts[3]; // e.g., 'blood-pressure', 'vitals', etc.

  const patient = SYNTHETIC_PATIENT_DATABASE[patientId];

  if (!patient) {
    return new Response(
      JSON.stringify({
        error: `Patient ID '${patientId}' not found in registry.`,
        code: 'NOT_FOUND'
      }),
      {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Route: /api/patients/:id/blood-pressure
  if (resource === 'blood-pressure') {
    const timeframe = url.searchParams.get('timeframe') || 'all';
    let records = [...patient.bloodPressureHistory];

    if (timeframe === '6m') {
      records = records.slice(-6);
    } else if (timeframe === '1y') {
      records = records.slice(-12);
    }

    return new Response(
      JSON.stringify({
        timeframe,
        patientId,
        count: records.length,
        records
      }),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Route: /api/patients/:id/vitals
  if (resource === 'vitals') {
    return new Response(
      JSON.stringify({
        patientId,
        vitals: patient.vitals
      }),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Route: /api/patients/:id (full patient record)
  return new Response(
    JSON.stringify(patient),
    {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Core API Client
 * Wraps HTTP calls with safety checks, error parsing, and timeout logic.
 *
 * @template T
 * @param {string} endpoint - The API endpoint to call
 * @param {RequestInit} [options] - Standard Fetch options
 * @returns {Promise<T>} Parsed JSON response
 */
export async function apiClient(endpoint, options = {}) {
  try {
    // In production, this calls window.fetch(endpoint, options).
    // Here we route to our educational mock transport that returns a real Response object.
    const response = await mockFetchTransport(endpoint, options);

    // Standard HTTP Status Validation:
    // response.ok is true if status is in the 200-299 range
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.error) {
          errorMessage = errorBody.error;
        }
      } catch {
        // Fallback to status text if body is not JSON
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // Parse JSON stream into JavaScript object
    const data = await response.json();
    return data;
  } catch (error) {
    // If request was canceled by AbortController, ignore or rethrow cleanly
    if (error.name === 'AbortError') {
      throw error;
    }

    // Enhance and rethrow for UI layer handling
    console.error(`[API Client Error] Request failed on ${endpoint}:`, error.message);
    throw error;
  }
}

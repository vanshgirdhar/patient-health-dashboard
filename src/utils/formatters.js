/**
 * @file formatters.js
 * Utility helper functions for safe display formatting (dates, units, numbers).
 */

/**
 * Formats an ISO date string or timestamp into readable medical date format.
 * @param {string|Date} dateInput
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDate(dateInput, options = {}) {
  if (!dateInput) return 'N/A';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return String(dateInput);
  }
}

/**
 * Formats a phone number safely.
 * @param {string} phone
 * @returns {string}
 */
export function formatPhoneNumber(phone) {
  if (!phone) return 'N/A';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Formats numbers with units safely.
 * @param {number|string} val
 * @param {string} unit
 * @returns {string}
 */
export function formatUnit(val, unit = '') {
  if (val === null || val === undefined || isNaN(Number(val))) {
    return '--';
  }
  return `${val} ${unit}`.trim();
}


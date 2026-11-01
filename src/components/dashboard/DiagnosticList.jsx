import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';
import { Stethoscope } from 'lucide-react';

/**
 * @component DiagnosticList
 * Clinical diagnostic history table showing active and resolved conditions.
 *
 * @param {Object} props
 * @param {Array} props.diagnostics - List of diagnostic items
 */
export function DiagnosticList({ diagnostics = [] }) {
  const getSeverityVariant = (severity = '') => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'danger';
      case 'moderate':
        return 'warning';
      case 'mild':
        return 'info';
      case 'low':
      case 'resolved':
      default:
        return 'neutral';
    }
  };

  const getStatusVariant = (status = '') => {
    if (status.includes('Active')) return 'warning';
    if (status.includes('Observation')) return 'info';
    if (status.includes('Resolved')) return 'success';
    return 'neutral';
  };

  return (
    <Card
      title="Diagnostic History"
      subtitle="Current clinical problems, observations, and resolved diagnoses"
      headerAction={<Badge variant="neutral">{diagnostics.length} Entries</Badge>}
    >
      <div className="table-container">
        <table className="clinical-table" aria-label="Patient Diagnostic History">
          <thead>
            <tr>
              <th scope="col">Problem / Diagnosis</th>
              <th scope="col">Status</th>
              <th scope="col">Severity</th>
              <th scope="col">Diagnosed Date</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.length > 0 ? (
              diagnostics.map((diag) => (
                <tr key={diag.id}>
                  <td>
                    <div className="problem-name">{diag.problem}</div>
                    <div className="problem-desc">{diag.description}</div>
                  </td>
                  <td>
                    <Badge variant={getStatusVariant(diag.status)}>{diag.status}</Badge>
                  </td>
                  <td>
                    <Badge variant={getSeverityVariant(diag.severity)}>{diag.severity}</Badge>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                    {formatDate(diag.diagnosedDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)' }}>
                  No historical diagnostic records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}


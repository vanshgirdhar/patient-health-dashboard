import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';
import { Download, FileText, CheckCircle } from 'lucide-react';

/**
 * @component LabResultsCard
 * Displays recent laboratory reports, test dates, and clinical result values.
 *
 * @param {Object} props
 * @param {Array} props.labResults
 */
export function LabResultsCard({ labResults = [] }) {
  const handleDownload = (e, testName) => {
    e.preventDefault();
    alert(`Downloading verified clinical PDF report: "${testName}"`);
  };

  return (
    <Card
      title="Laboratory Reports"
      subtitle="Diagnostic pathology panels & verified clinical results"
      headerAction={<Badge variant="neutral">{labResults.length} Reports</Badge>}
    >
      <div className="lab-results-list">
        {labResults.length > 0 ? (
          labResults.map((lab) => (
            <div key={lab.id} className="lab-item">
              <div className="lab-item__info">
                <div className="lab-item__name">{lab.testName}</div>
                <div className="lab-item__date">
                  {formatDate(lab.date)} &bull; {lab.category} &bull;{' '}
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    {lab.result}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge variant={lab.status === 'Normal' ? 'success' : 'info'}>
                  {lab.status}
                </Badge>
                <button
                  type="button"
                  className="lab-item__download-btn"
                  onClick={(e) => handleDownload(e, lab.testName)}
                  title={`Download PDF report for ${lab.testName}`}
                  aria-label={`Download PDF report for ${lab.testName}`}
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-muted)' }}>
            No laboratory reports recorded.
          </div>
        )}
      </div>
    </Card>
  );
}


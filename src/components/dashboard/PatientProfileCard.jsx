import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDate, formatPhoneNumber } from '../../utils/formatters';
import {
  Calendar,
  Phone,
  ShieldCheck,
  AlertTriangle,
  User,
  Heart,
  Mail,
  Download
} from 'lucide-react';

/**
 * @component PatientProfileCard
 * Comprehensive patient clinical profile, demographics, emergency contacts,
 * and insurance details.
 *
 * @param {Object} props
 * @param {Object} props.patient - Full patient model from API
 */
export function PatientProfileCard({ patient }) {
  if (!patient) return null;

  return (
    <Card className="patient-profile-card">
      {/* Avatar & Status */}
      <div className="patient-avatar-wrapper">
        <img
          src={patient.avatar}
          alt={patient.name}
          className="patient-avatar-img"
        />
        <span className="patient-avatar-status" title="Active in-patient monitoring" />
      </div>

      <h3 className="patient-name-title">{patient.name}</h3>
      <p className="patient-demographics-badge">
        {patient.gender} &bull; {patient.age} yrs &bull; Blood: <strong>{patient.bloodType}</strong>
      </p>

      {/* Demographics & Clinical Information List */}
      <div className="patient-details-list">
        {/* Date of Birth */}
        <div className="patient-detail-item">
          <div className="patient-detail-icon">
            <Calendar size={18} />
          </div>
          <div className="patient-detail-content">
            <span className="patient-detail-label">Date of Birth</span>
            <span className="patient-detail-value">{formatDate(patient.dateOfBirth)}</span>
          </div>
        </div>

        {/* Contact Phone */}
        <div className="patient-detail-item">
          <div className="patient-detail-icon">
            <Phone size={18} />
          </div>
          <div className="patient-detail-content">
            <span className="patient-detail-label">Contact Phone</span>
            <span className="patient-detail-value">{formatPhoneNumber(patient.phone)}</span>
          </div>
        </div>

        {/* Emergency Contact */}
        {patient.emergencyContact && (
          <div className="patient-detail-item">
            <div className="patient-detail-icon">
              <User size={18} />
            </div>
            <div className="patient-detail-content">
              <span className="patient-detail-label">
                Emergency Contact ({patient.emergencyContact.relationship})
              </span>
              <span className="patient-detail-value">
                {patient.emergencyContact.name} &bull;{' '}
                {formatPhoneNumber(patient.emergencyContact.phone)}
              </span>
            </div>
          </div>
        )}

        {/* Insurance */}
        {patient.insurance && (
          <div className="patient-detail-item">
            <div className="patient-detail-icon">
              <ShieldCheck size={18} />
            </div>
            <div className="patient-detail-content">
              <span className="patient-detail-label">Insurance Provider</span>
              <span className="patient-detail-value">
                {patient.insurance.provider} (Policy #{patient.insurance.policyNumber})
              </span>
            </div>
          </div>
        )}

        {/* Clinical Allergies */}
        <div className="patient-detail-item">
          <div className="patient-detail-icon" style={{ color: 'var(--color-danger)' }}>
            <AlertTriangle size={18} />
          </div>
          <div className="patient-detail-content">
            <span className="patient-detail-label">Clinical Allergies</span>
            <div className="allergies-container">
              {patient.allergies && patient.allergies.length > 0 ? (
                patient.allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="danger">
                    {allergy}
                  </Badge>
                ))
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  No known allergies (NKDA)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="ui-btn ui-btn-primary"
        style={{ width: '100%' }}
        onClick={() => alert(`Exporting electronic medical summary for ${patient.name}...`)}
      >
        <Download size={16} />
        <span>Export Clinical EHR Summary</span>
      </button>
    </Card>
  );
}


/**
 * @file mockData.js
 * Synthetic educational patient data model simulating a comprehensive Electronic Health Record (EHR).
 * All data here is completely synthetic for educational purposes.
 */

export const SYNTHETIC_PATIENT_DATABASE = {
  'pat_001': {
    id: 'pat_001',
    name: 'Vansh Girdhar',
    gender: 'Male',
    age: 42,
    dateOfBirth: '1984-12-14',
    phone: '5552345678',
    email: 'subham.mishra@example-health.org',
    bloodType: 'O+',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
    emergencyContact: {
      name: 'Mark Taylor',
      relationship: 'Spouse',
      phone: '5559876543'
    },
    insurance: {
      provider: 'Sunrise Health Prime',
      policyNumber: 'SHP-90218-A',
      groupNumber: 'GRP-4402',
      status: 'Active'
    },
    primaryPhysician: {
      name: 'Dr. Marcus Vance, MD',
      specialty: 'Cardiovascular Medicine',
      hospital: 'Saint Jude Memorial Health'
    },
    allergies: ['Penicillin', 'Sulfa-based compounds', 'Latex (Mild)'],

    // Real-time Vitals snapshot
    vitals: {
      respiratoryRate: {
        value: 20,
        unit: 'bpm',
        status: 'Normal',
        trend: 'steady',
        normalRange: '12 - 20 bpm'
      },
      temperature: {
        value: 98.6,
        unit: '°F',
        status: 'Normal',
        trend: 'steady',
        normalRange: '97.8 - 99.1 °F'
      },
      heartRate: {
        value: 78,
        unit: 'bpm',
        status: 'Lower than Average',
        trend: 'down',
        normalRange: '60 - 100 bpm'
      },
      oxygenSaturation: {
        value: 98,
        unit: '%',
        status: 'Optimal',
        trend: 'up',
        normalRange: '95 - 100%'
      }
    },

    // Yearly & Historical Blood Pressure Observations (last 12 months)
    bloodPressureHistory: [
      { date: '2025-11-01', month: 'Nov 2025', systolic: 120, diastolic: 80, pulse: 74, notes: 'Routine checkup' },
      { date: '2025-12-05', month: 'Dec 2025', systolic: 118, diastolic: 78, pulse: 72, notes: 'Normal maintenance' },
      { date: '2026-01-12', month: 'Jan 2026', systolic: 124, diastolic: 82, pulse: 76, notes: 'Mild seasonal stress' },
      { date: '2026-02-18', month: 'Feb 2026', systolic: 128, diastolic: 84, pulse: 80, notes: 'Dietary sodium fluctuation' },
      { date: '2026-03-22', month: 'Mar 2026', systolic: 122, diastolic: 80, pulse: 75, notes: 'Post-medication adjustment' },
      { date: '2026-04-14', month: 'Apr 2026', systolic: 130, diastolic: 85, pulse: 82, notes: 'Stage 1 observation spike' },
      { date: '2026-05-19', month: 'May 2026', systolic: 126, diastolic: 82, pulse: 77, notes: 'Responding to dosage' },
      { date: '2026-06-25', month: 'Jun 2026', systolic: 124, diastolic: 81, pulse: 74, notes: 'Cardio training commenced' },
      { date: '2026-07-30', month: 'Jul 2026', systolic: 128, diastolic: 83, pulse: 79, notes: 'Warm season hydration check' },
      { date: '2026-08-15', month: 'Aug 2026', systolic: 132, diastolic: 86, pulse: 84, notes: 'Travel fatigue' },
      { date: '2026-09-20', month: 'Sep 2026', systolic: 125, diastolic: 80, pulse: 76, notes: 'Regulated stability' },
      { date: '2026-10-28', month: 'Oct 2026', systolic: 121, diastolic: 79, pulse: 73, notes: 'Latest clinical observation' }
    ],

    // Yearly Health Statistics
    yearlyStats: {
      averageSystolic: 124.8,
      averageDiastolic: 81.6,
      highestSystolic: 132,
      lowestSystolic: 118,
      recordedVisits: 12,
      vitalsStabilityIndex: 94, // percent
      medicationAdherence: 98, // percent
      healthScore: 'A (Managed)'
    },

    // Diagnostic List
    diagnostics: [
      {
        id: 'diag-001',
        problem: 'Hypertension Stage 1',
        description: 'Chronic vascular pressure requiring sodium reduction & daily low-dose ACE inhibitor',
        status: 'Active / Under Care',
        severity: 'Moderate',
        diagnosedDate: '2023-04-12'
      },
      {
        id: 'diag-002',
        problem: 'Type 2 Diabetes Screening',
        description: 'Mild insulin resistance indicator in annual blood panel; dietary regulation active',
        status: 'Under Observation',
        severity: 'Mild',
        diagnosedDate: '2024-01-18'
      },
      {
        id: 'diag-003',
        problem: 'Seasonal Allergic Rhinitis',
        description: 'Pollen and seasonal allergen sensitivity managed with over-the-counter antihistamine',
        status: 'Resolved',
        severity: 'Low',
        diagnosedDate: '2022-09-05'
      },
      {
        id: 'diag-004',
        problem: 'Post-Exercise Musculoskeletal Strain',
        description: 'Lower lumbar tension following sports routine; physical therapy completed',
        status: 'Resolved',
        severity: 'Low',
        diagnosedDate: '2025-06-11'
      }
    ],

    // Lab Results & Historical Records
    labResults: [
      {
        id: 'lab-001',
        testName: 'Fasting Blood Glucose',
        date: '2026-10-15',
        result: '94 mg/dL',
        normalRange: '70 - 99 mg/dL',
        status: 'Normal',
        category: 'Endocrinology'
      },
      {
        id: 'lab-002',
        testName: 'Lipid Panel (Total Cholesterol)',
        date: '2026-09-22',
        result: '186 mg/dL',
        normalRange: '< 200 mg/dL',
        status: 'Normal',
        category: 'Cardiology'
      },
      {
        id: 'lab-003',
        testName: 'Comprehensive Metabolic Panel (CMP)',
        date: '2026-08-11',
        result: 'Balanced electrolytes & kidney markers',
        normalRange: 'Standard',
        status: 'Normal',
        category: 'Biochemistry'
      },
      {
        id: 'lab-004',
        testName: 'Complete Blood Count (CBC)',
        date: '2026-05-18',
        result: 'WBC 6.5, RBC 4.7, Platelets 250k',
        normalRange: 'Standard',
        status: 'Normal',
        category: 'Hematology'
      },
      {
        id: 'lab-005',
        testName: 'Urinalysis Microalbumin',
        date: '2026-03-02',
        result: '< 30 mg/g',
        normalRange: '< 30 mg/g',
        status: 'Normal',
        category: 'Nephrology'
      }
    ]
  }
};


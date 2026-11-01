import { patientService } from '../src/services/patientService.js';
import { setSimulateError } from '../src/services/api.js';
import { classifyBloodPressure } from '../src/utils/healthCalculators.js';

async function runVerification() {
  console.log('🧪 Starting Quality Assurance verification...');

  // 1. Verify Patient Record Fetching
  const patient = await patientService.getPatient('pat_001');
  if (!patient || patient.name !== 'Vansh Girdhar') {
    throw new Error('Patient record verification failed!');
  }
  console.log('✅ Patient fetch succeeded:', patient.name);

  // 2. Verify Blood Pressure 6M Filter
  const bp6m = await patientService.getBloodPressureHistory('pat_001', '6m');
  if (bp6m.records.length !== 6) {
    throw new Error(`Expected 6 records for 6m, got ${bp6m.records.length}`);
  }
  console.log('✅ BP 6-Month filter succeeded, count:', bp6m.records.length);

  // 3. Verify Blood Pressure 1Y Filter
  const bp1y = await patientService.getBloodPressureHistory('pat_001', '1y');
  if (bp1y.records.length !== 12) {
    throw new Error(`Expected 12 records for 1y, got ${bp1y.records.length}`);
  }
  console.log('✅ BP 1-Year filter succeeded, count:', bp1y.records.length);

  // 4. Verify Clinical Classification
  const normalCheck = classifyBloodPressure(118, 78);
  if (normalCheck.category !== 'Normal') {
    throw new Error(`Expected Normal, got ${normalCheck.category}`);
  }
  const elevatedCheck = classifyBloodPressure(125, 78);
  if (elevatedCheck.category !== 'Elevated') {
    throw new Error(`Expected Elevated, got ${elevatedCheck.category}`);
  }
  console.log('✅ Clinical AHA blood pressure classifier verified');

  // 5. Verify Error Simulation
  setSimulateError(true);
  try {
    await patientService.getPatient('pat_001');
    throw new Error('Expected simulated error, but call succeeded!');
  } catch (err) {
    if (err.message.includes('503') || err.message.includes('Unavailable')) {
      console.log('✅ Simulated error boundary verified:', err.message);
    } else {
      throw err;
    }
  } finally {
    setSimulateError(false);
  }

  console.log('🎉 All QA tests passed successfully!');
}

runVerification().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});


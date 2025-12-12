// Cattle health vital sign simulator

// Normal ranges for cattle health parameters
export const healthRanges = {
  temperature: { min: 38, max: 39, alertLow: 36.5, alertHigh: 39 },
  heartRate: { min: 40, max: 100, alertHigh: 100 },
  breathingRate: { min: 10, max: 30, alertLow: 10, alertHigh: 30 },
  rumenMovement: { min: 2, max: 3, alertLow: 1.5 },
  heatIndex: { alertThreshold: 0.9 },
};

// Generate random value within range
const randomInRange = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

// Generate realistic vital signs with occasional anomalies
export const generateVitals = () => {
  // 80% chance of normal values, 20% chance of abnormal
  const isAbnormal = Math.random() < 0.2;
  
  let temperature, heartRate, breathingRate, rumenMovement, heatIndex;
  
  if (isAbnormal) {
    // Generate abnormal values
    const anomalyType = Math.floor(Math.random() * 5);
    
    switch(anomalyType) {
      case 0: // High temperature
        temperature = randomInRange(39.1, 41);
        heartRate = randomInRange(40, 100);
        breathingRate = randomInRange(10, 30);
        rumenMovement = randomInRange(2, 3);
        heatIndex = randomInRange(0, 0.8);
        break;
      case 1: // Low temperature
        temperature = randomInRange(35, 36.4);
        heartRate = randomInRange(40, 100);
        breathingRate = randomInRange(10, 30);
        rumenMovement = randomInRange(2, 3);
        heatIndex = randomInRange(0, 0.8);
        break;
      case 2: // High heart rate
        temperature = randomInRange(38, 39);
        heartRate = randomInRange(101, 130);
        breathingRate = randomInRange(10, 30);
        rumenMovement = randomInRange(2, 3);
        heatIndex = randomInRange(0, 0.8);
        break;
      case 3: // Abnormal breathing
        temperature = randomInRange(38, 39);
        heartRate = randomInRange(40, 100);
        breathingRate = Math.random() < 0.5 ? randomInRange(5, 9) : randomInRange(31, 40);
        rumenMovement = randomInRange(2, 3);
        heatIndex = randomInRange(0, 0.8);
        break;
      case 4: // Heat/Estrus
        temperature = randomInRange(38, 39);
        heartRate = randomInRange(40, 100);
        breathingRate = randomInRange(10, 30);
        rumenMovement = randomInRange(2, 3);
        heatIndex = randomInRange(0.9, 1);
        break;
      default:
        // Low rumen movement
        temperature = randomInRange(38, 39);
        heartRate = randomInRange(40, 100);
        breathingRate = randomInRange(10, 30);
        rumenMovement = randomInRange(0.5, 1.4);
        heatIndex = randomInRange(0, 0.8);
    }
  } else {
    // Generate normal values
    temperature = randomInRange(38, 39);
    heartRate = randomInRange(40, 100);
    breathingRate = randomInRange(10, 30);
    rumenMovement = randomInRange(2, 3);
    heatIndex = randomInRange(0, 0.8);
  }
  
  // Random vaccination due (5% chance)
  const vaccinationDue = Math.random() < 0.05;
  
  return {
    temperature,
    heartRate,
    breathingRate,
    rumenMovement,
    heatIndex,
    vaccinationDue,
    timestamp: new Date().toISOString(),
  };
};

// Detect alerts based on vital signs
export const detectAlerts = (vitals) => {
  const alerts = [];
  
  // Temperature alerts
  if (vitals.temperature > healthRanges.temperature.alertHigh) {
    alerts.push({
      type: 'temperature',
      severity: 'high',
      message: `High Temperature: ${vitals.temperature}°C (Normal: 38-39°C)`,
      value: vitals.temperature,
    });
  } else if (vitals.temperature < healthRanges.temperature.alertLow) {
    alerts.push({
      type: 'temperature',
      severity: 'high',
      message: `Low Temperature: ${vitals.temperature}°C (Normal: 38-39°C)`,
      value: vitals.temperature,
    });
  }
  
  // Heart rate alerts
  if (vitals.heartRate > 110) {
    alerts.push({
      type: 'heartRate',
      severity: 'medium',
      message: `High Heart Rate: ${vitals.heartRate} bpm (Normal: 40-100 bpm)`,
      value: vitals.heartRate,
    });
  }
  
  // Breathing rate alerts
  if (vitals.breathingRate < 10 || vitals.breathingRate > 30) {
    alerts.push({
      type: 'breathingRate',
      severity: 'high',
      message: `Abnormal Breathing Rate: ${vitals.breathingRate} breaths/min (Normal: 10-30)`,
      value: vitals.breathingRate,
    });
  }
  
  // Rumen movement alerts
  if (vitals.rumenMovement < healthRanges.rumenMovement.alertLow) {
    alerts.push({
      type: 'rumenMovement',
      severity: 'medium',
      message: `Low Rumen Movement: ${vitals.rumenMovement} cycles/min (Normal: 2-3)`,
      value: vitals.rumenMovement,
    });
  }
  
  // Heat/Estrus alerts
  if (vitals.heatIndex > healthRanges.heatIndex.alertThreshold) {
    alerts.push({
      type: 'heat',
      severity: 'info',
      message: `High Heat (Estrus): Index ${vitals.heatIndex} - Breeding opportunity detected`,
      value: vitals.heatIndex,
    });
  }
  
  // Vaccination alerts
  if (vitals.vaccinationDue) {
    alerts.push({
      type: 'vaccination',
      severity: 'medium',
      message: 'Vaccination Due: Schedule a vet visit',
      value: true,
    });
  }
  
  return alerts;
};

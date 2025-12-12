// LocalStorage utilities for managing app data

export const storageKeys = {
  FARMER: 'cattle_farmer',
  COWS: 'cattle_cows',
  ALERTS: 'cattle_alerts',
};

// Farmer operations
export const getFarmer = () => {
  if (typeof window === 'undefined') return null;
  const farmer = localStorage.getItem(storageKeys.FARMER);
  return farmer ? JSON.parse(farmer) : null;
};

export const setFarmer = (name) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(storageKeys.FARMER, JSON.stringify({ name, loginDate: new Date().toISOString() }));
};

export const clearFarmer = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(storageKeys.FARMER);
};

// Cow operations
export const getCows = () => {
  if (typeof window === 'undefined') return [];
  const cows = localStorage.getItem(storageKeys.COWS);
  return cows ? JSON.parse(cows) : [];
};

export const addCow = (cow) => {
  const cows = getCows();
  const newCow = {
    id: Date.now().toString(),
    ...cow,
    createdAt: new Date().toISOString(),
  };
  cows.push(newCow);
  localStorage.setItem(storageKeys.COWS, JSON.stringify(cows));
  return newCow;
};

export const deleteCow = (id) => {
  const cows = getCows();
  const filtered = cows.filter(cow => cow.id !== id);
  localStorage.setItem(storageKeys.COWS, JSON.stringify(filtered));
};

export const updateCow = (id, updates) => {
  const cows = getCows();
  const updated = cows.map(cow => cow.id === id ? { ...cow, ...updates } : cow);
  localStorage.setItem(storageKeys.COWS, JSON.stringify(updated));
};

// Alert operations
export const getAlerts = () => {
  if (typeof window === 'undefined') return [];
  const alerts = localStorage.getItem(storageKeys.ALERTS);
  return alerts ? JSON.parse(alerts) : [];
};

export const addAlert = (alert) => {
  const alerts = getAlerts();
  const newAlert = {
    id: Date.now().toString(),
    ...alert,
    timestamp: new Date().toISOString(),
    read: false,
  };
  alerts.unshift(newAlert);
  // Keep only last 50 alerts
  if (alerts.length > 50) alerts.pop();
  localStorage.setItem(storageKeys.ALERTS, JSON.stringify(alerts));
  return newAlert;
};

export const clearAlerts = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(storageKeys.ALERTS, JSON.stringify([]));
};

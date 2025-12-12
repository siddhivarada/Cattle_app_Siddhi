'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmer, clearFarmer, getCows, addCow, deleteCow } from '@/lib/storage';
import { generateVitals, detectAlerts } from '@/lib/simulator';
import { requestNotificationPermission, showBrowserNotification, registerServiceWorker } from '@/lib/notifications';
import CowCard from '@/components/CowCard';
import AddCowForm from '@/components/AddCowForm';
import AlertNotification from '@/components/AlertNotification';
import HealthMonitor from '@/components/HealthMonitor';
import { LogOut, Bell, BellOff, Activity } from 'lucide-react';

export default function DashboardPage() {
  const [farmer, setFarmerState] = useState(null);
  const [cows, setCows] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [latestVitals, setLatestVitals] = useState({});
  const [selectedCow, setSelectedCow] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(true);
  const [simulatorError, setSimulatorError] = useState(null);
  const router = useRouter();
  
  // Initialize app
  useEffect(() => {
    const farmerData = getFarmer();
    if (!farmerData) {
      router.push('/');
      return;
    }
    
    setFarmerState(farmerData);
    setCows(getCows());
    
    // Request notification permission
    requestNotificationPermission().then(permission => {
      setNotificationsEnabled(permission === 'granted');
    });
    
    // Register service worker
    registerServiceWorker();
  }, [router]);
  
  // Simulator loop
  useEffect(() => {
    if (!isSimulatorRunning || cows.length === 0) return;
    
    const runSimulation = () => {
      try {
        if (!cows || cows.length === 0) {
          return;
        }

        // Pick a random cow
        const randomCow = cows[Math.floor(Math.random() * cows.length)];
        
        if (!randomCow || !randomCow.id) {
          console.error('Invalid cow data');
          return;
        }
        
        // Generate vitals
        const vitals = generateVitals();
        
        if (!vitals) {
          console.error('Failed to generate vitals');
          return;
        }
        
        // Update latest vitals for this cow
        setLatestVitals(prev => ({
          ...prev,
          [randomCow.id]: vitals,
        }));
        
        // Detect alerts
        const detectedAlerts = detectAlerts(vitals);
        
        // Add alerts to state and show notifications
        if (Array.isArray(detectedAlerts)) {
          detectedAlerts.forEach(alert => {
            const alertWithCow = {
              ...alert,
              cowId: randomCow.id,
              cowName: randomCow.name,
              timestamp: new Date().toISOString(),
              id: Date.now() + Math.random(),
            };
            
            setAlerts(prev => [alertWithCow, ...prev].slice(0, 50));
            
            // Show browser notification
            if (notificationsEnabled) {
              try {
                showBrowserNotification(`Alert: ${randomCow.name}`, {
                  body: alert.message,
                  tag: `alert-${randomCow.id}-${alert.type}`,
                });
              } catch (err) {
                console.warn('Failed to show notification:', err);
              }
            }
          });
        }
        
        setSimulatorError(null);
      } catch (error) {
        console.error('Simulator error:', error);
        setSimulatorError(error.message);
      }
    };
    
    // Run simulation every 3-5 seconds
    const getRandomInterval = () => 3000 + Math.random() * 2000;
    
    let timeoutId;
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        runSimulation();
        scheduleNext();
      }, getRandomInterval());
    };
    
    if (isSimulatorRunning) {
      scheduleNext();
    }
    
    return () => clearTimeout(timeoutId);
  }, [cows, isSimulatorRunning, notificationsEnabled]);
  
  const handleAddCow = (cowData) => {
    try {
      const newCow = addCow(cowData);
      setCows(getCows());
    } catch (error) {
      console.error('Error adding cow:', error);
      alert('Failed to add cow. Please try again.');
    }
  };
  
  const handleDeleteCow = (id) => {
    try {
      if (confirm('Are you sure you want to delete this cow?')) {
        deleteCow(id);
        setCows(getCows());
        if (selectedCow?.id === id) {
          setSelectedCow(null);
        }
      }
    } catch (error) {
      console.error('Error deleting cow:', error);
      alert('Failed to delete cow. Please try again.');
    }
  };
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      clearFarmer();
      router.push('/');
    }
  };
  
  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };
  
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await requestNotificationPermission();
      setNotificationsEnabled(permission === 'granted');
    } else {
      alert('To disable notifications, please change your browser settings.');
    }
  };
  
  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cattle Health Monitor</h1>
              <p className="text-sm text-gray-600">Welcome, {farmer.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleNotifications}
                className={`p-2 rounded-lg transition-all font-medium flex items-center gap-2 px-3 py-2 ${
                  notificationsEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={notificationsEnabled ? 'Notifications enabled' : 'Enable notifications'}
              >
                {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                <span className="text-sm hidden sm:inline">{notificationsEnabled ? 'Notifications' : 'Notify'}</span>
              </button>
              <button
                onClick={() => setIsSimulatorRunning(!isSimulatorRunning)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shadow-sm ${
                  isSimulatorRunning
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Activity size={20} />
                {isSimulatorRunning ? 'Simulator ON' : 'Simulator OFF'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {simulatorError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>⚠️ Simulator error: {simulatorError}</span>
            <button
              onClick={() => setSimulatorError(null)}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm font-medium">Total Cattle</div>
                <div className="text-4xl font-bold text-green-600 mt-2">{cows.length}</div>
              </div>
              <div className="text-5xl opacity-20">🐄</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm font-medium">Active Alerts</div>
                <div className="text-4xl font-bold text-red-600 mt-2">{alerts.length}</div>
              </div>
              <div className="text-5xl opacity-20">⚠️</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm font-medium">Monitored Today</div>
                <div className="text-4xl font-bold text-blue-600 mt-2">{Object.keys(latestVitals).length}</div>
              </div>
              <div className="text-5xl opacity-20">📊</div>
            </div>
          </div>
        </div>
        
        {/* Add Cow Form */}
        <AddCowForm onAdd={handleAddCow} />
        
        {/* Selected Cow Health Monitor */}
        {selectedCow && latestVitals[selectedCow.id] && (
          <div className="mb-8">
            <HealthMonitor
              vitals={latestVitals[selectedCow.id]}
              cowName={selectedCow.name}
            />
          </div>
        )}
        
        {/* Cow Cards */}
        {cows.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Herd</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cows.map(cow => (
                <div
                  key={cow.id}
                  onClick={() => setSelectedCow(cow)}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <CowCard
                    cow={cow}
                    onDelete={handleDeleteCow}
                    latestVitals={latestVitals[cow.id]}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="text-gray-400 text-6xl mb-4">🐄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Cattle Added Yet
            </h3>
            <p className="text-gray-600">
              Click "Add New Cow" above to start monitoring your herd
            </p>
          </div>
        )}
      </main>
      
      {/* Alert Notifications */}
      <div className="fixed bottom-4 right-4 space-y-3 max-w-md z-50">
        {alerts.map(alert => (
          <AlertNotification
            key={alert.id}
            alert={alert}
            onDismiss={handleDismissAlert}
          />
        ))}
      </div>
    </div>
  );
}

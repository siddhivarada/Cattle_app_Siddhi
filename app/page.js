'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmer, setFarmer } from '@/lib/storage';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Check if farmer is already logged in
    const farmer = getFarmer();
    if (farmer) {
      router.push('/dashboard');
    }
  }, [router]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setFarmer(name.trim());
      router.push('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
              <span className="text-5xl">🐄</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Cattle Health Monitor
            </h1>
            <p className="text-gray-600">
              Real-time health monitoring for your herd
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farmer Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <LogIn size={20} />
              Login to Dashboard
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-semibold">Features:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Real-time health monitoring</li>
                <li>Instant alerts for anomalies</li>
                <li>Track multiple cattle</li>
                <li>Health history & analytics</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Powered by Smart Collar Technology</p>
          <p className="text-xs mt-1">(Simulator Mode - Demo Version)</p>
        </div>
      </div>
    </div>
  );
}

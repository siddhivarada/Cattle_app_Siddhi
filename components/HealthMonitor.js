'use client';

import { Activity, Heart, Wind, Droplets, Flame, Syringe } from 'lucide-react';

export default function HealthMonitor({ vitals, cowName }) {
  if (!vitals) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Health Parameters</h3>
        <p className="text-gray-500 text-center py-4">No vitals data available</p>
      </div>
    );
  }
  
  const getStatusColor = (type, value) => {
    switch (type) {
      case 'temperature':
        if (value > 39 || value < 36.5) return 'text-red-600 bg-red-50';
        return 'text-green-600 bg-green-50';
      case 'heartRate':
        if (value > 110) return 'text-red-600 bg-red-50';
        return 'text-green-600 bg-green-50';
      case 'breathingRate':
        if (value < 10 || value > 30) return 'text-red-600 bg-red-50';
        return 'text-green-600 bg-green-50';
      case 'rumenMovement':
        if (value < 1.5) return 'text-red-600 bg-red-50';
        return 'text-green-600 bg-green-50';
      case 'heatIndex':
        if (value > 0.9) return 'text-blue-600 bg-blue-50';
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  
  const parameters = [
    {
      icon: <Activity size={24} />,
      label: 'Body Temperature',
      value: `${vitals.temperature}°C`,
      normal: '38-39°C',
      type: 'temperature',
      actualValue: vitals.temperature,
    },
    {
      icon: <Heart size={24} />,
      label: 'Heart Rate',
      value: `${vitals.heartRate} bpm`,
      normal: '40-100 bpm',
      type: 'heartRate',
      actualValue: vitals.heartRate,
    },
    {
      icon: <Wind size={24} />,
      label: 'Breathing Rate',
      value: `${vitals.breathingRate}/min`,
      normal: '10-30/min',
      type: 'breathingRate',
      actualValue: vitals.breathingRate,
    },
    {
      icon: <Droplets size={24} />,
      label: 'Rumen Movement',
      value: `${vitals.rumenMovement}/min`,
      normal: '2-3/min',
      type: 'rumenMovement',
      actualValue: vitals.rumenMovement,
    },
    {
      icon: <Flame size={24} />,
      label: 'Heat Index',
      value: vitals.heatIndex.toFixed(2),
      normal: '<0.9',
      type: 'heatIndex',
      actualValue: vitals.heatIndex,
    },
    {
      icon: <Syringe size={24} />,
      label: 'Vaccination',
      value: vitals.vaccinationDue ? 'DUE' : 'Up to date',
      normal: 'No action needed',
      type: 'vaccination',
      actualValue: vitals.vaccinationDue,
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Health Parameters - {cowName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parameters.map((param, index) => (
          <div
            key={index}
            className={`p-4 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-green-300 transition-all ${getStatusColor(param.type, param.actualValue)}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="opacity-75">
                {param.icon}
              </div>
              <div className="text-sm font-medium flex-1">{param.label}</div>
            </div>
            <div className={`text-2xl font-bold`}>
              {param.value}
            </div>
            <div className="text-xs opacity-75 mt-1">Normal: {param.normal}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">
        Last updated: {new Date(vitals.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

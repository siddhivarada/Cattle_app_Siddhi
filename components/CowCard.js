'use client';

import { Trash2, Calendar, Tag, Activity } from 'lucide-react';

export default function CowCard({ cow, onDelete, latestVitals }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  const getHealthStatus = (vitals) => {
    if (!vitals) return { status: 'Unknown', color: 'bg-gray-500', textColor: 'text-gray-700' };
    
    // Check for any critical values
    if (vitals.temperature > 39 || vitals.temperature < 36.5) {
      return { status: 'Critical', color: 'bg-red-500', textColor: 'text-red-700' };
    }
    if (vitals.heartRate > 110 || vitals.breathingRate < 10 || vitals.breathingRate > 30 || vitals.rumenMovement < 1.5) {
      return { status: 'Warning', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    }
    return { status: 'Healthy', color: 'bg-green-500', textColor: 'text-green-700' };
  };
  
  const healthStatus = getHealthStatus(latestVitals);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-400">
      <div className="relative h-48 bg-gray-200">
        <img
          src={cow.imageUrl || '/cow-default.jpg'}
          alt={cow.name || 'Cow image'}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Replace broken images with a known good fallback
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/cow-default.jpg';
          }}
        />
        <div className={`absolute top-2 right-2 ${healthStatus.color} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
          {healthStatus.status}
        </div>
        <div className={`absolute top-2 left-2 ${healthStatus.textColor} bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold`}>
          {cow.name}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{cow.tagId}</h3>
          </div>
          <button
            onClick={() => onDelete(cow.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition-all"
            aria-label="Delete cow"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-600" />
            <span><strong>DOB:</strong> {formatDate(cow.dateOfBirth)}</span>
          </div>
          
          {cow.notes && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs border-l-2 border-green-400">
              <strong>Notes:</strong> {cow.notes}
            </div>
          )}
        </div>
        
        {latestVitals && (
          <div className="mt-4 pt-4 border-t-2 border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-gray-800">Latest Vitals</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded border-l-2 border-blue-400">
                <div className="text-gray-600">Temp</div>
                <div className="font-bold text-blue-700">{latestVitals.temperature}°C</div>
              </div>
              <div className="bg-pink-50 p-2 rounded border-l-2 border-pink-400">
                <div className="text-gray-600">HR</div>
                <div className="font-bold text-pink-700">{latestVitals.heartRate} bpm</div>
              </div>
              <div className="bg-orange-50 p-2 rounded border-l-2 border-orange-400">
                <div className="text-gray-600">BR</div>
                <div className="font-bold text-orange-700">{latestVitals.breathingRate}/min</div>
              </div>
              <div className="bg-purple-50 p-2 rounded border-l-2 border-purple-400">
                <div className="text-gray-600">Rumen</div>
                <div className="font-bold text-purple-700">{latestVitals.rumenMovement}/min</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

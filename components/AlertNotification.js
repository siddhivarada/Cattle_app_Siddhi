'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

export default function AlertNotification({ alert, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onDismiss(alert.id);
      }, 300);
    }, 10000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [alert.id, onDismiss]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss(alert.id);
    }, 300);
  };
  
  const getSeverityStyles = () => {
    switch (alert.severity) {
      case 'high':
        return 'bg-red-500 border-red-600';
      case 'medium':
        return 'bg-yellow-500 border-yellow-600';
      case 'info':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };
  
  const getIcon = () => {
    if (alert.severity === 'info') {
      return <Info size={20} />;
    }
    return <AlertTriangle size={20} />;
  };
  
  return (
    <div
      className={`${getSeverityStyles()} text-white p-4 rounded-lg shadow-lg border-l-4 flex items-start gap-3 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm mb-1">{alert.cowName}</div>
        <div className="text-sm">{alert.message}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs opacity-80">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </div>
          <div className="text-xs opacity-75 font-medium">
            {timeLeft}s
          </div>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
        aria-label="Dismiss alert"
      >
        <X size={18} />
      </button>
    </div>
  );
}

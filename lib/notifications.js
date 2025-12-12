// Browser notification utilities

export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }
  
  return Notification.permission;
};

export const showBrowserNotification = (title, options = {}) => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return;
  }
  
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icon-192.svg',
      badge: '/icon-192.svg',
      requireInteraction: false,
      ...options,
    });
    
    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
    
    return notification;
  }
};

export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

import React, { useState, useEffect, useRef } from 'react';

export default function DriverDashboard() {
  // Tracking state
  const [isTracking, setIsTracking] = useState(false);
  const [driverInfo] = useState({
    driverId: 'DRV-001',
    vehicleId: 'AS-01-XX-1234',
    cargo: 'Critical Medical Supplies',
  });

  // Connectivity & Location state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    source: 'Waiting...',
    lastSyncTime: null,
  });

  const [sosActive, setSosActive] = useState(false);
  const watchIdRef = useRef(null);

  // Monitor network connectivity changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Automatically sync pending offline updates when connection is restored
      syncOfflineQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync function placeholder for offline queue
  const syncOfflineQueue = () => {
    setPendingSyncCount((prev) => {
      if (prev > 0) {
        console.log(`Syncing ${prev} cached data points to server...`);
        return 0;
      }
      return 0;
    });
  };

  // Handle trip start and Geolocation API
  const handleToggleTracking = () => {
    if (!isTracking) {
      if (!('geolocation' in navigator)) {
        alert('Geolocation is not supported by your browser.');
        return;
      }

      // Request location consent and start watching position
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const timestamp = new Date().toLocaleTimeString();

          setLocationData({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
            accuracy: `${Math.round(accuracy)} m`,
            source: 'GPS / Device Location',
            lastSyncTime: timestamp,
          });

          // If offline, increment pending records to sync later
          if (!navigator.onLine) {
            setPendingSyncCount((prev) => prev + 1);
          }
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          setLocationData((prev) => ({
            ...prev,
            source: 'Cellular / Last Known Fallback',
          }));
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );

      watchIdRef.current = id;
      setIsTracking(true);
    } else {
      // Stop tracking
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setIsTracking(false);
    }
  };

  // Trigger emergency SOS handler
  const handleTriggerSOS = () => {
    const confirmSOS = window.confirm('Send an immediate Emergency SOS alert with your last known location?');
    if (confirmSOS) {
      setSosActive(true);
      console.warn('SOS Triggered:', {
        driver: driverInfo.driverId,
        vehicle: driverInfo.vehicleId,
        location: locationData,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 flex flex-col justify-between max-w-md mx-auto border-x border-slate-800 font-sans">
      {/* Top Details & Connectivity Status */}
      <div className="space-y-4">
        <header className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <h1 className="text-lg font-bold text-indigo-400">{driverInfo.vehicleId}</h1>
            <p className="text-xs text-slate-400">Driver ID: {driverInfo.driverId}</p>
            <p className="text-xs text-slate-400">Cargo: {driverInfo.cargo}</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <span
              className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                isOnline
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}
            >
              ● {isOnline ? 'Online' : 'Offline'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              Pending Sync: <strong className="text-slate-200">{pendingSyncCount}</strong>
            </span>
          </div>
        </header>

        {/* Multi-source Positioning Card */}
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2.5 text-xs shadow">
          <h2 className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Positioning & Telemetry</h2>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Coordinates:</span>
            <span className="font-mono text-slate-200">
              {locationData.latitude ? `${locationData.latitude}°N, ${locationData.longitude}°E` : 'Not Tracking'}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Location Source:</span>
            <span className="font-semibold text-indigo-300">{locationData.source}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Accuracy Radius:</span>
            <span className="text-slate-200">{locationData.accuracy || '--'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Last Synced:</span>
            <span className="text-slate-400">{locationData.lastSyncTime || '--'}</span>
          </div>
        </section>

        {/* Hazard Alert / Risk Card */}
        <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl space-y-1 text-xs">
          <div className="font-bold text-red-300 flex items-center gap-1.5">
            <span>⚠️</span> Hazard Corridor Warning
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Approaching low cellular connectivity zone (8 km ahead). Offline route navigation has been cached to local storage.
          </p>
        </div>

        {/* SOS Confirmation Notice */}
        {sosActive && (
          <div className="p-3 bg-red-900 border border-red-600 rounded-xl text-xs text-white flex justify-between items-center">
            <span>🚨 SOS Beacon Transmitted to Command Center</span>
            <button onClick={() => setSosActive(false)} className="text-[10px] underline text-slate-200">
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <footer className="space-y-3 pt-6">
        <button
          onClick={handleToggleTracking}
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-lg ${
            isTracking
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
          }`}
        >
          {isTracking ? 'STOP / PAUSE TRACKING' : 'START TRIP & ENABLE TRACKING'}
        </button>

        <button
          onClick={handleTriggerSOS}
          className="w-full py-3 bg-red-700 hover:bg-red-600 active:scale-[0.99] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
        >
          Trigger Emergency SOS
        </button>
      </footer>
    </div>
  );
}
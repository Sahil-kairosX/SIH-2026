import React from 'react';
import "../../style.css";

export default function EmergencyDashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      {/* Emergency Header Bar */}
      <header className="flex justify-between items-center border-b border-red-900 pb-4">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-red-600 animate-ping"></span>
          <h1 className="text-xl font-black text-red-500 tracking-wider uppercase">Disaster Emergency & SOS Command</h1>
        </div>
        <div className="text-xs bg-red-950 border border-red-800 text-red-300 px-3 py-1 rounded">
          HIGH PRIORITY RESPONSE MODE
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Critical Alerts Feed */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400">Incoming SOS & High-Risk Incidents</h2>

          <div className="bg-neutral-900 border-l-4 border-red-600 p-4 rounded-r-xl border-y border-r border-neutral-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-red-400 text-sm">DRIVER SOS: AS-01-XX-1234</span>
              <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded">CRITICAL</span>
            </div>
            <p className="text-xs text-slate-300">Vehicle stranded in mudslide zone. Last estimated accuracy: ~500m via Cellular Fallback.</p>[cite: 1]
            <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-neutral-800">
              <span>Coordinates: 26.14°N, 91.73°E</span>[cite: 1]
              <button className="text-indigo-400 hover:underline">Dispatch Local Team</button>
            </div>
          </div>
        </div>

        {/* Emergency Map / Zone Display */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col">
          <div className="p-4 border-b border-neutral-800 text-xs font-semibold text-slate-300 flex justify-between">
            <span>Critical Disruption Corridors</span>
            <span>3 Units Dispatched</span>
          </div>
          <div className="flex-1 min-h-[350px] flex items-center justify-center text-slate-600 text-sm">
            [ High-Risk Overlay / Evacuation Route Map ]
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import "../../style.css";

export default function AdminDashboard() {
  const [activeVehicles] = useState([
    { id: 'DRV-001', vehicle: 'AS-01-XX-1234', cargo: 'Critical Medicine', status: 'Online', risk: 'High' },
    { id: 'DRV-002', vehicle: 'AS-01-YY-5678', cargo: 'Food Supplies', status: 'Offline', risk: 'Low' },
  ]);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-indigo-400 mb-8">LOGI-NER ADMIN</h1>
          <nav className="space-y-3 text-sm">
            <button className="w-full text-left px-3 py-2 rounded bg-indigo-600 font-medium">Fleet Overview</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-slate-300">Hazard & Weather Layers</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-slate-300">Connectivity Heatmap</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-700 text-slate-300">Reroute Approvals</button>
          </nav>
        </div>
        <div className="text-xs text-slate-500">System Status: Resilient Engine Active</div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Regional Logistics Control Center</h2>
          <div className="flex gap-4 items-center text-sm">
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs">● Live Gateway Active</span>
            <span className="text-slate-400">Admin: Controller-01</span>
          </div>
        </header>

        {/* Dynamic Panels */}
        <div className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-auto">
          {/* Map View Placeholder (2 Cols) */}
          <div className="col-span-2 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-200">GIS Fleet Tracking & Disaster Map</span>
              <div className="flex gap-2 text-xs">
                <button className="px-2 py-1 bg-slate-700 rounded text-slate-300">Disruption Layer</button>
                <button className="px-2 py-1 bg-slate-700 rounded text-slate-300">Cellular Coverage Layer</button>
              </div>
            </div>
            <div className="flex-1 bg-slate-950 flex items-center justify-center text-slate-500">
              [ Mapbox / Leaflet Integration Placeholder ]
            </div>
          </div>

          {/* Active Logistics Stream (1 Col) */}
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h3 className="font-semibold text-sm mb-3">Live Fleet Status</h3>
              <div className="space-y-3">
                {activeVehicles.map((v) => (
                  <div key={v.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-indigo-300">{v.vehicle}</span>
                      <span className={v.risk === 'High' ? 'text-red-400' : 'text-emerald-400'}>{v.risk} Risk</span>
                    </div>
                    <div className="text-slate-400">Cargo: {v.cargo}</div>
                    <div className="flex justify-between text-slate-500">
                      <span>ID: {v.id}</span>
                      <span>Status: {v.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h3 className="font-semibold text-sm mb-2 text-red-400">Active Disruption Alerts</h3>
              <p className="text-xs text-slate-400">NH-37 Landslide alert reported near Sector 4. Rerouting 3 vehicles.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
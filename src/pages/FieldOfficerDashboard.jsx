import React from 'react';

export default function FieldOfficerDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Field Operations Dashboard</h1>
          <p className="text-xs text-slate-500">Sector: Northeast Zone B (Guwahati-Shillong Corridor)</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-lg font-medium shadow">
          + Report New Road Blockage
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verification Queue */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Checkpoint Verification Queue</h2>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">Bridge Structural Alert</span>
                <h3 className="text-base font-semibold mt-1">Bridge 42B Over River Water Level High</h3>
              </div>
              <span className="text-xs text-slate-400">10 mins ago</span>
            </div>
            <p className="text-sm text-slate-600">Heavy rain leading to structural hazard. Field validation required to confirm if 10-ton supply trucks can pass.</p>
            <div className="flex gap-2 pt-2">
              <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded font-medium">Verify & Close Road</button>
              <button className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs rounded font-medium">Mark as Safe</button>
            </div>
          </div>
        </div>

        {/* Local Checkpoints & Incident Logging */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Quick Incident Log</h2>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Incident Type</label>
              <select className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50">
                <option>Landslide / Mudslide</option>
                <option>Bridge Damage</option>
                <option>Severe Waterlogging</option>
                <option>Network Blackout Zone</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Exact Coordinates / Landmark</label>
              <input type="text" placeholder="e.g., 26.14, 91.73 or KM 42" className="w-full text-xs p-2 border border-slate-300 rounded" />
            </div>
            <button className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800">
              Submit Ground Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
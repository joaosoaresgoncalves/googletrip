import React from 'react';
import { TravelPlan, DayPlan, Activity } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ItineraryDisplayProps {
  plan: TravelPlan;
  onReset: () => void;
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-slate-200 last:pb-0 last:border-l-0 group">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase tracking-wider">
            {activity.time}
          </span>
          {activity.transport && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              {activity.transport}
            </span>
          )}
        </div>
        
        <h4 className="text-lg font-bold text-slate-800 mb-1">{activity.activity}</h4>
        <div className="text-sm text-teal-600 font-medium mb-2 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          {activity.location}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{activity.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {activity.photo_tip && (
             <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 flex gap-3 items-start">
               <div className="mt-1 text-purple-600 shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
               </div>
               <div>
                 <span className="block text-xs font-bold text-purple-700 uppercase mb-0.5">Photo Op</span>
                 <p className="text-xs text-purple-800">{activity.photo_tip}</p>
               </div>
             </div>
          )}
          {activity.rainy_day_backup && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 flex gap-3 items-start">
              <div className="mt-1 text-blue-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
              </div>
              <div>
                <span className="block text-xs font-bold text-blue-700 uppercase mb-0.5">Rainy Backup</span>
                <p className="text-xs text-blue-800">{activity.rainy_day_backup}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DayCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => {
  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-4 mb-6 sticky top-4 z-10 bg-slate-50/90 backdrop-blur-sm py-2 rounded-lg">
        <div className="bg-slate-900 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
          {dayPlan.day}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{dayPlan.theme}</h3>
          <p className="text-sm text-slate-500">Day {dayPlan.day} Itinerary</p>
        </div>
      </div>

      <div className="space-y-2">
        {dayPlan.activities.map((act, idx) => (
          <ActivityCard key={idx} activity={act} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1 text-amber-700 font-bold text-sm uppercase tracking-wide">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>
             Local Secret
          </div>
          <p className="text-amber-900 text-sm">{dayPlan.local_secret}</p>
        </div>
        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg shadow-sm">
           <div className="flex items-center gap-2 mb-1 text-emerald-700 font-bold text-sm uppercase tracking-wide">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
             Cultural Etiquette
          </div>
          <p className="text-emerald-900 text-sm">{dayPlan.cultural_etiquette}</p>
        </div>
      </div>
    </div>
  );
};

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ plan, onReset }) => {
  // Data for chart
  const activityCountData = plan.itinerary.map(day => ({
    name: `Day ${day.day}`,
    Activities: day.activities.length,
    Relaxation: Math.max(0, 5 - day.activities.length) // Dummy metric for vis
  }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-teal-800 to-slate-900 relative">
          <img 
            src={`https://picsum.photos/1200/400?grayscale&blur=2`} 
            alt="Destination Header" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
            <div className="uppercase tracking-widest text-sm font-semibold text-teal-300 mb-2">Travel Plan</div>
            <h1 className="text-5xl font-bold mb-2 tracking-tight">{plan.metadata.destination}</h1>
            <div className="flex gap-6 text-sm opacity-90">
               <span className="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                 {plan.metadata.timezone}
               </span>
               <span className="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                 {plan.metadata.currency}
               </span>
            </div>
          </div>
          <button 
            onClick={onReset}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/20"
          >
            Start Over
          </button>
        </div>

        {/* Accommodations */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M13 14h-2v7h2z"/><line x1="9" y1="9" x2="9" y2="9"/><line x1="9" y1="13" x2="9" y2="13"/><line x1="9" y1="17" x2="9" y2="17"/><line x1="15" y1="9" x2="15" y2="9"/><line x1="15" y1="13" x2="15" y2="13"/><line x1="15" y1="17" x2="15" y2="17"/></svg>
            Where to Stay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.accommodations.map((acc, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">{acc.name}</h3>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{acc.category}</span>
                </div>
                <div className="flex items-center gap-1 mb-2 text-yellow-500 text-sm">
                  {'★'.repeat(Math.round(parseFloat(acc.rating) || 4))} 
                  <span className="text-slate-400 ml-1">({acc.rating})</span>
                </div>
                <p className="text-sm text-slate-500">{acc.reason_to_stay}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Intensity Chart */}
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Trip Intensity Analysis</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityCountData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="Activities" fill="#0d9488" radius={[4, 4, 0, 0]}>
                  {activityCountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#14b8a6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="p-8">
           {plan.itinerary.map((day, idx) => (
             <DayCard key={idx} dayPlan={day} />
           ))}
        </div>
      </div>
      
      <div className="text-center text-slate-400 text-sm pb-8">
        Generated by Wanderlust AI • {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default ItineraryDisplay;

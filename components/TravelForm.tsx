import React, { useState } from 'react';
import { TravelParams } from '../types';

interface TravelFormProps {
  onSubmit: (params: TravelParams) => void;
  isLoading: boolean;
}

const INTERESTS_OPTIONS = [
  "Gastronomy", "Architecture", "History", "Nature", "Nightlife", 
  "Art & Museums", "Adventure", "Shopping", "Relaxation"
];

const VIBE_OPTIONS = [
  "Cyberpunk", "Historical", "Eco-Chic", "Luxury", "Bohemian", "Minimalist"
];

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [group, setGroup] = useState('Solo');
  const [pace, setPace] = useState('Balanced');
  const [vibe, setVibe] = useState('Historical');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      startDate,
      endDate,
      group,
      interests: selectedInterests.length > 0 ? selectedInterests : ["General Sightseeing"],
      pace,
      vibe
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-teal-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          Plan Your Journey
        </h2>
        <p className="text-teal-100 opacity-90 mt-1">AI-powered logistics for the modern traveler (2026 Edition)</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Destination</label>
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Kyoto, Japan"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Group & Pace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Travel Group</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
            >
              <option value="Solo">Solo Traveler</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family with Kids</option>
              <option value="Friends">Group of Friends</option>
              <option value="Business">Business Trip</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pace</label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
            >
              <option value="Relaxed">Relaxed (1-2 activities/day)</option>
              <option value="Balanced">Balanced (Moderate pace)</option>
              <option value="Intensive">Intensive (Pack it all in!)</option>
            </select>
          </div>
        </div>

        {/* Vibe Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Trip Vibe</label>
          <div className="flex flex-wrap gap-2">
            {VIBE_OPTIONS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVibe(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  vibe === v
                    ? 'bg-purple-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS_OPTIONS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors border ${
                  selectedInterests.includes(interest)
                    ? 'bg-teal-50 border-teal-500 text-teal-700 font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:translate-y-[-2px] ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-teal-500/30'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Itinerary...
            </span>
          ) : (
            "Create My Journey"
          )}
        </button>
      </form>
    </div>
  );
};

export default TravelForm;

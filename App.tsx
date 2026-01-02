import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import { generateItinerary } from './services/geminiService';
import { TravelParams, TravelPlan } from './types';

const App: React.FC = () => {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePlan = async (params: TravelParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateItinerary(params);
      setPlan(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-100/50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100/50 rounded-full blur-3xl opacity-50"></div>
      </div>

      {!plan ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">Perfect Trip</span>
            </h1>
            <p className="text-lg text-slate-600">
              Experience the future of travel planning. Our intelligent engine curates personalized itineraries with real-time local insights, hidden gems, and seamless logistics.
            </p>
          </div>
          
          <TravelForm onSubmit={handleCreatePlan} isLoading={loading} />
          
          {error && (
            <div className="mt-6 w-full max-w-2xl bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold">Generation Failed</h3>
                <p className="text-sm">{error}</p>
                <p className="text-xs mt-1 text-red-500">Ensure your API key is set in the environment.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ItineraryDisplay plan={plan} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;

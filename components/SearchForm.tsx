import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getParks } from '../api/parks';
import { Resort } from '../types';

interface SearchFormProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export const SearchForm: React.FC<SearchFormProps> = ({ className = '', variant = 'default' }) => {
  const navigate = useNavigate();
  const { setDates, setPark, selectedPark, startDate, endDate } = useBooking();
  
  const [parks, setParks] = useState<Resort[]>([]);
  const [localParkId, setLocalParkId] = useState<string>('');
  const [localStart, setLocalStart] = useState('');
  const [localEnd, setLocalEnd] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sync local state with context when context changes
  useEffect(() => {
    setLocalParkId(selectedPark?.maxxtonData.resortId.toString() || '');
    setLocalStart(startDate);
    setLocalEnd(endDate);
  }, [selectedPark, startDate, endDate]);

  // Laad parken voor de dropdown
  useEffect(() => {
    const loadParks = async () => {
      try {
        const data = await getParks();
        setParks(data);
      } catch (error) {
        console.error("Kon parken niet laden", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadParks();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update Context
    setDates(localStart, localEnd);

    if (localParkId) {
      const chosenPark = parks.find(p => p.maxxtonData.resortId.toString() === localParkId);
      setPark(chosenPark || null);
      navigate(`/parks/${localParkId}`);
    } else {
      setPark(null);
      navigate('/parks');
    }
  };

  const containerClasses = variant === 'default' 
    ? `bg-white rounded-xl shadow-xl p-6 md:p-8 ${className}`
    : `bg-transparent ${className}`;

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        
        {/* Park Selectie */}
        <div className="md:col-span-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">Waar wil je heen?</label>
          <div className="relative">
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none appearance-none text-gray-900"
              value={localParkId}
              onChange={(e) => setLocalParkId(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Alle parken</option>
              {parks.map(park => (
                <option key={park.maxxtonData.resortId} value={park.maxxtonData.resortId}>
                  {park.cmsData.parkNaam}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Datum Selectie */}
        <div className="md:col-span-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">Aankomst</label>
          <input 
            type="date" 
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-gray-900"
            value={localStart}
            min={new Date().toISOString().split('T')[0]} // Geen verleden
            onChange={(e) => setLocalStart(e.target.value)}
            required
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">Vertrek</label>
          <input 
            type="date" 
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-gray-900"
            value={localEnd}
            min={localStart || new Date().toISOString().split('T')[0]}
            onChange={(e) => setLocalEnd(e.target.value)}
            required
          />
        </div>

        {/* Submit Knop */}
        <div className="md:col-span-1">
          <button 
            type="submit" 
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md flex justify-center items-center h-[50px]"
          >
            {localParkId ? 'Toon aanbod' : 'Zoek parken'} &rarr;
          </button>
        </div>
      </form>
    </div>
  );
};
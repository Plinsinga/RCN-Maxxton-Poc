import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParks } from '../api/parks';
import { Resort } from '../types';
import { ParkCard } from '../components/ParkCard';
import { SearchForm } from '../components/SearchForm';
import { useBooking } from '../context/BookingContext';

export const ParksPage: React.FC = () => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filteredResorts, setFilteredResorts] = useState<Resort[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const { startDate, endDate } = useBooking();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getParks();
        setResorts(data);
        setFilteredResorts(data);
      } catch (error) {
        console.error("Failed to load parks", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Filter logica
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = resorts.filter(resort => {
      const name = resort.cmsData.parkNaam.toLowerCase();
      const city = resort.maxxtonData.visitAddress.city?.toLowerCase() || '';
      const country = resort.maxxtonData.visitAddress.countryName?.toLowerCase() || '';
      return name.includes(query) || city.includes(query) || country.includes(query);
    });
    setFilteredResorts(filtered);
  }, [searchQuery, resorts]);

  const handleSelectPark = (resort: Resort) => {
    navigate(`/parks/${resort.maxxtonData.resortId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Zoekbalk sectie */}
      <div className="mb-12 bg-gradient-to-r from-brand-50 to-white p-6 md:p-10 rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vind jouw ideale vakantiepark</h1>
        <SearchForm variant="default" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Zoekresultaten (${filteredResorts.length})` : 'Alle Parken'}
          </h2>
          {startDate && endDate && (
             <p className="text-sm text-brand-600 font-medium mt-1">
               Beschikbaarheid wordt gecheckt voor: {startDate} t/m {endDate}
             </p>
          )}
        </div>
        
        {/* Tekst Filter */}
        <div className="w-full md:w-auto relative">
            <input 
                type="text" 
                placeholder="Zoek op naam of regio..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
                <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
        </div>
      ) : filteredResorts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResorts.map((resort, idx) => (
            <ParkCard 
              key={`${resort.maxxtonData.resortId}-${idx}`} 
              resort={resort} 
              onSelect={handleSelectPark} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-gray-900">Geen parken gevonden</h3>
            <p className="text-gray-500">Probeer een andere zoekterm.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-brand-600 font-bold hover:underline">
                Toon alle parken
            </button>
        </div>
      )}
    </div>
  );
};
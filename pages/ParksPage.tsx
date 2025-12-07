import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParks } from '../api/parks';
import { Resort } from '../types';
import { ParkCard } from '../components/ParkCard';
import { useBooking } from '../context/BookingContext';

export const ParksPage: React.FC = () => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { startDate, endDate } = useBooking();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getParks();
        setResorts(data);
      } catch (error) {
        console.error("Failed to load parks", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSelectPark = (resort: Resort) => {
    navigate(`/parks/${resort.maxxtonData.resortId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Onze Vakantieparken</h1>
        {startDate && endDate && (
          <p className="text-gray-600">
            Beschikbaarheid zoeken voor: <span className="font-semibold">{startDate}</span> tot <span className="font-semibold">{endDate}</span>
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-20">Parken laden...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resorts.map((resort, idx) => (
            <ParkCard 
              key={`${resort.maxxtonData.resortId}-${idx}`} 
              resort={resort} 
              onSelect={handleSelectPark} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
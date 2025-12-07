import React from 'react';
import { Resort } from '../types';

interface ParkCardProps {
  resort: Resort;
  onSelect: (resort: Resort) => void;
}

export const ParkCard: React.FC<ParkCardProps> = ({ resort, onSelect }) => {
  // Fallback afbeelding als de API geen afbeelding teruggeeft
  const imageUrl = resort.maxxtonData.images?.[0]?.urls?.medium || 'https://picsum.photos/400/300';

  return (
    <div 
      onClick={() => onSelect(resort)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-brand-500"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={resort.cmsData.parkNaam} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-900 shadow-sm">
          {resort.maxxtonData.visitAddress.countryName}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{resort.cmsData.parkNaam}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{resort.cmsData.subtekst}</p>
        <div className="flex items-center text-brand-600 font-medium text-sm group-hover:underline">
          Selecteer dit park &rarr;
        </div>
      </div>
    </div>
  );
};
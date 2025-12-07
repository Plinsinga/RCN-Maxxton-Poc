import React from 'react';
import { Accommodation } from '../types';

interface AccoCardProps {
  acco: Accommodation;
  onSelect: (acco: Accommodation) => void;
}

export const AccommodationCard: React.FC<AccoCardProps> = ({ acco, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(acco)}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-brand-500 hover:ring-1 hover:ring-brand-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{acco.maxxtonData.name}</h3>
          {acco.cmsData.m2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {acco.cmsData.m2}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: acco.cmsData.description }} />
        
        <div className="flex flex-wrap gap-2 mb-4">
          {acco.cmsData.kenmerk1 && (
            <span className="text-xs text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              {acco.cmsData.kenmerk1}
            </span>
          )}
          {acco.cmsData.kenmerk2 && (
            <span className="text-xs text-brand-700 bg-brand-50 px-2 py-1 rounded-md">
              {acco.cmsData.kenmerk2}
            </span>
          )}
        </div>
      </div>

      <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
        Bekijk Prijzen & Beschikbaarheid
      </button>
    </div>
  );
};
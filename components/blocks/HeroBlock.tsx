import React from 'react';
import { HeroBlockData } from '../../types/content';
import { SearchForm } from '../SearchForm';

interface Props {
  data: HeroBlockData;
}

export const HeroBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative w-full mb-32"> {/* Grote margin-bottom om ruimte te maken voor de search bar die uitsteekt */}
      {/* Background Image Container */}
      <div className="bg-green-800 h-[65vh] w-full relative flex items-center justify-center overflow-hidden z-0">
        {data.imageUrl && (
            <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => {
                // Fallback als image faalt
                (e.target as HTMLImageElement).style.display = 'none';
            }}
            />
        )}
        
        {/* Text Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-50px]">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-sm drop-shadow-lg">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Search Form Overlay - Absolute positioning relative to the wrapper */}
      {data.showSearchForm && (
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
            <div className="max-w-6xl mx-auto">
                 {/* SearchForm container met shadow voor diepte */}
                 <div className="shadow-2xl rounded-xl">
                    <SearchForm variant="default" />
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};
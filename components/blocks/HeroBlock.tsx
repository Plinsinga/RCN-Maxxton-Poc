import React from 'react';
import { HeroBlockData } from '../../types/content';
import { SearchForm } from '../SearchForm';

interface Props {
  data: HeroBlockData;
}

export const HeroBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative w-full flex flex-col mb-8 md:mb-16">
      
      {/* 1. Hero Image & Text Area */}
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Image */}
        {data.imageUrl && (
            <img 
              src={data.imageUrl} 
              alt={data.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
        )}
        
        {/* Text */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-8 md:pb-0">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl shadow-black">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Search Form Area */}
      {/* 
         Mobiel: Gewone flow, GEEN negatieve margin. Stapelt netjes onder de foto.
         Desktop (md): Negatieve margin (-mt-24) zodat hij over de foto heen valt.
      */}
      {data.showSearchForm && (
        <div className="relative z-20 px-4 w-full md:-mt-24 bg-gray-50 md:bg-transparent pb-8 md:pb-0">
           <div className="max-w-6xl mx-auto"> 
             <SearchForm variant="default" className="border border-gray-200 shadow-2xl relative bg-white" />
           </div>
        </div>
      )}
    </div>
  );
};
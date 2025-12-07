import React from 'react';
import { HeroBlockData } from '../../types/content';
import { SearchForm } from '../SearchForm';

interface Props {
  data: HeroBlockData;
}

export const HeroBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative mb-12">
      {/* Background Image */}
      <div className="bg-brand-900 h-[65vh] relative flex items-center justify-center overflow-hidden">
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        
        {/* Text Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-50px]">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-sm drop-shadow-lg">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-xl text-brand-50 mb-8 max-w-2xl mx-auto drop-shadow-md">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Conditional Search Form Overlay */}
      {data.showSearchForm && (
        <div className="relative z-20 -mt-24 max-w-6xl mx-auto px-4">
          <SearchForm />
        </div>
      )}
    </div>
  );
};

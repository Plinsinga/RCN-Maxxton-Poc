import React from 'react';
import { USPBlockData } from '../../types/content';

interface Props {
  data: USPBlockData;
}

export const USPBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {data.title && (
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
          {data.title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {data.items.map((item, idx) => (
          <div key={idx} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

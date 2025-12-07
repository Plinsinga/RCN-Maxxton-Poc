import React from 'react';
import { TextBlockData } from '../../types/content';

interface Props {
  data: TextBlockData;
}

export const TextBlock: React.FC<Props> = ({ data }) => {
  const bgClass = data.backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white';
  const alignClass = data.alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${bgClass} py-16`}>
      <div className={`max-w-4xl mx-auto px-4 ${alignClass}`}>
        {data.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{data.title}</h2>
        )}
        <div 
          className="prose prose-lg prose-brand max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};

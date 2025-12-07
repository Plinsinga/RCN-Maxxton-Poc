import React from 'react';
import { ContentBlock, HeroBlockData, USPBlockData, TextBlockData } from '../types/content';

// Importeer alle blok componenten
import { HeroBlock } from './blocks/HeroBlock';
import { USPBlock } from './blocks/USPBlock';
import { TextBlock } from './blocks/TextBlock';

interface PageBuilderProps {
  blocks: ContentBlock[];
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
      return <div className="p-8 text-center text-gray-500">Geen content blokken gevonden.</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`;

        switch (block.type) {
          case 'hero':
            return <HeroBlock key={key} data={block as HeroBlockData} />;
          
          case 'usp':
            return <USPBlock key={key} data={block as USPBlockData} />;
          
          case 'text':
            return <TextBlock key={key} data={block as TextBlockData} />;
          
          default:
            console.warn(`Unknown block type: ${(block as any).type}`);
            return null;
        }
      })}
    </div>
  );
};
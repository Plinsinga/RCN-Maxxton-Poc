import React from 'react';
import { ContentBlock } from '../types/content';

// Importeer alle blok componenten
import { HeroBlock } from './blocks/HeroBlock';
import { USPBlock } from './blocks/USPBlock';
import { TextBlock } from './blocks/TextBlock';

interface PageBuilderProps {
  blocks: ContentBlock[];
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        // Render het juiste component op basis van block.type
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id || index} data={block} />;
          
          case 'usp':
            return <USPBlock key={block.id || index} data={block} />;
          
          case 'text':
            return <TextBlock key={block.id || index} data={block} />;
          
          default:
            console.warn(`Unknown block type: ${(block as any).type}`);
            return null;
        }
      })}
    </div>
  );
};

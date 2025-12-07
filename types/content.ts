// Enum voor ondersteunde blok types
export type BlockType = 'hero' | 'text' | 'usp' | 'features';

// Basis definitie voor elk content blok
export interface BaseBlock {
  id: string;
  type: BlockType;
}

// 1. Hero Block (met optionele zoekbalk toggle)
export interface HeroBlockData extends BaseBlock {
  type: 'hero';
  title: string;
  subtitle?: string;
  imageUrl: string;
  showSearchForm: boolean; // CMS bepaalt of de zoekbalk hier getoond wordt
}

// 2. Rich Text Block
export interface TextBlockData extends BaseBlock {
  type: 'text';
  title?: string;
  content: string; // HTML of Markdown string
  backgroundColor?: 'white' | 'gray';
  alignment?: 'left' | 'center';
}

// 3. USP / Features Block
export interface USPItem {
  icon: string; // Emoji of icon naam
  title: string;
  description: string;
}

export interface USPBlockData extends BaseBlock {
  type: 'usp';
  title?: string;
  items: USPItem[];
}

// Union type van alle mogelijke blokken
export type ContentBlock = HeroBlockData | TextBlockData | USPBlockData;

// De structuur van een volledige pagina uit het CMS
export interface PageContent {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  blocks: ContentBlock[];
}

import React, { useEffect, useState } from 'react';
import { getPageContent } from '../api/content';
import { PageContent } from '../types/content';
import { PageBuilder } from '../components/PageBuilder';

export const HomePage: React.FC = () => {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getPageContent('/');
        setPageData(data);
      } catch (error) {
        console.error("Failed to load home page content", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Laden...</div>;
  }

  if (!pageData) {
    return <div className="text-center py-20">Geen content gevonden.</div>;
  }

  return (
    <div>
      {/* De PageBuilder rendert dynamisch de Hero, USPs en Text blokken */}
      <PageBuilder blocks={pageData.blocks} />
    </div>
  );
};

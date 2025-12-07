import { PageContent } from '../types/content';

/**
 * MOCK DATA
 * Dit simuleert de JSON die je normaal van een Headless CMS (Contentful/Strapi) krijgt.
 */
const MOCK_HOME_PAGE: PageContent = {
  id: 'home-001',
  slug: '/',
  metaTitle: 'RCN Vakantieparken - Home',
  metaDescription: 'Boek je vakantie in de natuur.',
  blocks: [
    {
      id: 'hero-1',
      type: 'hero',
      title: 'Ontdek de mooiste vakantieparken',
      subtitle: 'Geniet van natuur, comfort en gastvrijheid op onze prachtige locaties.',
      imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      showSearchForm: true
    },
    {
      id: 'usp-1',
      type: 'usp',
      title: 'Waarom kiezen voor RCN?',
      items: [
        {
          icon: '🌲',
          title: 'Midden in de natuur',
          description: 'Al onze parken liggen op unieke locaties midden in de mooiste natuurgebieden.'
        },
        {
          icon: '🏠',
          title: 'Comfort & Glamping',
          description: "Van luxe villa's met wellness tot avontuurlijke safaritenten."
        },
        {
          icon: '❤️',
          title: 'Gastvrijheid',
          description: 'Onze medewerkers staan altijd voor je klaar. De winst delen we met goede doelen.'
        }
      ]
    },
    {
      id: 'text-1',
      type: 'text',
      title: 'Vakantie vieren op jouw manier',
      content: '<p>Of je nu houdt van kamperen met je eigen tent of liever verblijft in een luxe bungalow, bij ons vind je altijd een plek die bij je past. Onze parken zijn ruim opgezet en bieden volop privacy.</p><p>Ontdek onze faciliteiten zoals zwembaden, restaurants en recreatieteams die zorgen voor een onvergetelijke tijd voor jong en oud.</p>',
      backgroundColor: 'gray',
      alignment: 'center'
    }
  ]
};

/**
 * Haalt pagina content op basis van slug.
 * Later vervang je dit door: fetch(`${CMS_API_URL}/pages?slug=${slug}`)
 */
export const getPageContent = async (slug: string): Promise<PageContent | null> => {
  console.log(`[CMS Mock] Fetching content for slug: ${slug}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (slug === '/' || slug === 'home') {
        resolve(MOCK_HOME_PAGE);
      } else {
        resolve(null);
      }
    }, 500); // Korte vertraging simuleren
  });
};

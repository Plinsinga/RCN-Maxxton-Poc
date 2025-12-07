import { Resort, Accommodation } from '../types';

export const MOCK_RESORTS: Resort[] = [
  {
    cmsData: {
      parkNaam: "RCN de Schotsman",
      subtekst: "Direct aan het Veerse Meer, ideaal voor watersporters.",
      parkPlattegrondImageFileUrl: ""
    },
    maxxtonData: {
      resortId: 1,
      resortName: "RCN de Schotsman",
      visitAddress: {
        address1: "Schotsmanweg",
        houseNumber: "1",
        zipCode: "4493 CX",
        city: "Kamperland",
        countryName: "Nederland"
      },
      images: [
        {
          urls: {
            medium: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
            large: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
          }
        }
      ]
    }
  },
  {
    cmsData: {
      parkNaam: "RCN het Grote Bos",
      subtekst: "Verscholen in de bossen van de Utrechtse Heuvelrug.",
      parkPlattegrondImageFileUrl: ""
    },
    maxxtonData: {
      resortId: 2,
      resortName: "RCN het Grote Bos",
      visitAddress: {
        address1: "Hydeparklaan",
        houseNumber: "24",
        zipCode: "3941 ZK",
        city: "Doorn",
        countryName: "Nederland"
      },
      images: [
        {
          urls: {
            medium: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&w=600&q=80",
            large: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&w=1200&q=80"
          }
        }
      ]
    }
  },
  {
    cmsData: {
      parkNaam: "RCN laacher See",
      subtekst: "Kamperen in een vulkaankrater in de Eifel.",
      parkPlattegrondImageFileUrl: ""
    },
    maxxtonData: {
      resortId: 3,
      resortName: "RCN laacher See",
      visitAddress: {
        address1: "Am Laacher See",
        houseNumber: "1",
        zipCode: "56653",
        city: "Wassenach",
        countryName: "Duitsland"
      },
      images: [
        {
          urls: {
            medium: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
            large: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
          }
        }
      ]
    }
  }
];

export const MOCK_ACCOMMODATIONS: Accommodation[] = [
  {
    cmsData: {
      description: "Luxe vrijstaande bungalow geschikt voor 6 personen. Voorzien van alle gemakken zoals vaatwasser en combimagnetron.",
      spotlight: "Hardloper",
      kenmerk1: "Vrijstaand",
      kenmerk2: "Vaatwasser",
      m2: "75m2"
    },
    maxxtonData: {
      code: "BUNG6",
      name: "6-persoons Bungalow",
      resourceId: 101
    }
  },
  {
    cmsData: {
      description: "Sfeervol chalet met veranda. Geniet van het buitenleven met het comfort van thuis.",
      spotlight: "Nieuw",
      kenmerk1: "Veranda",
      kenmerk2: "Huisdiervrij",
      m2: "45m2"
    },
    maxxtonData: {
      code: "CHAL4",
      name: "4-persoons Chalet",
      resourceId: 102
    }
  },
  {
    cmsData: {
      description: "Avontuurlijk overnachten in een luxe safaritent. Glamping op zijn best.",
      spotlight: "Populair",
      kenmerk1: "Glamping",
      kenmerk2: "Dichtbij sanitair",
      m2: "35m2"
    },
    maxxtonData: {
      code: "SAF5",
      name: "5-persoons Safaritent",
      resourceId: 103
    }
  }
];
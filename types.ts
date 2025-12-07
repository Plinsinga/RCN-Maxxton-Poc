// Data structuur voor een Resort (Park)
export interface Resort {
  cmsData: {
    parkNaam: string;
    subtekst: string;
    parkPlattegrondImageFileUrl?: string;
  };
  maxxtonData: {
    resortId: number;
    resortName: string;
    visitAddress: {
      city: string;
      countryName: string;
    };
    images: Array<{
      urls: {
        medium: string;
        large: string;
      }
    }>;
  };
}

// Data structuur voor een Accommodatie
export interface Accommodation {
  cmsData: {
    description: string;
    spotlight?: string;
    kenmerk1?: string;
    kenmerk2?: string;
    m2?: string;
  };
  maxxtonData: {
    code: string;
    name: string;
    resourceId: number;
  };
}

// Gegevens van de gast voor de reservering
export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Stappen in het boekingsproces
export enum BookingStep {
  SELECT_PARK = 1,
  SELECT_DATE = 2,
  SELECT_TYPE = 3,
  CONFIRMATION = 4
}

// De centrale state die we delen via Context
export interface BookingContextState {
  selectedPark: Resort | null;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  selectedAccommodation: Accommodation | null;
  
  // Actions
  setPark: (park: Resort | null) => void;
  setDates: (start: string, end: string) => void;
  setAccommodation: (acco: Accommodation | null) => void;
}
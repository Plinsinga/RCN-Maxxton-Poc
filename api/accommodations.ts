import { apiGet } from './client';
import { Accommodation } from '../types';

/**
 * Haalt alle accommodaties op.
 * Endpoint: GET /Accommodations
 */
export const getAccommodations = async (): Promise<Accommodation[]> => {
  return apiGet<Accommodation[]>('/Accommodations');
};

/**
 * Haalt accommodaties op gefilterd per park.
 * In deze POC filteren we client-side omdat de test-dataset klein is.
 * In productie zou je waarschijnlijk doen: apiGet('/Accommodations', { resortId: parkId })
 */
export const getAccommodationsByPark = async (parkId: number): Promise<Accommodation[]> => {
  // Optie A: Als API filteren ondersteunt:
  // return apiGet<Accommodation[]>('/Accommodations', { resortId: parkId });
  
  // Optie B: Client-side filteren (POC modus)
  const allAccos = await getAccommodations();
  
  // De aangeleverde JSON heeft geen resortId in de root properties, 
  // dus voor deze POC retourneren we alle types als voorbeeld.
  // In een echte integratie check je: acco.maxxtonData.resortId === parkId
  return allAccos;
};

import { apiGet } from './client';
import { Resort } from '../types';

/**
 * Haalt alle Resorts op.
 * Endpoint: GET /Resorts
 */
export const getParks = async (): Promise<Resort[]> => {
  return apiGet<Resort[]>('/Resorts');
};

/**
 * Haalt een specifiek Resort op.
 * Omdat de test-API geen direct endpoint /Resorts/:id lijkt te ondersteunen in deze context,
 * filteren we de lijst. In een productie-omgeving zou je `/Resorts/${id}` gebruiken.
 */
export const getParkById = async (parkId: number): Promise<Resort | undefined> => {
  const allParks = await getParks();
  return allParks.find((p) => p.maxxtonData.resortId === parkId);
};

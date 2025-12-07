import { apiPost } from './client';

interface AvailabilityParams {
  parkId: number;
  accoCode: string;
  startDate: string;
  endDate: string;
}

/**
 * Check beschikbaarheid.
 * Omdat de `/Availability` endpoint in de aangeleverde specs eigenlijk 'Amenities' teruggeeft,
 * houden we hier de mock logica, maar we structureren het alsof het een echte API call is.
 */
export const getAvailability = async (params: AvailabilityParams): Promise<boolean> => {
  // In een echte situatie zou dit zijn:
  // const response = await apiPost<{available: boolean}>('/Availability/Check', params);
  // return response.available;

  console.log(`[API Mock] Checking availability for:`, params);

  return new Promise((resolve) => {
    setTimeout(() => {
      // 80% kans op succes voor demo doeleinden
      const isAvailable = Math.random() > 0.2;
      resolve(isAvailable);
    }, 1200);
  });
};

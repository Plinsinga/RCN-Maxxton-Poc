import { apiPost } from './client';
import { GuestDetails, Resort, Accommodation } from '../types';

interface ReservationRequest {
  resortId: number;
  accommodationCode: string;
  startDate: string;
  endDate: string;
  guest: GuestDetails;
}

/**
 * Maakt een reservering aan.
 * Endpoint: POST /Reservations (fictief voor POC)
 */
export const createReservation = async (request: ReservationRequest): Promise<{ reservationId: string }> => {
  // In een echte situatie:
  // return apiPost<{ reservationId: string }>('/Reservations', request);

  console.log('[API Mock] Creating reservation:', request);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reservationId: `RES-${Math.floor(Math.random() * 10000)}`
      });
    }, 1500);
  });
};

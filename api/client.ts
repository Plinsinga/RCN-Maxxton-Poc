// Mock Data import
import { MOCK_RESORTS, MOCK_ACCOMMODATIONS } from './mockData';

// Helper om veilig env vars op te halen (werkt in Vite én standaard Node environments)
const getEnv = (key: string, fallback: string): string => {
  try {
    // Check import.meta.env (Vite standard)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
    // Check process.env (Legacy/Webpack/Node)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {
    // Negeer errors bij toegang tot globals
  }
  return fallback;
};

// Base URL en API Key uit environment variables halen
const BASE_URL = getEnv('VITE_MAXXTON_BASE_URL', 'https://test-api-maxxton.rcn.snakeware.net');
const API_KEY = getEnv('VITE_MAXXTON_API_KEY', '');

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Helper om query string op te bouwen.
 * Voegt alleen een '?' toe als er daadwerkelijk parameters zijn.
 */
const buildQueryString = (params?: Record<string, string | number | boolean>) => {
  if (!params || Object.keys(params).length === 0) return '';
  
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Generieke fetch wrapper met MOCK fallback
 */
async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = `${BASE_URL}${endpoint}${buildQueryString(params)}`;

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (API_KEY) {
    headers.set('X-Maxxton-API-Key', API_KEY);
  }

  try {
    // Probeer de echte API
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API Client] Request failed for ${url}. Falling back to MOCK data.`);
    
    // Fallback logica voor demo doeleinden (zodat de UI werkt zonder backend)
    return new Promise((resolve) => {
        setTimeout(() => {
            if (endpoint.includes('/Resorts')) {
                resolve(MOCK_RESORTS as unknown as T);
            } else if (endpoint.includes('/Accommodations')) {
                resolve(MOCK_ACCOMMODATIONS as unknown as T);
            } else {
                resolve({} as T);
            }
        }, 100); // Kortere delay voor snellere UI feedback
    });
  }
}

export const apiGet = <T>(endpoint: string, params?: Record<string, string | number | boolean>) => {
  return apiRequest<T>(endpoint, { method: 'GET', params });
};

export const apiPost = <T>(endpoint: string, body: any) => {
  return apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
};
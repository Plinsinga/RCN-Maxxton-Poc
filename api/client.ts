// Base URL en API Key uit environment variables halen
const BASE_URL = (import.meta as any).env?.VITE_MAXXTON_BASE_URL || 'https://test-api-maxxton.rcn.snakeware.net';
const API_KEY = (import.meta as any).env?.VITE_MAXXTON_API_KEY || '';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Helper om query string op te bouwen
 */
const buildQueryString = (params?: Record<string, string | number | boolean>) => {
  if (!params) return '';
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return `?${query.toString()}`;
};

/**
 * Generieke fetch wrapper
 */
async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = `${BASE_URL}${endpoint}${buildQueryString(params)}`;

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  // Voeg API key toe indien aanwezig (vaak via Header of Query param, hier via Header)
  if (API_KEY) {
    headers.set('X-Maxxton-API-Key', API_KEY);
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error ${response.status}: ${response.statusText} - ${errorBody}`);
    }

    // Maxxton API responses kunnen soms leeg zijn bij 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${url}:`, error);
    throw error;
  }
}

export const apiGet = <T>(endpoint: string, params?: Record<string, string | number | boolean>) => {
  return apiRequest<T>(endpoint, { method: 'GET', params });
};

export const apiPost = <T>(endpoint: string, body: any) => {
  return apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
};

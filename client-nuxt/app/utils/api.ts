import type{ Language } from '@/types';
import { z } from 'zod';
import { CountrySchema, LanguageSchema } from '@/schemas/geo-location.sachema';
import { GeoLocationService } from '~/utils/geo-location';

export default class Api {
  private baseUrl: string;
  private geoService: GeoLocationService;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl + '/api';
    this.geoService = new GeoLocationService();
  }

  // 🛑 Handle API errors globally
  private handleError(error: any) {
    if (error.response) {
      const errorMessage = (error.response._data as { message?: string })?.message || 'Something went wrong.';
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please try again.');
    } else {
      console.error('Request error:', error.message);
      throw new Error('Request failed. Please check your network.');
    }
  }

  // 🛠 Fetch languages with validation
  async getLanguages(): Promise<Language[]> {
    try {
      const { data } = await useFetch(`${this.baseUrl}/user/languages`);
      
      // ✅ Validate API response
      const parsed = z.array(LanguageSchema).safeParse(data.value);
      if (!parsed.success) {
        console.error('Invalid API response:', parsed.error);
        throw new Error('Unexpected API response format.');
      }

      return parsed.data;
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error after handling
    }
  }
  
  async getCountries(): Promise<Country[]> {
    try {
      const { data } = await useFetch('https://restcountries.com/v3.1/all?fields=name,cca3');
      
      const fixedCountries = (data.value as any[]).map((country: {name: { common: string }, cca3: string}) => ({
        name: country.name.common,
        code: country.cca3
      }));
      
      // ✅ Validate API response
      const parsed = z.array(CountrySchema).safeParse(fixedCountries);
      if (!parsed.success) {
        console.error('Invalid API response:', parsed.error);
        throw new Error('Unexpected API response format.');
      }
      return parsed.data;
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error after handling
    }
  }
}

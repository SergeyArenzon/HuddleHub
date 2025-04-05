import axios, { AxiosInstance, AxiosError } from 'axios';
import { Language, Country, City } from '@/types';
import { z } from 'zod';
import { CountrySchema, LanguageSchema } from '@/schema/user.schema';
import { City as CSCCity, ICity } from 'country-state-city';
import { GeoLocationService } from '@/lib/geo-location';


export default class Api {
  private axios: AxiosInstance;
  private geoService: GeoLocationService;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
      timeout: 5000, // 5s timeout
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    this.geoService = new GeoLocationService();

    // Attach response interceptor
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  // 🛑 Handle API errors globally
  private handleError(error: AxiosError) {
    if (error.response) {
      const errorMessage = (error.response.data as { message?: string })?.message || 'Something went wrong.';
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
    const response = await this.axios.get('/user/languages');
    // ✅ Validate API response
    const parsed = z.array(LanguageSchema).safeParse(response.data);
    if (!parsed.success) {
      console.error('Invalid API response:', parsed.error);
      throw new Error('Unexpected API response format.');
    }

    return parsed.data;
  }
  
  async getCountries(): Promise<Country[]> {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca3');
    const fixedCountries = response.data.map((country: {name: { common: string }, cca3: string}) => {
      return {
        name: country.name.common,
        code: country.cca3
      }
    })
    
    // ✅ Validate API response
    const parsed = z.array(CountrySchema).safeParse(fixedCountries);
    if (!parsed.success) {
      console.error('Invalid API response:', parsed.error);
      throw new Error('Unexpected API response format.');
    }
    return parsed.data;
  }
}

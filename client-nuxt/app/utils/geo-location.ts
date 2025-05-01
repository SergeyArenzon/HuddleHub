import type { ICity, ICountry } from 'country-state-city';
import CSCCity from 'country-state-city/lib/city';
import CSCCountry from 'country-state-city/lib/country';

export class GeoLocationService {
   getAllCities(countryCode: string): ICity[] { 
    try {
      // Fetch all cities at once using the country-state-city package
      return CSCCity.getCitiesOfCountry(countryCode) || [];
    } catch (error) {
      console.error('Error fetching all cities:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  getAllCountries(): ICountry[] {
    try {
      // Fetch all countries using the country-state-city package
      return CSCCountry.getAllCountries() || [];
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }
}

  
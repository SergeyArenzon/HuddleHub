import { ICity, ICountry } from 'country-state-city';
import CSCCity from 'country-state-city/lib/city';
import CSCCountry from 'country-state-city/lib/country';
import { Country, City } from '@/types';

export class GeoLocationService {
   getAllCities(countryCode: string): City[] { 
    try {
      // Fetch all cities at once using the country-state-city package
      const cities = CSCCity.getCitiesOfCountry(countryCode) || [];
      
      // Map the response to our City interface
      return cities.map((city: ICity) => ({
        code: `${city.name}-${city.stateCode}`,
        name: city.name
      }));
    } catch (error) {
      console.error('Error fetching all cities:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  getAllCountries(): Country[] {
    try {
      // Fetch all countries using the country-state-city package
      const countries = CSCCountry.getAllCountries() || [];
      
      // Map the response to our Country interface
      return countries.map((country: ICountry) => ({
        code: country.isoCode,
        name: `${country.flag} ${country.name}`
      }));
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }
}

  
import { useState, useEffect } from 'react';
import  WeatherModule  from '../spces/WeatherModule';


interface Weather {
  temp: number;
  temp_min: number;
  temp_max: number;
}

const useResults = () => {
  const [results, setResults] = useState<Weather | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchApi = async (searchTerm: string): Promise<Weather | null> => {
    try {
      const data = await WeatherModule.fetchWeather(searchTerm);
      setResults(data);
      setErrorMessage('');
      return data;
    } catch (err) {
      setErrorMessage('Something went wrong');
      return null;
    }
  };

  useEffect(() => {
    searchApi('amman');
  }, []);

  return { searchApi, results, errorMessage };
};

export default useResults;

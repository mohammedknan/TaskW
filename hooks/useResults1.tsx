import { useState, useEffect } from 'react';
import weatherModule1 from "../spces/WeatherModule1";

const useResults1 = () => {

      interface ForecastItem {
        date: string;
        temp: number;
        temp_min: number;
        temp_max: number;
    };


    const [results1, setResults1] = useState<ForecastItem[] | null>(null);
    const [errorMessage1, setErrorMessage1] = useState<string>('');

    const searchApi1 = async (searchTerm: string) => {
        try {
            const data = await weatherModule1.fetchWeather12(searchTerm);
            console.log("Fetched Weather Data:", data); // Debugging
            setResults1(data);
            setErrorMessage1('');
        } catch (err) {
            console.error("API Error:", err);
            setErrorMessage1('Something went wrong');
        }
    };

    useEffect(() => {
        searchApi1('amman');
    }, []);

    return { searchApi1, results1, errorMessage1  };
};

export default useResults1;

import { useState, useEffect } from 'react';
import weatherModule1 from "../spces/WeatherModule1";

interface ForecastItem {
    date: string;
    temp: number;
    temp_min: number;
    temp_max: number;
};

const useResults1 = () => {
    const [results1, setResults1] = useState<ForecastItem[] | null>(null);
    const [cityName, setCityName] = useState<string>('');
    const [cityId, setCityId] = useState<number | null>(null);
    const [errorMessage1, setErrorMessage1] = useState<string>('');

    const searchApi1 = async (searchTerm: string) => {
        try {
            const data = await weatherModule1.fetchWeather12(searchTerm);
            console.log("Fetched Weather Data:", data); // Debugging
            setResults1(data.forecast);
            setCityName(data.cityName);
            setCityId(data.cityId);
        console.log('Fetched Weather USERESULT1 Data: ', data);
            setErrorMessage1('');
        } catch (err) {
            console.error("API Error:", err);
            setErrorMessage1('Something went wrong');
        }
    };
    //
    // useEffect(() => {
    //     searchApi1('amman');
    // }, []);

    return { searchApi1, results1, cityName, cityId, errorMessage1 };
};

export default useResults1;

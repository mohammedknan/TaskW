import React, { useCallback, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";
import Search from "../components/Search";
import useResults from "../hooks/useResults";
import useResults1 from "../hooks/useResults1";
import { RootState, AppDispatch, setCities, addCity } from "../redux/store";
import { searchStyle } from "../styles/style";
import { SearchScreenProps } from "../types/type";

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cities = useSelector((state: RootState) => state.city.city);

    const [term, setTerm] = useState<string>("");

    const { searchApi, results } = useResults();
    const { searchApi1, results1 , cityId , cityName } = useResults1();

    const termFromParams = route.params?.term ?? "";


    useEffect(() => {

        loadCities();
        if (termFromParams) {
            searchApi(termFromParams);
            searchApi1(termFromParams);

        }
    }, [termFromParams]);

    const loadCities = async () => {
        try {
            const storedCities = await AsyncStorage.getItem("cities");
            if (storedCities) {
                dispatch(setCities(JSON.parse(storedCities)));
            }
        } catch (error) {
            console.error("Error loading cities from AsyncStorage", error);
        }
    };

    const debouncedSearch = useCallback(
        debounce(async (searchTerm: string) => {
            if (!searchTerm.trim()) return;

            const response = await searchApi(searchTerm);
            await searchApi1(searchTerm);

            if (response?.temp) {
                const newCity = { city: searchTerm };

                if (!cities.some((c) => c.city.toLowerCase() === newCity.city.toLowerCase())) {
                    const updatedCities = [...cities, newCity];

                    try {
                        await AsyncStorage.setItem("cities", JSON.stringify(updatedCities));
                        dispatch(addCity(newCity));
                    } catch (error) {
                        console.error("Error saving city to AsyncStorage", error);
                    }
                }
            } else {
                console.warn("City not found or invalid");
            }
        }, 500),
        [cities, dispatch]
    );

    useEffect(() => {

        debouncedSearch(term);
        return () => debouncedSearch.cancel();
    }, [term]);

    return (
        <View style={searchStyle.container}>
            <Search term={term} onTermChange={setTerm} onTermSubmit={() => debouncedSearch(term)} />

            <View style={searchStyle.btn}>
                <Button
                    title="Go to Details"

                    onPress={() => navigation.navigate("DetailsScreen", { term })}
                />
            </View>



            <View>

                {cityName && cityId && (
                    <Text style={{ alignSelf: 'center', fontSize: 25 }}>
                        {`Forecast for ${cityName} (ID: ${cityId})`}
                    </Text>
                )}

                <Text style={{ fontSize: 25 }}>Current :</Text>

                {results?.temp ? (
                    <View style={searchStyle.txt}>
                        <Text>Temp: {results?.temp}</Text>
                        <Text>Min Temp: {results?.temp_min}</Text>
                        <Text>Max Temp: {results?.temp_max}</Text>
                    </View>
                ) : (
                    <Text>No results</Text>
                )}
            </View>

            <View>
                {results1 ? (
                    <>
                        <Text style={{ fontSize: 25 }}>Forecast :</Text>
                        {results1?.length > 0 ? (
                            <View style={searchStyle.txt}>
                                <Text>Date and Time: {results1[1].date}</Text>
                                <Text>Temp: {results1[1].temp}°C</Text>
                                <Text>Date and Time: {results1[2].date}</Text>
                                <Text>Temp: {results1[2].temp}°C</Text>
                            </View>
                        ) : (
                            <Text>No forecast data available</Text>
                        )}
                    </>
                ) : (
                    <Text>Loading data...</Text>
                )}
            </View>
        </View>
    );
};

export default SearchScreen;


import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootState, clearCities, setCities } from "../redux/store";
import { HomeStyle } from "../styles/style";
import { Result } from "../types/type";

const HomeScreen: React.FC<Result> = ({ navigation }) => {
    const dispatch = useDispatch();
    const cities = useSelector((state: RootState) => state.city.city);

    useEffect(() => {
        (async () => {
            try {
                const citiesData = await AsyncStorage.getItem("cities");
                if (citiesData) {
                    dispatch(setCities(JSON.parse(citiesData)));
                }
            } catch (error) {
                console.error("Error loading cities from AsyncStorage", error);
            }
        })();
    }, [dispatch]);

    const handleClearCities = async () => {
        try {
            dispatch(clearCities());
            await AsyncStorage.removeItem("cities");
        } catch (error) {
            console.error("Error clearing cities from AsyncStorage", error);
        }
    };

    return (
        <View style={HomeStyle.container}>
            <TouchableOpacity
                style={HomeStyle.button}
                onPress={() => navigation.navigate("SearchScreen", { term: "" })}
            >
                <Text style={HomeStyle.buttonText}>Go to SearchScreen</Text>
            </TouchableOpacity>

            {cities.length > 0 ? (
                <FlatList
                    data={cities}
                    keyExtractor={(item) => item.city}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={HomeStyle.item}
                            onPress={() => navigation.navigate("SearchScreen", { term: item.city })}
                        >
                            <Text style={HomeStyle.itemText}>{item.city}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={HomeStyle.noDataText}>No cities selected</Text>
            )}

            <TouchableOpacity
                style={[HomeStyle.button, HomeStyle.clearButton]}
                onPress={handleClearCities}
            >
                <Text style={HomeStyle.buttonText}>Clear Cities</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

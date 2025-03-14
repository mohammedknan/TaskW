import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import DetailsScreen from "../screens/DetailsScreen";

export type RootStackParamList = {
    HomeScreen : undefined ;
    SearchScreen: {term?:string};
    DetailsScreen: {term :string};

  };
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "HomeScreen" }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "SearchScreen" }} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: "DetailsScreen" }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;

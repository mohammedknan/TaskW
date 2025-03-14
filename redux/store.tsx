import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

interface City {
  city: string;
}

interface CityState {
  city: City[];
}

const initialState: CityState = {
  city: [],
};

const persistConfig = {
  key: "city",
  storage: AsyncStorage,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.city = action.payload;
      AsyncStorage.setItem("cities", JSON.stringify(action.payload));
    },
    addCity: (state, action: PayloadAction<City>) => {
      if (!state.city.some((c) => c.city === action.payload.city)) {
        state.city.push(action.payload);
        AsyncStorage.setItem("cities", JSON.stringify(state.city));
      }
    },
    clearCities: (state) => {
      state.city = [];
      AsyncStorage.removeItem("cities");
    },
  },
});

const persistedReducer = persistReducer(persistConfig, citySlice.reducer);

export const { setCities, addCity, clearCities } = citySlice.actions;

export const store = configureStore({
  reducer: {
    city: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

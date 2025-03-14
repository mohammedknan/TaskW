import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    fetchWeather(city: string): Promise<{ temp: number; temp_min: number; temp_max: number }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('WeatherModule');




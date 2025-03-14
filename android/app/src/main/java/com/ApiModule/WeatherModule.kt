package com.ApiModule

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import retrofit2.*
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


data class MainWeather(
    val temp: Double,
    val temp_min: Double,
    val temp_max: Double
)

data class WeatherResponse(
    val main: MainWeather,
    val list: List<WeatherItem>? = null
)

data class WeatherItem(
    val dt_txt: String,
    val main: TemperatureInfo

)

data class TemperatureInfo(
    val temp: Double,
    val temp_min: Double,
    val temp_max: Double
)

interface WeatherApiService {
    @GET("weather")
    fun getWeather(
        @Query("q") city: String,
        @Query("appid") apiKey: String
    ): Call<WeatherResponse>
}

interface WeatherForecastService {
    @GET("forecast")
    fun getForecast(
        @Query("q") city: String,
        @Query("appid") apiKey: String,
        @Query("units") units: String = "metric"
    ): Call<WeatherResponse>
}

@ReactModule(name = WeatherModule.NAME)
class WeatherModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME = "WeatherModule"
        private const val API_KEY = "bd89730083e87da96f0fa0a709676d0b"
        private const val BASE_URL = "https://api.openweathermap.org/data/2.5/"
    }

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private val weatherService: WeatherApiService = retrofit.create(WeatherApiService::class.java)
    private val forecastService: WeatherForecastService = retrofit.create(WeatherForecastService::class.java)

    override fun getName(): String {
        return NAME
    }
    @ReactMethod
    fun fetchWeather(city: String, promise: Promise) {
        weatherService.getWeather(city, API_KEY).enqueue(object : Callback<WeatherResponse> {
            override fun onResponse(call: Call<WeatherResponse>, response: Response<WeatherResponse>) {
                if (response.isSuccessful) {
                    response.body()?.let { weatherData ->
                        val result = Arguments.createMap().apply {
                            putDouble("temp", weatherData.main.temp)
                            putDouble("temp_min", weatherData.main.temp_min)
                            putDouble("temp_max", weatherData.main.temp_max)
                        }
                        promise.resolve(result)
                    } ?: promise.reject("PARSING_ERROR", "Failed to parse weather data")
                } else {
                    promise.reject("API_ERROR", "Failed to fetch weather data")
                }
            }

            override fun onFailure(call: Call<WeatherResponse>, t: Throwable) {
                promise.reject("NETWORK_ERROR", t.message)
            }
        })
    }

    @ReactMethod
    fun fetchWeather12(city: String, promise: Promise) {
        forecastService.getForecast(city, API_KEY).enqueue(object : Callback<WeatherResponse> {
            override fun onResponse(call: Call<WeatherResponse>, response: Response<WeatherResponse>) {
                if (response.isSuccessful) {
                    val weatherData = response.body()
                    val weatherArray = Arguments.createArray()

                    weatherData?.list?.forEach { item ->
                        val weatherMap = Arguments.createMap().apply {
                            putString("date", item.dt_txt)
                            putDouble("temp", item.main.temp)
                            putDouble("temp_min", item.main.temp_min)
                            putDouble("temp_max", item.main.temp_max)

                        }
                        weatherArray.pushMap(weatherMap)
                    }
                    promise.resolve(weatherArray)
                } else {
                    promise.reject("API_ERROR", "Failed to fetch weather forecast data")
                }
            }

            override fun onFailure(call: Call<WeatherResponse>, t: Throwable) {
                promise.reject("NETWORK_ERROR", t.message)
            }
        })
    }
}

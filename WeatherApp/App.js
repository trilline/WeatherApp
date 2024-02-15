import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import DayWeather from './DayWeather';
import LocationComponent from './LocationComponent';
import ForecastComponent from './ForecastComponent';

const API_KEY = 'e37256be6b72461d97f5f221359bd2bb';

const fetchWeatherForecast = async (latitude, longitude, apiKey) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const fetchWeather = async (latitude, longitude) => {
        try {
          console.log('lat:', latitude);
          console.log('lon:', longitude);
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);


          return response.data;
        } catch (error) {
          console.error('Error fetching weather data:', error);
          return null;
        }
      };

    

      try {
        const { coords } = location;
        const weatherData = await fetchWeather(coords.latitude, coords.longitude);
        if (weatherData) {
          setWeatherData(weatherData);
        }
      } catch (error) {
        console.error('Error getting location or weather data:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true); 
        if (location) {
          const { coords } = location;
          const response = await fetchWeatherForecast(coords.latitude, coords.longitude, API_KEY);
          setWeatherForecast(response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setErrorMsg('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeatherApp</Text>
      {loading ? 
      ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
      <DayWeather  weatherData = {weatherData} errorMsg={ errorMsg}>
      </DayWeather>
      <ForecastComponent weatherForecast = {weatherForecast}>

      </ForecastComponent>
      <LocationComponent>
      </LocationComponent>
        </>
      )}

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:410,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  forecastDay: {
    marginRight: 20,
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastItems: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  forecastItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

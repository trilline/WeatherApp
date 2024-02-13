/*import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = 'e37256be6b72461d97f5f221359bd2bb';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

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

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.text}>Ville: {weatherData.name}</Text>
          <Text style={styles.text}>Température: {weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Description: {weatherData.weather[0].description}</Text>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` }}
          />
        </>
      ) : (
        <Text style={styles.text}>Chargement de la météo...</Text>
      )}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
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
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
*/
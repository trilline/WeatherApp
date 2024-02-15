import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
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

const groupForecastByDay = (forecastList) => {
  const groupedForecast = {};
  forecastList.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0]; // Extract date from dt_txt
    if (!groupedForecast[date]) {
      groupedForecast[date] = [];
    }
    groupedForecast[date].push(forecast);
  });
  return groupedForecast;
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);


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
        if (location) {
          const { coords } = location;
          const response = await fetchWeatherForecast(coords.latitude, coords.longitude, API_KEY);
          setWeatherForecast(response);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setErrorMsg('Error fetching weather data');
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <View style={styles.container}>
      <DayWeather  weatherData = {weatherData} errorMsg={ errorMsg}>

      </DayWeather>
      {/*{weatherData ? (
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
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}*/}

<ForecastComponent weatherForecast = {weatherForecast}>

</ForecastComponent>
   {/*}   <ScrollView  horizontal={false}>
        {weatherForecast ? (
          Object.keys(groupForecastByDay(weatherForecast.list)).map((date, index) => (
            <View key={index} style={styles.forecastDay}>
              <Text style={styles.date}>{date}</Text>
              <ScrollView horizontal={true} style={styles.forecastItems}>
                {groupForecastByDay(weatherForecast.list)[date].map((forecast, index) => (
                  <View key={index} style={styles.forecastItem}>
                    <Text>Heure : {forecast.dt_txt.split(' ')[1]}</Text>
                    <Text>Température : {forecast.main.temp}°C</Text>
                    <Text>Description : {forecast.weather[0].description}</Text>
                    <Image
                      style={styles.weatherIcon}
                      source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png` }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ))
        ) : (
          <Text style={styles.text}>Chargement des prévisions météorologiques...</Text>
        )}
        </ScrollView>*/}
        <LocationComponent>
          
        </LocationComponent>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
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

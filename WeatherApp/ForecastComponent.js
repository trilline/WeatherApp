import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

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

export default function ForecastComponent({ weatherForecast }) {
  return (
    <View>
      <ScrollView  horizontal={false}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
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
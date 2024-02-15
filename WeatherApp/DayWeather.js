import React from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';

export default function WeatherComponent({ weatherData, errorMsg }) {
  return (
    <View>
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
});
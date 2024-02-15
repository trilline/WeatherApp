import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function WeatherComponent({ weatherData, errorMsg }) {
  return (
    <View style={styles.card}>
      {weatherData ? (
        <>
          <Text style={styles.weatherInfoText}>Ville: {weatherData.name}</Text>
          <Text style={styles.weatherInfoText}>Température: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherInfoText}>Description: {weatherData.weather[0].description}</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 2, 
    marginBottom: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
  },
  weatherInfoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333', // Couleur du texte gris foncé
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

    </View>
  );
}
const styles = StyleSheet.create({

    error: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
      margin: 10,
    },
  });
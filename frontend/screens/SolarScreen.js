import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function SolarScreen() {
  const [capacity, setCapacity] = useState('2');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const getForecast = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location denied');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE}/solar/forecast`, {
        params: {
          lat: lat.toString(),
          lon: lon.toString(),
          capacity_kw: capacity,
        },
      });
      setForecast(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter capacity (kW)"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />
      <Button title="Get Forecast" onPress={getForecast} disabled={loading} />
      {loading && <Text>Loading...</Text>}
      {forecast && (
        <View style={{ marginTop: 20 }}>
          <Text>Sunrise: {forecast.sunrise}</Text>
          <Text>Sunset: {forecast.sunset}</Text>
          <Text>Estimated Generation: {forecast.est_generation_kWh} kWh</Text>
        </View>
      )}
    </View>
  );
}

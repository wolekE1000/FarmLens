import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function LivestockScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [species, setSpecies] = useState('sheep');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyze = async () => {
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'livestock.jpg',
      type: 'image/jpeg',
    });
    formData.append('species', species);
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE}/predict/livestock`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Picker
        selectedValue={species}
        onValueChange={(itemValue) => setSpecies(itemValue)}
        style={{ height: 50, width: '100%' }}
      >
        <Picker.Item label="Sheep" value="sheep" />
        <Picker.Item label="Chicken" value="chicken" />
        <Picker.Item label="Cattle" value="cattle" />
      </Picker>
      <Button title="Pick Image" onPress={pickImage} disabled={uploading} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      <Button title="Analyze" onPress={analyze} disabled={uploading || !image} />
      {uploading && <Text>Analyzing...</Text>}
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text>Health: {result.health_label}</Text>
        </View>
      )}
    </View>
  );
}

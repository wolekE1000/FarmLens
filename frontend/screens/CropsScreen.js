import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function CropsScreen() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const resultPick = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });
    if (!resultPick.canceled) {
      setImage(resultPick.assets[0].uri);
      setResult(null);
    }
  };

  const analyze = async () => {
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('crop_type', 'unknown');
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE}/predict/crop`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 16 }}
        />
      )}
      <Button title="Analyze" onPress={analyze} disabled={!image || uploading} />
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text>Diagnosis: {result.diagnosis}</Text>
          {result.confidence && <Text>Confidence: {result.confidence}</Text>}
        </View>
      )}
    </View>
  );
}

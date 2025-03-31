import { createNewHumidor, uploadHumidorImage } from "@/api/humidorQueries"
import { useState } from "react"
import { Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import { styles } from "../cigar/CigarFormV2Styles"
import { router } from "expo-router"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'

export const AddHumidorFormV2: React.FC<{}> = () => {

  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('')
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [imagePath, setImagePath] = useState<string | null>(null)

  const handleSaveHumidor = async () => {
    if (!name || !capacity) {
      Alert.alert('Error', 'Please fill in all required fields')
      return;
    }

    const capacityNumber = parseInt(capacity, 10)

    if (isNaN(capacityNumber)) {
      Alert.alert('Error', "Capacity must be number")
      return;
    }

    try {
      const newHumidor = {
        name,
        capacity: capacityNumber,
        image_url: imagePath
      }

      await createNewHumidor(newHumidor)
      console.log(newHumidor)
      Alert.alert('Success', 'Humidor saved successfully!')
      router.back()
    } catch (error) {
      console.error("Error saving humidor: ", error)
      Alert.alert('Error', 'An error occured. Please try again')
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled) {
      return
    }

    const image = result.assets[0]
    const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
    setImageUri(image.uri)

    try {
      const imagePath = await uploadHumidorImage(base64)
      setImagePath(imagePath)
      console.log("Successfully Uploaded Image")
    } catch (error) {
      console.error("Upload Image Error: ", error)
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Pressable style={styles.saveButton} onPress={pickImage}>
        <Text style={styles.saveButtonText}>Add Image</Text>
      </Pressable>

      {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} /> : null}

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Capacity:</Text>
      <TextInput
        style={styles.input}
        value={capacity}
        onChangeText={setCapacity}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveHumidor}>
        <Text style={styles.saveButtonText}>Save Humidor</Text>
      </TouchableOpacity>
    </ScrollView>
  )

}

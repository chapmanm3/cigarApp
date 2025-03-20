import { createNewHumidor } from "@/api/humidorQueries"
import { useState } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import { styles } from "../cigar/CigarFormV2Styles"
import { router } from "expo-router"

export const AddHumidorFormV2: React.FC<{}> = () => {

  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('')

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
        capacity: capacityNumber
      }

      await createNewHumidor(newHumidor)
      console.log(newHumidor)
      Alert.alert('Success', 'Cigar saved successfully!')
      router.back()
    } catch (error) {
      console.error("Error saving humidor: ", error)
      Alert.alert('Error', 'An error occured. Please try again')
    }
  }

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.saveButtonText}>Save Cigar</Text>
      </TouchableOpacity>
    </ScrollView>
  )

}

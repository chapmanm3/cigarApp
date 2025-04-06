import { formStyles } from "@/styles/formStyles";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { Picker } from "@react-native-picker/picker";
import { UserCigar, updateCigar, uploadCigarImage } from "@/api/cigarsQueries";


interface EditCigarFormInnerProps {
  cigar: UserCigar
}

function EditCigarFormInner({ cigar }: EditCigarFormInnerProps) {
  const [name, setName] = useState(cigar.name ?? '');
  const [brand, setBrand] = useState(cigar.brand ?? '');
  const [vitola, setVitola] = useState(cigar.vitola ?? '');
  const [origin, setOrigin] = useState(cigar.origin ?? '');
  const [wrapper, setWrapper] = useState(cigar.wrapper ?? '');
  const [binder, setBinder] = useState(cigar.binder ?? '');
  const [filler, setFiller] = useState(cigar.filler ?? '');
  const [strength, setStrength] = useState(cigar.strength ?? '');
  const [purchaseDate, setPurchaseDate] = useState(cigar.purchase_date ?? '');
  const [price, setPrice] = useState(cigar.price?.toString() ?? '');
  const [quantity, setQuantity] = useState(cigar.quantity?.toString() ?? '');
  const [notes, setNotes] = useState(cigar.notes ?? '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [imageUri, setImageUri] = useState<string | null>(cigar.image_url)

  const styles = formStyles

  const handleSaveCigar = async () => {
    // Implement client-side validation here
    if (!name || !brand || !vitola) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Convert price and quantity to numbers

    try {
      // Prepare the data to be sent to Supabase
      const newCigar = {
        ...cigar,
        name,
        brand,
        vitola,
        origin,
        wrapper,
        binder,
        filler,
        strength,
        purchase_date: purchaseDate ? purchaseDate : cigar.purchase_date,
        price: parseInt(price),
        quantity: parseInt(quantity),
        notes,
        image_url: imagePath
      };

      await updateCigar(newCigar)
      console.log(newCigar);
      Alert.alert('Success', 'Cigar updated successfully!');
      router.back()
    } catch (error: any) {
      console.error('Unexpected error updating cigar:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate?.toISOString() || purchaseDate;
    setShowDatePicker(false);
    setPurchaseDate(currentDate);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled) {
      return
    }

    const image = result.assets[0]
    const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
    setImageUri(image.uri)

    try {
      const imagePath = await uploadCigarImage(base64)
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
        placeholder="Cigar Name"
      />

      <Text style={styles.label}>Brand:</Text>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={setBrand}
        placeholder="Cigar Brand"
      />

      <Text style={styles.label}>Vitola:</Text>
      <TextInput
        style={styles.input}
        value={vitola}
        onChangeText={setVitola}
        placeholder="Cigar Vitola"
      />

      <Text style={styles.label}>Origin:</Text>
      <TextInput
        style={styles.input}
        value={origin}
        onChangeText={setOrigin}
        placeholder="Cigar Origin"
      />

      <Text style={styles.label}>Wrapper:</Text>
      <TextInput
        style={styles.input}
        value={wrapper}
        onChangeText={setWrapper}
        placeholder="Cigar Wrapper"
      />

      <Text style={styles.label}>Binder:</Text>
      <TextInput
        style={styles.input}
        value={binder}
        onChangeText={setBinder}
        placeholder="Cigar Binder"
      />

      <Text style={styles.label}>Filler:</Text>
      <TextInput
        style={styles.input}
        value={filler}
        onChangeText={setFiller}
        placeholder="Cigar Filler"
      />

      <Text style={styles.label}>Strength:</Text>
      <Picker
        selectedValue={strength}
        onValueChange={(itemValue) => setStrength(itemValue)}
      >
        <Picker.Item label="Mild" value="Mild" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Strong" value="Strong" />
      </Picker>

      {/*
      <Text style={styles.label}>Purchase Date:</Text>
      <Pressable
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {purchaseDate.toLocaleDateString()}
        </Text>
      </Pressable>
      */}

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(purchaseDate)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Cigar Price"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Cigar Quantity"
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Tasting Notes"
        multiline
        numberOfLines={4}
      />

      <Pressable style={styles.saveButton} onPress={handleSaveCigar}>
        <Text style={styles.saveButtonText}>Save Cigar</Text>
      </Pressable>
    </ScrollView>
  );
};

export function EditCigarFormWrapper() {
  const { cigarString } = useLocalSearchParams<{ cigarString: string }>()
  console.log(cigarString)
  const cigar: UserCigar = JSON.parse(cigarString)

  return (
    <EditCigarFormInner cigar={cigar} />
  )
}

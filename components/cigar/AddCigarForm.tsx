import { postCigarForm } from "@/api/cigarsQueries";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import invariant from "tiny-invariant";

export default function AddCigarForm() {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()

  const onFormSubmit = () => {
    invariant(name, "Name should be defined")
    invariant(description, "Description should be defined")
    const cigarForm = {
      name,
      description
    }
    postCigarForm(cigarForm)
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <View style={{
        padding: 10,
      }}>
        <Text style={{ height: 200, width: 200 }}>Image Placeholder</Text>
      </View>
      <View style={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        <Text>Name:</Text>
        <TextInput
          value={name ?? ''}
          onChangeText={setName}
          style={{
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000000",
            borderRadius: 5,
            padding: 2,
            margin: 10,
          }}
        />
        <Text>Description:</Text>
        <TextInput
          value={description ?? ''}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          style={{
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000000",
            borderRadius: 5,
            padding: 2,
            margin: 10,
          }}
        />
        <Button
          onPress={onFormSubmit}
          title='Add Cigar'
          disabled={name === undefined || description === undefined}
        />
      </View>
    </View>
  )
}

import { signUpUser } from "@/api/auth"
import { formStyles } from "@/styles/formStyles"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Pressable, TextInput, Text, View, Alert } from "react-native"

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const style = formStyles

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const authResponse = await signUpUser(email, password)
      if (authResponse.error) {
        Alert.alert("Error", "Something went wrong please try again")
      } else if (authResponse.data) {
        router.dismissAll()
      }
    } catch (e: unknown) {
      console.error(e)
      Alert.alert("Error", "Something went wrong please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        value={email}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={setEmail}
      />

      <TextInput
        style={style.input}
        value={password}
        placeholder="Password"
        textContentType="password"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={style.input}
        value={confirmPassword}
        placeholder="Confirm Password"
        textContentType="password"
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Pressable style={style.saveButton} onPress={onSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text style={style.saveButtonText}>Create Account</Text>}
      </Pressable>
    </View>
  )
}

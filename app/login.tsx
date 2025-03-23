import { loginUser } from "@/api/auth"
import { formStyles } from "@/styles/formStyles"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Alert, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const style = formStyles

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const authResponse = await loginUser(email, password)
      if (authResponse.error) {
        Alert.alert("Error", "Something went wrong please try again")
      } else if (authResponse.data !== null) {
        router.back()
      }
    } catch (e: unknown) {
      Alert.alert("Error", "Something went wrong please try again")
      throw e
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
        textContentType="username"
        onChangeText={setEmail}
      />
      <TextInput
        style={style.input}
        value={password}
        placeholder="password"
        textContentType="password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Pressable style={style.saveButton} onPress={onSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text style={style.saveButtonText}>Login</Text>}
      </Pressable>
    </View>
  )
}

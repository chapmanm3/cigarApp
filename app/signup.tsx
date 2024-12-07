import { signUpUser } from "@/api/auth"
import { useState } from "react"
import { Button, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import invariant from "tiny-invariant"



export default function SignUp() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const onSubmit = () => {
    invariant(email, "Need Email")
    invariant(password, "Need Email")

    signUpUser(email, password)
  }

  return (
    <View style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Text>Email: </Text>
      <TextInput
        value={email ?? ''}
        onChangeText={setEmail}
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#000000",
          borderRadius: 5,
          padding: 2,
          margin: 10,
        }}
      />
      <Text>Password: </Text>
      <TextInput
        value={password ?? ''}
        onChangeText={setPassword}
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
        onPress={onSubmit}
        title="Create Account"
        disabled={!email || !password}
      />
    </View>
  )
}

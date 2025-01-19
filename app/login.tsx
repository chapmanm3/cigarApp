import { signUpUser } from "@/api/auth"
import { useState } from "react"
import { Button, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import invariant from "tiny-invariant"

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const onSubmit = () => {
    invariant(email, "Need Email")
    invariant(password, "Need Email")

    signUpUser(email, password)
  }

  return (
    <Text>Login Form</Text>
  )
}

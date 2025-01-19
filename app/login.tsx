import { loginUser, signUpUser } from "@/api/auth"
import { Button, ButtonText } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { AlertCircleIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false)
  const [firebaseError, setFirebaseError] = useState<string>("")

  const mapFirebaseError = (error: string) => {
    switch(error){
      case "INVALID_LOGIN_CREDENTIALS":
        return "Email or password incorrect"
      default:
        return "An error occured please try again"
    }
  }

  const onSubmit = () => {
    loginUser(email, password)
    .then((user) => {

    })
    .catch(e => {
      setFirebaseError(mapFirebaseError(e.message))
    })
  }

  return (
    <Center>
      <VStack space="md" className="w-full max-w-[500px] rounded-md border border-background-200 p-4 m-4">
        <FormControl isInvalid={isEmailInvalid} size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              An email is required
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={isPasswordInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired={true} >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Input>
        </FormControl>

        <FormControl isInvalid={firebaseError !== ""} size="md" isDisabled={false} isReadOnly={true} isRequired={false} >
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {firebaseError}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button className="w-fit self-start mt-4" size="sm" onPress={onSubmit}>
          <ButtonText>Login</ButtonText>
        </Button>
      </VStack>
    </Center>
  )
}

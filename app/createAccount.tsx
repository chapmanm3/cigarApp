import { signUpUser } from "@/api/auth"
import { Button, ButtonText } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { AlertCircleIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { router } from "expo-router"
import { useState } from "react"

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("")
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string>("")

  const onSubmit = async () => {
    if (!email) {
      setIsEmailInvalid(true)
      return;
    } else {
      setIsEmailInvalid(false)
    }

    if (!password) {
      setIsPasswordInvalid(true)
      return;
    } else {
      setIsPasswordInvalid(false)
    }

    if (!confirmPassword || (confirmPassword !== password)) {
      setIsConfirmPasswordInvalid(true)
      return;
    } else {
      setIsConfirmPasswordInvalid(false)
    }

    try {
      const authResponse = await signUpUser(email, password)
      if (authResponse.error) {
        setAuthError(authResponse.error.message)
      } else if (authResponse.data) {
        router.push("/")
      }
    } catch (e: unknown) {
      setAuthError("Something went wrong")
      console.error(e)
    }
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
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={isConfirmPasswordInvalid} size="md" isDisabled={false} isReadOnly={false} isRequired={true} >
          <FormControlLabel>
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Passwords must match
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={isAuthError} size="md" isDisabled={false} isReadOnly={true} isRequired={false} >
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              An error occured. Please try again
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button className="w-fit self-start mt-4" size="sm" onPress={onSubmit}>
          <ButtonText>Create Account</ButtonText>
        </Button>
      </VStack>
    </Center>
  )
}

import { createHumidorQuery } from "@/api/humidorQueries"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator } from "react-native"
import { Center } from "../ui/center"
import { VStack } from "../ui/vstack"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "../ui/form-control"
import { Input, InputField } from "../ui/input"
import { AlertCircleIcon } from "../ui/icon"
import { Textarea, TextareaInput } from "../ui/textarea"
import { HStack } from "../ui/hstack"
import { Button, ButtonText } from "../ui/button"

export default function AddHumidorForm() {
  const [name, setName] = useState<string>("")
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onFormCancel = () => {
    router.push('/humidors')
  }

  const onFormSubmit = () => {
    if (!name) {
      setIsNameInvalid(true)
      return;
    }
    if (!description) {
      setIsDescriptionInvalid(true)
      return;
    }
    setLoading(true)
    const humidorForm = {
      name,
      description
    }
    createHumidorQuery(humidorForm).then(() => {
      setLoading(false)
      router.push('/humidors')
    })
  }

  if (loading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <Center>
      <VStack space="md" className="w-full max-w-[500px] rounded-md border border-background-200 p-4 m-4">
        <FormControl isInvalid={isNameInvalid} size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Name</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              A name is required
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={isDescriptionInvalid} size="md" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Description</FormControlLabelText>
          </FormControlLabel>
          <Textarea>
            <TextareaInput
              type="text"
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </Textarea>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              A description is required
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <HStack className="w-full flex-initial justify-between">
          <Button className="w-fit mt-4" size="sm" onPress={onFormSubmit}>
            <ButtonText>Add Humidor</ButtonText>
          </Button>

          <Button className="w-fit mt-4" size="sm" onPress={onFormCancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Center>
  )
}

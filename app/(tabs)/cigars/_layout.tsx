import { Stack } from "expo-router";

export default function CigarsLayout() {
  return (
    <Stack>
      <Stack.Screen name="/" />
      <Stack.Screen name="addCigar" />
    </Stack>
  )
}

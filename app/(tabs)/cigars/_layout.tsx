import { Stack } from "expo-router";

export default function CigarsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="addCigar" />
      <Stack.Screen name="editCigar" />
    </Stack >
  )
}

import { Stack } from "expo-router";

export default function HumidorsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="addHumidor" />
    </Stack >
  )
}

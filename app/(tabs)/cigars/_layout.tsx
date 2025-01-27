import { headingStyle } from "@/components/ui/heading/styles";
import { Stack } from "expo-router";

export default function CigarsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="/" />
      <Stack.Screen name="addCigar" />
    </Stack >
  )
}

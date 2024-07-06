import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "gray",
          
        }
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

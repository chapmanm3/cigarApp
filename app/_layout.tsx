import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </GluestackUIProvider>
  );
}

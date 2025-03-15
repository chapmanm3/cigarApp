import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { RootSiblingParent } from "react-native-root-siblings";
import { AppState } from "react-native";
import { supabase } from "@/utils/supabase";
import { SessionContextProvider } from "@/components/contexts/UserContext";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <SessionContextProvider>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RootSiblingParent>
      </SessionContextProvider>
    </GluestackUIProvider>
  );
}

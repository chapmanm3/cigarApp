import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="humidor" />
      <Tabs.Screen name="cigar" />
      <Tabs.Screen name="lounge" />
      <Tabs.Screen name="discover" />
    </Tabs>
  )
}

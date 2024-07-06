import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TabBarMaterial } from '@/components/navigation/TabBarMaterial';
import { TabBarMaterialCommunity } from '@/components/navigation/TabBarMaterialCommunity';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="humidor" 
        options={{
          title: "Humidor",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name="briefcase" color={color} />
          )
        }}
        />
      <Tabs.Screen
        name="cigar"
        options={{
          title: "Cigar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarMaterialCommunity name='cigar' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="lounge"
        options={{
          title: "Lounge",
          tabBarIcon: ({ color, focused }) => (
            <TabBarMaterial name="other-houses" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <TabBarMaterialCommunity name="notebook" color={color} />
          )
        }}
      />
    </Tabs>
  )
}

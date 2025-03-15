import { HeaderRight } from '@/components/header/HeaderRight';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TabBarMaterial } from '@/components/navigation/TabBarMaterial';
import { TabBarMaterialCommunity } from '@/components/navigation/TabBarMaterialCommunity';
import { Box } from '@/components/ui/box';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f0f0f0",
        },
        headerTitleStyle: {
          color: "#333"
        },
        tabBarStyle: {
          backgroundColor: "#f0f0f0"
        },
        tabBarActiveTintColor: "#654321",
        headerLeft: () => (
          <Box className='ml-2'>
            <Text>Embargo</Text>
          </Box>
        ),
        headerRight: () => (
          <HeaderRight />
        ),
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="humidors"
        options={{
          title: "Humidor",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="briefcase" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="cigars"
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
      <Tabs.Screen
        name='index'
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}

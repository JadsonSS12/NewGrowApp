import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeScreen from '../pages/Home2/HomeScreen';
import SpaceDetailsScreen from '../pages/Home2/SpaceDetailsScreen';
import DeviceScreen from '../pages/Devices/DeviceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#44A266', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          height: 60, 
          paddingBottom: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" type="feather" color={color} size={focused ? 28 : 25} />
          )
        }}
      />
      <Tab.Screen 
        name="List" 
        component={HomeScreen} // Substituir pela tela de lista futuramente
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="list" type="feather" color={color} size={focused ? 28 : 25} />
          )
        }}
      />
      <Tab.Screen 
        name="Devices" 
        component={DeviceScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="router" color={color} size={focused ? 28 : 25} />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={HomeScreen} // Substituir pela tela de perfil futuramente
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="user" type="feather" color={color} size={focused ? 28 : 25} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpaceDetails"
          component={SpaceDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
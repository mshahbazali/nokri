import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Booking, MyWorkArea, Profile, AllServices, } from '../../../../Screen/Provider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Stack from '../Stack'
export default function Index() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Stack" component={Stack} options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Booking',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="auto-awesome-mosaic" color={color} size={size} />
                ),
            }} name="BookingProvider" component={Booking} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Services',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="miscellaneous-services" size={size} color={color} />
                ),
            }} name="Services" component={AllServices} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Work Area',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="location-pin" size={size} color={color} />
                ),
            }} name="MyWorkArea" component={MyWorkArea} />

            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="user" color={color} size={size} />
                ),
            }} name="ProfileProvider" component={Profile} />
        </Tab.Navigator>
    )
}
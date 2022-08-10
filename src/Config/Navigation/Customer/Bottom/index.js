import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Booking, Cart, AllInbox, Inbox, Favorites, Home, MyAddress, Notification, Profile } from '../../../../Screen/Customer'
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
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite" color={color} size={size} />
                ),
            }} name="FavoritesCustomer" component={Favorites} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="shopping-cart" color={color} size={size} />
                ),
            }} name="CartCustomer" component={Cart} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Booking',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="auto-awesome-mosaic" color={color} size={size} />
                ),
            }} name="BookingCustomer" component={Booking} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="user" color={color} size={size} />
                ),
            }} name="ProfileCustomer" component={Profile} />
        </Tab.Navigator>
    )
}
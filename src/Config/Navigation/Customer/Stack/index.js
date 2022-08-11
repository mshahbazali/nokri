import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Booking, Cart, AllInbox, Inbox, Favorites, Home, MyAddress, Notification, Profile } from '../../../../Screen/Customer'
import { UserProfile } from '../../../../Screen/Provider';
import Authentication from '../../Authentication'
import Header from '../../../../Components/Header'
export default function Index() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="HomeCustomer" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Authentication" component={Authentication} />
            <Stack.Screen options={{ headerShown: false }} name="BookingCustomer" component={Booking} />
            <Stack.Screen options={{ headerShown: false }} name="CartCustomer" component={Cart} />
            <Stack.Screen options={{ headerShown: false }} name="FavoritesCustomer" component={Favorites} />
            <Stack.Screen options={{ headerShown: false }} name="MyAddress" component={MyAddress} />
            <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
            <Stack.Screen options={{ headerShown: false }} name="ProfileCustomer" component={Profile} />
            <Stack.Screen options={{ headerShown: false }} name="Inbox" component={Inbox} />
            <Stack.Screen options={{ headerShown: false }} name="AllInbox" component={AllInbox} />
            <Stack.Screen options={{ headerShown: false }} name="header" component={Header} />
            <Stack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />

        </Stack.Navigator>
    )
}
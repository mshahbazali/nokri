import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Booking, Home, Profile, Notification, CreateService, UserProfile } from '../../../../Screen/Provider'
import { AllInbox, Inbox } from '../../../../Screen/Customer';
import Header from '../../../../Components/Header'
import Authentication from '../../Authentication'
export default function Index() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="HomeProvider" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Authentication" component={Authentication} />
            <Stack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />
            <Stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
            <Stack.Screen options={{ headerShown: false }} name="Header" component={Header} />
            <Stack.Screen options={{ headerShown: false }} name="AllInbox" component={AllInbox} />
            <Stack.Screen options={{ headerShown: false }} name="Inbox" component={Inbox} />
            <Stack.Screen options={{ headerShown: false }} name="CreateService" component={CreateService} />
        </Stack.Navigator>
    )
}
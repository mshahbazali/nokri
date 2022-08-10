import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, SignUp } from '../../../Screen/Authentication';
import { BottomProvider } from '../Provider';
import { BottomCustomer } from '../Customer';
export default function Index() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            <Stack.Screen options={{ headerShown: false }} name="BottomCustomer" component={BottomCustomer} />
            <Stack.Screen options={{ headerShown: false }} name="BottomProvider" component={BottomProvider} />
        </Stack.Navigator>
    )
}
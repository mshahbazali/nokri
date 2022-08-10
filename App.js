import { View, Text } from 'react-native'
import React from 'react'
import { Home, Booking, Profile, AllServices } from './src/Screen/Provider'
import { Stack, BottomProvider } from './src/Config/Navigation/Provider'
import { BottomCustomer } from './src/Config/Navigation/Customer'
import Authentication from './src/Config/Navigation/Authentication'
import { NavigationContainer } from '@react-navigation/native'
import { SignIn, SignUp } from './src/Screen/Authentication'
export default function App() {
  return (
    <NavigationContainer>
      <BottomProvider />
    </NavigationContainer>
  )
}
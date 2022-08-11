import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Home, Booking, Profile, AllServices, UserProfile } from './src/Screen/Provider'
import { Stack, BottomProvider } from './src/Config/Navigation/Provider'
import { BottomCustomer } from './src/Config/Navigation/Customer'
import Authentication from './src/Config/Navigation/Authentication'
import { NavigationContainer } from '@react-navigation/native'
import { SignIn, SignUp } from './src/Screen/Authentication'
import { AuthProvider } from './src/Context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './src/Screen/Splash'
export default function App() {
  const [splash, setSplash] = useState(false)
  const [user, setUser] = useState(false)
  const getUser = async () => {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
  }
  useEffect(() => {
    setTimeout(() => {
      setSplash(true)
    }, 3000);
    getUser()
  }, [])
  return (
    splash == false ?
      <Splash /> :
      <AuthProvider>
        <NavigationContainer>
          {
            user == false ?
              <Authentication />
              :
              user.userType == "Customer" ?
                <BottomCustomer />
                :
                <BottomProvider />
          }
        </NavigationContainer>
      </AuthProvider>

  )
}
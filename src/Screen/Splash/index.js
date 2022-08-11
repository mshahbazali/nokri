import { View, Image } from 'react-native'
import React from 'react'

export default function index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image source={require("../../Assets/Image/logo.jpeg")} style={{ width: 150, height: 210 }} />
        </View>
    )
}
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Index({ navigation }) {
    const [focusInputFour, setFocusInputFourFocus] = useState(false)
    const [focusInputSeven, setFocusInputSevenFocus] = useState(false)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [validEmail, setValidEmail] = useState();

    const EmailValidate = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setValidEmail(reg.test(text))
        if (reg.test(text) == true) {
            setEmail(text)
        }
    };
    const signInUser = () => {
        const userData = {
            email: email,
            password: password
        }
        auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
            .then(async () => {
                const user = await firestore().collection('Users').doc(userData.email).get();
                if (user._data.userType == "Customer") {
                    navigation.navigate("BottomCustomer")
                }
                else {
                    navigation.navigate("BottomProvider")
                }
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            });
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginTop: 120 }}>
                    <Text style={{ fontSize: 40, color: "#0c6ff0", fontWeight: '800', marginVertical: 40 }}>Sign In</Text>
                    <View style={{ marginVertical: 20 }}>
                        <TextInput keyboardType='email-address' onChangeText={EmailValidate} onFocus={() => {
                            setFocusInputFourFocus(true)
                            setFocusInputSevenFocus(false)
                            setEmailError(undefined)
                        }} placeholder="Email Address" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: validEmail == false ? "red" : emailError !== undefined ? "red" : focusInputFour == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                        <Text style={{ color: "red", marginTop: 5, display: validEmail == false ? "flex" : emailError == undefined ? "none" : "flex" }}>Please Enter Valid Email</Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "100%" }}>
                                <TextInput keyboardType="default" secureTextEntry={passwordVisible == true ? false : true} onChangeText={(text) => setPassword(text)} onFocus={() => {
                                    setFocusInputFourFocus(false)
                                    setFocusInputSevenFocus(true)
                                    setPasswordError(undefined)
                                }} placeholder="Password" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: passwordError !== undefined ? "red" : focusInputSeven == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <AntDesign name="eye" size={30} color={passwordVisible == false ? "#2C2D30" : "#fff"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ color: "red", marginTop: 5, display: passwordError == undefined ? "none" : "flex" }}>Please Enter Password</Text>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <TouchableOpacity onPress={() => {
                            validEmail == false ? setEmailError(true) : null
                            email === undefined ? setEmailError(true) : null
                            password === undefined ? setPasswordError(true) : null
                            email === undefined || password == undefined ? null : signInUser()
                        }} style={{ backgroundColor: email === undefined || password === undefined ? "#0c6ff0" : "#175676", paddingVertical: 10, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center', color: "#fff", fontSize: 22, fontWeight: '400' }}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 68 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={{ backgroundColor: "#0c6ff0", paddingVertical: 10, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center', color: "#fff", fontSize: 22, fontWeight: '400' }}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    }
})
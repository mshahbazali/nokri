import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RadioButtonRN from 'radio-buttons-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Index({ navigation }) {
    const [focusInputOne, setFocusInputOne] = useState(false)
    const [focusInputTwo, setsetFocusInputTwoFocus] = useState(false)
    const [focusInputFour, setFocusInputFourFocus] = useState(false)
    const [focusInputSeven, setFocusInputSevenFocus] = useState(false)
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [confirmPassword, setConfirmPassword] = useState(undefined)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false)
    const [firstNameError, setFirstNameError] = useState()
    const [lastNameError, setLastNameError] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState()
    const [validEmail, setValidEmail] = useState();
    const [userType, setUserType] = useState();

    const EmailValidate = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setValidEmail(reg.test(text))
        if (reg.test(text) == true) {
            setEmail(text)
        }
    };
    const registerUser = () => {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: userType
        }
        auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(() => {
                firestore()
                    .collection('Users')
                    .doc(userData.email)
                    .set(userData)
                    .then(async () => {
                        setFirstName(undefined)
                        setLastName(undefined)
                        setEmail(undefined)
                        setPassword(undefined)
                        setConfirmPassword(undefined)
                        await navigation.navigate("SignIn")
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={{ fontSize: 40, color: "#0c6ff0", fontWeight: '800', marginVertical: 40 }}>Sign Up</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 20 }}>
                        <View style={{ width: "45%" }}>
                            <TextInput keyboardType='default' onChangeText={(text) => setFirstName(text)} onFocus={() => {
                                setFocusInputOne(true)
                                setsetFocusInputTwoFocus(false)
                                setFocusInputFourFocus(false)
                                setFocusInputSevenFocus(false)
                                setFirstNameError(undefined)
                            }} placeholder="First Name" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: firstNameError !== undefined ? "red" : focusInputOne == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                            <Text style={{ color: "red", marginTop: 5, display: firstNameError == undefined ? "none" : "flex" }}>Please Enter First Name</Text>
                        </View>
                        <View style={{ width: "45%" }}>
                            <TextInput keyboardType='default' onChangeText={(text) => setLastName(text)} onFocus={() => {
                                setFocusInputOne(false)
                                setsetFocusInputTwoFocus(true)
                                setFocusInputFourFocus(false)
                                setFocusInputSevenFocus(false)
                                setLastNameError(undefined)
                            }} placeholder="Last Name" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: lastNameError !== undefined ? "red" : focusInputTwo == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                            <Text style={{ color: "red", marginTop: 5, display: lastNameError == undefined ? "none" : "flex" }}>Please Enter Last Name</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <TextInput keyboardType='email-address' onChangeText={EmailValidate} onFocus={() => {
                            setFocusInputOne(false)
                            setsetFocusInputTwoFocus(false)
                            setFocusInputFourFocus(true)
                            setFocusInputSevenFocus(false)
                            setEmailError(undefined)
                        }} placeholder="Your email" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: validEmail == false ? "red" : emailError !== undefined ? "red" : focusInputFour == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                        <Text style={{ color: "red", marginTop: 5, display: validEmail == false ? "flex" : emailError == undefined ? "none" : "flex" }}>Please Enter Valid Email</Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "100%" }}>
                                <TextInput keyboardType="default" secureTextEntry={passwordVisible == true ? false : true} onChangeText={(text) => setPassword(text)} onFocus={() => {
                                    setFocusInputOne(false)
                                    setsetFocusInputTwoFocus(false)
                                    setFocusInputFourFocus(false)
                                    setFocusInputSevenFocus(true)
                                    setPasswordError(undefined)
                                }} placeholder="Create a Password" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: passwordError !== undefined ? "red" : focusInputSeven == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <AntDesign name="eye" size={30} color={passwordVisible == false ? "#2C2D30" : "#fff"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ color: "red", marginTop: 5, display: passwordError == undefined ? "none" : "flex" }}>Please Enter Password</Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: "100%" }}>
                                <TextInput keyboardType="default" secureTextEntry={passwordConfirmVisible == true ? false : true} onChangeText={(text) => setConfirmPassword(text)} onFocus={() => {
                                    setFocusInputOne(false)
                                    setsetFocusInputTwoFocus(false)
                                    setFocusInputFourFocus(false)
                                    setFocusInputSevenFocus(true)
                                    setConfirmPasswordError(undefined)
                                }} placeholder="Confirm Password" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: confirmPasswordError !== undefined ? "red" : focusInputSeven == false ? "#dbdbdb" : "#175676", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)}>
                                    <AntDesign name="eye" size={30} color={passwordConfirmVisible == false ? "#2C2D30" : "#fff"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ color: "red", marginTop: 5, display: confirmPasswordError == undefined ? "none" : "flex" }}>Please Enter Valid Confirm Password</Text>
                    </View>
                    <View>
                        <RadioButtonRN
                            data={[{
                                label: "Provider"
                            },
                            {
                                label: "Customer"
                            }
                            ]}
                            selectedBtn={(e) => setUserType(e.label)}
                            icon={
                                <Fontisto
                                    name="radio-btn-active"
                                    size={20}
                                    color="#0c6ff0"
                                />
                            }
                        />
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <TouchableOpacity onPress={() => {
                            validEmail == false ? setEmailError(true) : null
                            firstName === undefined ? setFirstNameError(true) : null
                            lastName === undefined ? setLastNameError(true) : null
                            email === undefined ? setEmailError(true) : null
                            password === undefined ? setPasswordError(true) : null
                            confirmPassword === undefined ? setConfirmPasswordError(true) : null
                            firstName === undefined || lastName === undefined || email === undefined || password == undefined || confirmPassword == undefined ? null : password !== confirmPassword ? setConfirmPasswordError(true) : userType == undefined ? Alert.alert("Required", "Select your account type") : registerUser()
                        }} style={{ backgroundColor: firstName == undefined || lastName === undefined || email === undefined || password === undefined || confirmPassword === undefined ? "#0c6ff0" : "#175676", paddingVertical: 10, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center', color: "#fff", fontSize: 22, fontWeight: '400' }}>SIGN UP</Text>
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
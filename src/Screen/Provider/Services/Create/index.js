import { View, StyleSheet, ScrollView, Image, Platform, TouchableOpacity, TextInput, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioButtonRN from 'radio-buttons-react-native';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function Index({ navigation }) {
    const [name, setName] = useState(undefined)
    const [discription, setDiscription] = useState(undefined)
    const [charges, setCharges] = useState(undefined)
    const [category, setCategory] = useState(undefined)
    const [image, setImage] = useState(false)
    const [priceUnit, setPriceUnit] = useState(undefined)
    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
        });
        const uri = result.assets[0].uri
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        await storage()
            .ref(filename)
            .putFile(uploadUri)
        const url = await storage().ref(filename).getDownloadURL()
        setImage(url)
    }

    const create = async () => {
        const data = {
            name,
            charges,
            discription,
            category,
            image,
            priceUnit,
            creator: "mshahbazali821@gmail.com"
        }
        if (name == undefined) {
            Alert.alert("Missing", "Enter Service Name")
        }
        else if (discription == undefined) {
            Alert.alert("Missing", "Enter Service Discription")
        }
        else if (charges == undefined) {
            Alert.alert("Missing", "Enter Service Charges")
        }
        else if (priceUnit == undefined) {
            Alert.alert("Missing", "Enter Service Price Unit")
        }
        else if (category == undefined) {
            Alert.alert("Missing", "Enter Service Category")
        }
        else if (image == false) {
            Alert.alert("Missing", "Select Service Image")
        }
        else {
            await firestore()
                .collection('Booking')
                .add(data)
                .then(async () => {
                    setName(undefined)
                    setCharges(undefined)
                    setDiscription(undefined)
                    setImage(false)
                    await navigation.navigate("Services")
                });
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={{ fontSize: 40, color: "#0c6ff0", fontWeight: '800', marginVertical: 30 }}>Create a service</Text>
                    <View style={{ marginVertical: 20 }}>
                        <TextInput value={name} keyboardType='text' onChangeText={(text) => setName(text)} placeholder="Service Name" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: "#dbdbdb", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <TextInput value={discription} keyboardType='text' onChangeText={(text) => setDiscription(text)} placeholder="Description" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: "#dbdbdb", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <TextInput value={charges} keyboardType='numeric' onChangeText={(text) => setCharges(text)} placeholder="Charges" placeholderTextColor={"#2D344B"} style={{ borderBottomColor: "#dbdbdb", borderBottomWidth: 2, color: "#000", fontWeight: "600", paddingBottom: 10, fontSize: 15 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 17, color: "#000", fontWeight: '600', marginVertical: 10 }}>Price Unit</Text>
                        <RadioButtonRN
                            data={[{
                                label: "Fixed"
                            },
                            {
                                label: "Hourly"
                            },
                            ]}
                            selectedBtn={(e) => setPriceUnit(e.label)}
                            icon={
                                <Fontisto
                                    name="radio-btn-active"
                                    size={20}
                                    color="#0c6ff0"
                                />
                            }
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 17, color: "#000", fontWeight: '600', marginVertical: 10 }}>Select Category</Text>
                        <RadioButtonRN
                            data={[{
                                label: "House Maids"
                            },
                            {
                                label: "Kitchen Staff"
                            },
                            {
                                label: "Senior Citizen"
                            },
                            {
                                label: "Baby Sitters"
                            },
                            {
                                label: "Gardener Men"
                            },
                            {
                                label: "Interior and Exterior"
                            },
                            ]}
                            selectedBtn={(e) => setCategory(e.label)}
                            icon={
                                <Fontisto
                                    name="radio-btn-active"
                                    size={20}
                                    color="#0c6ff0"
                                />
                            }
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={selectImage} style={{ marginVertical: 20, borderRadius: 10, borderWidth: 1, borderColor: '#dbdbdb', padding: 10, flexDirection: 'row' }}>
                            <View>
                                {
                                    image == false ?
                                        <MaterialIcons name="camera-alt" size={69} color="#0c6ff0" />
                                        :
                                        <Image source={{ uri: image }} style={{
                                            width: 90,
                                            height: 90,
                                            borderRadius: 20
                                        }} />
                                }
                            </View>
                            <View>
                                <Text style={{ fontSize: 20, color: "#000", fontWeight: '500', marginTop: 10, marginHorizontal: 20 }}>Select Image</Text>
                                <Text style={{ fontSize: 14, color: "red", fontWeight: '500', marginHorizontal: 20 }}>Only Supported JPG and PNG file</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <TouchableOpacity onPress={create} style={{ backgroundColor: "#0c6ff0", paddingVertical: 10, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center', color: "#fff", fontSize: 22, fontWeight: '400' }}>Create</Text>
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
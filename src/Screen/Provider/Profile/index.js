import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index({ navigation }) {
  const { user } = useContext(AuthContext)

  const [image, setImage] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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
  const getData = async () => {
    await firestore()
      .collection('Users')
      .doc(user.email)
      .get()
      .then(async (user) => {
        setEmail(user._data.email);
        setFirstName(user._data.firstName);
        setLastName(user._data.lastName);
        setImage(user._data.profileImage)
      });
  }
  useEffect(() => {
    getData()
  }, [])
  const saveProfile = async () => {
    await firestore()
      .collection('Users')
      .doc(user.email)
      .update({
        firstName: firstName,
        lastName: lastName,
        profileImage: image
      })
      .then(async () => {
        Alert.alert("Updated", "Profile Detail Updated")
        await navigation.navigate("HomeProvider")
      }).catch((err) => console.log(err))


  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={"Profile"} />
        <View style={styles.profileDetailContainer}>
          <TouchableOpacity onPress={selectImage} style={{ marginVertical: 20, borderRadius: 10, borderWidth: 1, borderColor: '#dbdbdb', padding: 10, flexDirection: 'row' }}>
            <View>
              {
                image == undefined ?
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
          <View style={styles.profileDetailFullNameBox}>
            <View style={{ width: '45%' }}>
              <Text style={styles.profileDetailName}>First Name</Text>
              <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} style={styles.profileDetailNameInput} />
            </View>
            <View style={{ width: '45%' }}>
              <Text style={styles.profileDetailName}>Last Name</Text>
              <TextInput value={lastName} onChangeText={(text) => setLastName(text)} style={styles.profileDetailNameInput} />
            </View>
          </View>
          <View style={styles.profileDetailNameBox}>
            <Text style={styles.profileDetailName}>Email Address</Text>
            <TextInput value={email} editable={false} style={styles.profileDetailNameInput} />
          </View>
          <View style={styles.profileDetailNameBox}>
            <Text style={styles.profileDetailName}>Password</Text>
            <TextInput placeholder='*********' placeholderTextColor={"#000"} editable={false} style={styles.profileDetailNameInput} />
          </View>
          <View style={styles.cartDetailBtnContainer}>
            <TouchableOpacity style={styles.cartDetailBtn} onPress={saveProfile}>
              <Text style={styles.cartDetailBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signOutContainer}>
            <TouchableOpacity style={styles.signOutBtn} onPress={async () => {
              AsyncStorage.removeItem("user").then(() => {
                navigation.navigate("Authentication")
              })
            }}>
              <Text style={styles.cartDetailBtnText}>Sign Out </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20
  },
  locationContainer: {
    width: '76%'
  },
  locationText: {
    fontSize: 20,
    fontWeight: '500',
    color: "#000"
  },
  profileDetailContainer: {
    marginVertical: 40,
    marginHorizontal: 20
  },
  profileDetailNameBox: {
    marginVertical: 20,
  },
  profileDetailFullNameBox: {
    marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  profileDetailName: {
    fontSize: 15,
    fontWeight: '500',
    color: "#000"
  },
  profileDetailNameInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#dbdbdb',
    fontSize: 18,
    color: "#000",

  },
  cartDetailBtnContainer: {
    marginVertical: 10
  },
  signOutContainer: {
    marginVertical: 10
  },
  cartDetailBtn: {
    backgroundColor: "#0c6ff0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 26,
  },
  signOutBtn: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 26,
  },
  cartDetailBtnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
})
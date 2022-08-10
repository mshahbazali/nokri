import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header'

export default function Index({ navigation }) {
  const CART = [1, 2,]
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={"Profile"} />
        <View style={styles.profileDetailContainer}>
          <View style={styles.profileDetailNameBox}>
            <Text style={styles.profileDetailName}>Name</Text>
            <TextInput style={styles.profileDetailNameInput} />
          </View>
          <View style={styles.profileDetailNameBox}>
            <Text style={styles.profileDetailName}>Email Address</Text>
            <TextInput style={styles.profileDetailNameInput} />
          </View>
          <View style={styles.profileDetailNameBox}>
            <Text style={styles.profileDetailName}>Password</Text>
            <TextInput style={styles.profileDetailNameInput} />
          </View>
          <View style={styles.cartDetailBtnContainer}>
            <TouchableOpacity style={styles.cartDetailBtn}>
              <Text style={styles.cartDetailBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileDetailNameBox} onPress={() => navigation.navigate("MyAddress")}>
            <Text style={styles.editAddress}>Edit Address</Text>
          </TouchableOpacity>
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
    marginVertical: 20
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
    marginVertical: 35
  },
  cartDetailBtn: {
    backgroundColor: "#0c6ff0",
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
  editAddress: {
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
    textAlign: 'center',
  },
})
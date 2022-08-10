import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header'
export default function Index({ navigation }) {
  const CART = [1, 2,]
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={"Inbox"} />
        <View style={styles.cartItemContainer}>
          {
            CART.map((e, i) => {
              return (
                <TouchableOpacity style={styles.cartItemBox} key={i} onPress={() => navigation.navigate("Inbox")}>
                  <View>
                    <Feather name="user" size={30} color="#000" />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>Home Cleaner </Text>
                  </View>
                  <View style={styles.chatTeamBox}>
                    <Text style={styles.chatTeam}>21 second ago</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
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
  cartItemContainer: {
    marginVertical: 25,
    marginHorizontal: 20
  },
  cartItemBox: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingVertical: 14,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 10
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 20
  },
  itemNameContainer: {
    marginLeft: 15,
    alignItems: 'flex-start',
    width: '55%'
  },
  itemName: {
    fontSize: 18,
    color: "#000",
    fontWeight: '400',

  },
  itemPrice: {
    fontSize: 18,
    color: "#000",
    fontWeight: '600',
    marginTop: 15
  },
  cartDetailBtnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
  chatTeam: {
    fontSize: 13,
    color: "#000",
    fontWeight: '500',
    textAlign: 'center'
  },
})
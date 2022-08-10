import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header'

export default function Index() {
  const CART = [1, 2,]
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title={"Notification"} />
        <View style={styles.cartItemContainer}>
          {
            CART.map((e, i) => {
              return (
                <View style={styles.cartItemBox} key={i}>
                  <View>
                    <Ionicons name="notifications" size={30} color="#000" />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>Home Cleaner </Text>
                  </View>
                </View>
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
  itemQuentityContainer: {
    marginTop: -10
  },
  itemQuentityTitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center'
  },
  itemQuentityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14
  },
  itemQuentityMinus: {
    backgroundColor: "#0c6ff0",
    padding: 5,
    borderRadius: 10
  },
  itemQuentityPlus: {
    backgroundColor: "#0c6ff0",
    padding: 5,
    borderRadius: 10
  },
  itemQuentityText: {
    fontSize: 20,
    color: "#000",
    fontWeight: '800',
    marginHorizontal: 6
  },
  cartDetailConatiner: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  cartDetailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartDetailSubtotalText: {
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
  },
  cartDetailPriceText: {
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
  },
  cartDetailBtnContainer: {
    marginVertical: 27
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
})
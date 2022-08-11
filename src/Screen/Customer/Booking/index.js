import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Index() {
  const { user } = useContext(AuthContext)
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [data, setData] = useState([])
  const getData = async () => {
    await firestore()
      .collection('Order')
      .where('customerId', '==', user.email)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot._docs);
        console.log(querySnapshot._docs);
      });
  }
  useEffect(() => {
    getData()
  }, [refreshing])
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Header title={"My Booking"} />
        <View style={styles.cartItemContainer}>
          {
            data.map((e, i) => {
              return (
                <View style={styles.cartItemBox} key={i}>
                  <View style={styles.itemImageContainer}>
                    <Image source={{ uri: e?._data?.item[0]?._data?.image }} style={styles.itemImage} />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>{e?._data?.item[0]?._data?.name}</Text>
                    <Text style={styles.itemPrice}>{`${e?._data?.subTotal} PKR`}</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.bookingStatusBtn} >
                      <Text style={styles.bookingStatusBtnText}>{e?._data?.status}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          }
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
    width: '45%'
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
  bookingStatusBtnContainer: {
    marginVertical: 27
  },
  bookingStatusBtn: {
    backgroundColor: "#0c6ff0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 26,
  },
  bookingStatusBtnText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
})
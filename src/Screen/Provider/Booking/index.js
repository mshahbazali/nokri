import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
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
  const [totalBooking, setTotalBooking] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [data, setData] = useState([])
  const getData = async () => {
    await firestore()
      .collection('Order')
      .where('providerId', '==', user.email)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot._docs);
      });
    await firestore()
      .collection('Users')
      .doc(user.email)
      .get()
      .then(querySnapshot => {
        setTotalBooking(querySnapshot._data.totalBooking);
        setTotalAmount(querySnapshot._data.totalAmount);
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
                <View key={i} style={styles.cartItemBox}>
                  <View style={styles.itemImageContainer}>
                    <Image source={{ uri: e?._data?.item[0]?._data?.image }} style={styles.itemImage} />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>{e?._data?.item[0]?._data?.name} </Text>
                    <Text style={styles.itemPrice}>{`${e?._data?.subTotal} PKR`}</Text>
                    <Text style={styles.customerName}>{e?._data?.customerName}</Text>
                  </View>
                  <View>
                    {
                      e?._data?.status === "Pending" ?
                        <View style={styles.requestBtnContainer}>
                          <TouchableOpacity style={styles.requestCheckApprove} onPress={async () => {
                            setRefreshing(true)
                            await firestore()
                              .collection('Order')
                              .doc(e?._ref?._documentPath?._parts[1])
                              .update({
                                status: "Rejected",
                              })
                              .then(() => {
                                setRefreshing(false)
                                Alert.alert("Status Update", 'Request Rejected')
                              });
                          }}>
                            <Ionicons name="close" size={25} color="#fff" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.requestCheckCancle} onPress={async () => {
                            setRefreshing(true)
                            await firestore()
                              .collection('Order')
                              .doc(e?._ref?._documentPath?._parts[1])
                              .update({
                                status: "Accepted",
                              })
                              .then(() => {
                                setRefreshing(false)
                                Alert.alert("Status Update", 'Request Accepted')
                              });
                            await firestore()
                              .collection('Users')
                              .doc(user.email)
                              .update({
                                totalBooking: totalBooking + 1,
                                totalAmount: totalAmount + e?._data?.subTotal,
                              })
                              .then(() => {
                                setRefreshing(false)
                                Alert.alert("Status Update", 'Request Accepted')
                              });
                          }}>
                            <Ionicons name="ios-checkmark-sharp" size={25} color="#fff" />
                          </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity style={styles.bookingStatusBtn} >
                          <Text style={styles.bookingStatusBtnText}>{e?._data?.status}</Text>
                        </TouchableOpacity>
                    }


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
    marginBottom: 10,
    marginTop: 10
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 20
  },
  itemNameContainer: {
    marginLeft: 15,
    alignItems: 'flex-start',
    width: '38%',
  },
  itemName: {
    fontSize: 16,
    color: "#000",
    fontWeight: '400',

  },
  itemPrice: {
    fontSize: 15,
    color: "#000",
    fontWeight: '600',
    marginTop: 10
  },
  customerName: {
    fontSize: 15,
    color: "#000",
    fontWeight: '600',
    marginTop: 5
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
  CategoriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  CategoriesContainerHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoriesHeading: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500"
  },
  categoriesBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginVertical: 15,
    padding: 8,
    shadowColor: "#dbdbdb",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 2,
    borderRadius: 5
  },
  categoriesName: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    textAlign: 'center',
    marginTop: 5
  },
  requestBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestCheckApprove: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 90,
    marginHorizontal: 10
  },
  requestCheckCancle: {
    backgroundColor: "#03fc49",
    padding: 5,
    borderRadius: 90
  },
})
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
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
export default function Index({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useContext(AuthContext)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [cartData, setCartData] = useState([])
  const [quentity, setQuentity] = useState(0)

  const getData = async () => {
    await firestore()
      .collection('AddToCart')
      .where('userEmail', '==', user.email)
      .get()
      .then(querySnapshot => {
        setCartData(querySnapshot._docs);
      });
  }
  const sendOrder = async () => {
    const data = {
      item: cartData,
      subTotal: subTotal,
      providerId: "mshahbazali821@gmail.com",
      customerId: user.email,
      customerName: "Shahbaz Ali",
      status: "Pending"
    }
    await firestore()
      .collection('Order')
      .add(data)
      .then(async () => {
        Alert.alert("Success", "Booking send successfully")
        await navigation.navigate("HomeCustomer")
      });
  }
  useEffect(() => {
    getData()
  }, [refreshing])
  let subTotal = "";
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Header title={"My Cart"} />
        <View style={styles.cartItemContainer}>
          {
            cartData.map((e, i) => {
              e._data.charges == undefined ? null :
                subTotal += e._data.charges * e._data.quentity
              return (
                <View style={styles.cartItemBox} key={i}>
                  <View style={styles.itemImageContainer}>
                    <Image source={{ uri: e?._data?.image }} style={styles.itemImage} />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>{e?._data?.name}</Text>
                    <Text style={styles.itemPrice}>{`${e?._data?.charges} PKR`}</Text>
                  </View>
                  <View style={styles.itemQuentityContainer}>
                    <Text style={styles.itemQuentityTitle}>Quentity</Text>
                    <View style={styles.itemQuentityBox}>
                      <View>
                        <TouchableOpacity style={styles.itemQuentityMinus} onPress={async () => {
                          setQuentity(e?._data?.quentity)
                          setRefreshing(true)
                          await e?._data?.quentity <= 1 ?
                            await firestore()
                              .collection('AddToCart')
                              .doc(e._ref._documentPath._parts[1])
                              .delete()
                              .then(() => {
                                Alert.alert('Deleted', " Cart successful deleted");
                                setRefreshing(false)
                              }) :
                            await setQuentity(quentity - 1)
                          await firestore()
                            .collection('AddToCart')
                            .doc(e?._ref?._documentPath?._parts[1])
                            .update({
                              quentity: quentity,
                            })
                            .then(() => {
                              setRefreshing(false)

                            });
                        }}>
                          <AntDesign name="minus" size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text style={styles.itemQuentityText}>{quentity <= 1 ? e?._data?.quentity : quentity}</Text>
                      </View>
                      <View>
                        <TouchableOpacity style={styles.itemQuentityPlus} onPress={async () => {
                          setRefreshing(true)
                          setQuentity(e?._data?.quentity)
                          await setQuentity(quentity + 1)
                          await firestore()
                            .collection('AddToCart')
                            .doc(e?._ref?._documentPath?._parts[1])
                            .update({
                              quentity: quentity,
                            })
                            .then(() => {
                              setRefreshing(false)
                            });
                        }}>
                          <AntDesign name="plus" size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }

        </View>
        <View style={styles.cartDetailConatiner}>
          <View style={styles.cartDetailBox}>
            <View>
              <Text style={styles.cartDetailSubtotalText}>Subtotal</Text>
            </View>
            <View>
              <Text style={styles.cartDetailPriceText}>{`${subTotal} PKR`}</Text>
            </View>
          </View>


          <View style={{ marginVertical: 20, }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#000', marginVertical: 20 }}>
                Card Detail
              </Text>
              <View>
                <TextInput keyboardType='numeric' placeholder='Card Number' placeholderTextColor={"#000"} style={{ borderBottomColor: 'grey', borderBottomWidth: 1.4 }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <TextInput keyboardType='numeric' placeholder='Expire Date' placeholderTextColor={"#000"} style={{ borderBottomColor: 'grey', borderBottomWidth: 1.4, width: '70%' }} />
                <TextInput keyboardType='numeric' placeholder='CVC' placeholderTextColor={"#000"} style={{ borderBottomColor: 'grey', borderBottomWidth: 1.4, width: '25%', marginLeft: 10 }} />
              </View>
            </View>
          </View>
          <View style={styles.cartDetailBtnContainer}>
            <TouchableOpacity style={styles.cartDetailBtn} onPress={sendOrder}>
              <Text style={styles.cartDetailBtnText}>Process to checkout</Text>
            </TouchableOpacity>
          </View>
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
    width: '40%'
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
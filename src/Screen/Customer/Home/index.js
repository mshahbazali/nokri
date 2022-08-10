import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../Components/Header'
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker'
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Index({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const focus = useIsFocused()
  const categories = [1, 2, 3, 4, 5, 5, 6, 7]
  const [houseMaids, setHouseMaids] = useState([])
  const [kitchenStaff, setKitchenStaff] = useState([])
  const [seniorCitizen, setSeniorCitizen] = useState([])
  const [babySitters, setBabySitters] = useState([])
  const [gardenerMen, setGardenerMen] = useState([])
  const [interiorandExterior, setInteriorandExterior] = useState(false)
  const [sheetData, setSheetData] = useState()
  const ref = useRef()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)
  const [quentity, setQuentity] = useState(1)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"]

  const addtocart = () => {
    const data = {
      category: sheetData.category,
      image: sheetData.image,
      charges: sheetData.charges,
      name: sheetData.name,
      discription: sheetData.discription,
      startTime: startDate,
      EndTime: endDate,
      quentity: quentity,
      userEmail: "mshahbazali563@gmail.com",
      userName: "Shahbaz Ali"
    }
    firestore()
      .collection('AddToCart')
      .add(data)
      .then(async () => {
        await navigation.navigate("CartCustomer")
      });
  }
  // console.log(sheetData);

  const getData = async () => {
    await firestore()
      .collection('Booking')
      .where('category', '==', "House Maids")
      .get()
      .then(querySnapshot => {
        setHouseMaids(querySnapshot._docs);
      });
    await firestore()
      .collection('Booking')
      .where('category', '==', "Kitchen Staff")
      .get()
      .then(querySnapshot => {
        setKitchenStaff(querySnapshot._docs);
      });
    await firestore()
      .collection('Booking')
      .where('category', '==', "Senior Citizen")
      .get()
      .then(querySnapshot => {
        setSeniorCitizen(querySnapshot._docs);
      });
    await firestore()
      .collection('Booking')
      .where('category', '==', "Baby Sitters")
      .get()
      .then(querySnapshot => {
        setBabySitters(querySnapshot._docs);
      });
    await firestore()
      .collection('Booking')
      .where('category', '==', "Gardener Men")
      .get()
      .then(querySnapshot => {
        setGardenerMen(querySnapshot._docs);
      });
    await firestore()
      .collection('Booking')
      .where('category', '==', "Interior and Exterior")
      .get()
      .then(querySnapshot => {
        setInteriorandExterior(querySnapshot._docs);
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
        <Header title={"North Karachi"} />
        <View style={styles.searchContainer}>
          <View style={styles.searchContainerBox}>
            <TextInput keyboardType='web-search' placeholder='Search...' placeholderTextColor={"#000"} style={styles.searchInput} />
            <AntDesign name="closecircle" size={20} color="#000" />
          </View>
        </View>
        <View>

        </View>
        <View style={styles.CategoriesContainer}>
          <View style={styles.CategoriesContainerHead}>
            <Text style={styles.categoriesHeading}>Categories</Text>
            {/* <TouchableOpacity>
              <Text style={styles.categoriesHeading}>View All</Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={styles.categoriesBox}>
              <MaterialIcons name="clean-hands" size={40} color="#000" />
              <Text style={styles.categoriesName}>House Maids</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoriesBox}>
              <MaterialIcons name="kitchen" size={40} color="#000" />
              <Text style={styles.categoriesName}>Kitchen Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoriesBox}>
              <Ionicons name="ios-logo-capacitor" size={40} color="#000" />
              <Text style={styles.categoriesName}>Senior Citizen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoriesBox}>
              <MaterialCommunityIcons name="baby-face" size={40} color="#000" />
              <Text style={styles.categoriesName}>Baby Sitters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoriesBox}>
              <Entypo name="tree" size={40} color="#000" />
              <Text style={styles.categoriesName}>Gardener Men</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoriesBox}>
              <FontAwesome5 name="table" size={40} color="#000" />
              <Text style={styles.categoriesName}>Interior and Exterior</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* House Maids */}
        {
          houseMaids[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>House Maids</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  houseMaids.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }
        {
          kitchenStaff[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>Kitchen Staff</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  kitchenStaff.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }
        {
          seniorCitizen[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>Senior Citizen</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  seniorCitizen.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }
        {
          babySitters[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>Baby Sitters</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  babySitters.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }
        {
          gardenerMen[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>Gardener Men</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  gardenerMen.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }
        {
          interiorandExterior[0] == undefined
            ? null :
            <View style={styles.CategoriesContainer}>
              <View style={styles.CategoriesContainerHead}>
                <Text style={styles.categoriesHeading}>Interior and Exterior</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.categoriesHeading}>View All</Text>
                  </TouchableOpacity> */}
              </View>
              <ScrollView horizontal={true}>
                {
                  interiorandExterior.map((e, i) => {
                    return (
                      <TouchableOpacity key={i} style={styles.itemBox} onPress={async () => {
                        setSheetData(e?._data)
                        ref.current.open()
                      }}>
                        <TouchableOpacity style={styles.itemBoxfavorites}>
                          <AntDesign name="heart" size={15} color="#fff" />
                        </TouchableOpacity>
                        <Image source={{ uri: e?._data?.image }} style={styles.itemBoxImage} />
                        <Text style={styles.categoriesName}>{e?._data?.name}</Text>
                        <Text style={styles.categoriesName}>{`${e?._data?.charges} PKR`}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            </View>
        }

        <RBSheet
          ref={ref}
          height={650}
          openDuration={250}
          dragFromTopOnly={true}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            },
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <View style={{ flex: 1, paddingTop: 10 }}>
            <ScrollView>

              <View style={styles.cartItemBox}>
                <View style={styles.itemImageContainer}>
                  <Image source={{ uri: sheetData?.image }} style={styles.itemImage} />
                </View>
                <View style={styles.itemNameContainer}>
                  <Text style={styles.itemName}>{sheetData?.name}</Text>
                  <Text style={styles.itemPrice}>{`${sheetData?.charges} PKR`}</Text>
                </View>
                <View style={styles.itemQuentityContainer}>
                  <Text style={styles.itemQuentityTitle}>Quentity</Text>
                  <View style={styles.itemQuentityBox}>
                    <View>
                      <TouchableOpacity style={styles.itemQuentityMinus} onPress={() => {
                        quentity <= 1 ?
                          null :
                          setQuentity(quentity - 1)
                      }}>
                        <AntDesign name="minus" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.itemQuentityText}>{quentity}</Text>
                    </View>
                    <View>
                      <TouchableOpacity style={styles.itemQuentityPlus} onPress={() => setQuentity(quentity + 1)}>
                        <AntDesign name="plus" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <Text style={styles.itemPrice}>Description</Text>
              </View>
              <View style={{ marginTop: 10, height: 100, paddingHorizontal: 20 }}>
                <ScrollView>
                  <Text style={styles.descriptionText}>{sheetData?.discription}</Text>
                </ScrollView>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.startTimeText}>Start Time</Text>
                <View style={{ ...styles.bottomInput, padding: 15, flexDirection: "row" }}>
                  <View style={{ width: "80%" }}>
                    <Text style={{ color: "#b1b1b1", fontWeight: "400", fontSize: 16 }}>
                      {`${months[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()}      ( ${startDate.getHours() > 12 ? (startDate.getHours() - 12) : startDate.getHours()} : ${startDate.getMinutes()} : ${startDate.getHours() === 13 ? "PM" : "AM"} )`}
                    </Text>
                  </View>
                  <View style={{ width: "20%", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => setStart(true)}>
                      <MaterialCommunityIcons name="update" size={25} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    open={start}
                    date={startDate}
                    onConfirm={(date) => {
                      setStart(false)
                      setStartDate(date)
                    }}
                    onCancel={() => {
                      setStart(false)
                    }}
                  />
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.startTimeText}>End Time</Text>
                <View style={{ ...styles.bottomInput, padding: 15, flexDirection: "row" }}>
                  <View style={{ width: "80%" }}>
                    <Text style={{ color: "#b1b1b1", fontWeight: "400", fontSize: 16 }}>
                      {`${months[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}      ( ${endDate.getHours() > 12 ? (endDate.getHours() - 12) : endDate.getHours()} : ${endDate.getMinutes()} : ${endDate.getHours() === 13 ? "PM" : "AM"} )`}
                    </Text>
                  </View>
                  <View style={{ width: "20%", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => setStart(true)}>
                      <MaterialCommunityIcons name="update" size={25} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    open={end}
                    date={endDate}
                    onConfirm={(date) => {
                      setEnd(false)
                      setEndDate(date)
                    }}
                    onCancel={() => {
                      setEnd(false)
                    }}
                  />
                </View>
              </View>
              <View style={styles.cartBtnContainer}>
                <TouchableOpacity style={styles.providerBtn}>
                  <Text style={styles.providerBtnText}>Provider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartBtn} onPress={addtocart}>
                  <Text style={styles.addToCartBtnText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </RBSheet>

      </ScrollView>
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
  searchContainer: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  searchContainerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  searchInput: {
    width: '90%',
    color: "#000",
    fontSize: 18
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
  itemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 150,
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
  },
  itemBoxImage: {
    width: 90,
    height: 90,
    borderRadius: 10
  },
  itemBoxfavorites: {
    position: "absolute",
    zIndex: 99999,
    top: 15,
    right: 15
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
  descriptionText: {
    fontSize: 17,
    color: "#000",
    fontWeight: '400',
  },
  bottomInput: {
    width: "95%",
    backgroundColor: "white",
    borderColor: "#0c6ff0",
    borderWidth: .5,
    borderRadius: 5,
    paddingLeft: 15,
    color: "#0c6ff0",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 10
  },
  startTimeText: {
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 10
  },
  cartBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 40
  },
  addToCartBtn: {
    backgroundColor: "#0c6ff0",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 26,
    width: "57%"
  },
  addToCartBtnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
  providerBtn: {
    backgroundColor: "#0c6ff0",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 26,
    width: "42%",
    marginRight: 10
  },
  providerBtnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
})
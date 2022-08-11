import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header'
import RBSheet from "react-native-raw-bottom-sheet";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default function Index() {
  Geocoder.init("AIzaSyA2RP2pRxWzLK-jspF3TFIOVGv-p5ShPuU");

  const CART = [1, 2,]
  const ref = useRef()

  const mapRef = useRef()
  const locationRef = useRef()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fixedBtn} onPress={() => ref.current.open()}>
        <AntDesign name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <ScrollView>
        <Header title={"My Work Area"} />
        <View style={styles.cartItemContainer}>
          {
            CART.map((e, i) => {
              return (
                <View style={styles.cartItemBox} key={i}>
                  <View>
                    <MaterialIcons name="location-pin" size={30} color="#000" />
                  </View>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>Home Cleaner</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        <RBSheet
          ref={ref}
          height={900}
          dragFromTopOnly={true}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "grey"
            },
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ flex: 1, width: '100%', }}>
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  // zIndex: -1
                }}
              >
                <Marker
                  ref={locationRef}
                  draggable
                  onDragEnd={async (e) => {
                    await Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                      .then(json => {
                        var addressComponent = json.results[0].address_components[0];
                      })
                      .catch(error => console.warn(error));
                  }}
                  coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                  }}
                  position={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                  }}
                  centerOffset={{ x: -18, y: -60 }}
                  anchor={{ x: 0.69, y: 1 }}
                  // pinColor={COLOR.marker}
                  onDragStart={(e) => console.log(e)}
                />
              </MapView>
            </View>
            <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 9999, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <GooglePlacesAutocomplete
                ref={locationRef}
                placeholder='Enter Location'
                query={{
                  key: 'AIzaSyA2RP2pRxWzLK-jspF3TFIOVGv-p5ShPuU',
                  language: 'en',
                  components: 'country:pk',
                }}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                onFail={(error) => console.error(error)}
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingRight: 10,
                    paddingTop: 7,
                    borderColor: 'grey', borderWidth: 1.5,
                    width: '90%'
                  },
                  textInput: {
                    height: 38,
                    color: '#000',
                    fontSize: 16,
                  },
                  listView: {
                    color: '#000',
                    fontSize: 16,
                    width: '90%'
                  },
                  predefinedPlacesDescription: {
                    color: '#000',
                  },
                  description: { backgroundColor: "#fff", color: '#000000' }

                }}
              />
            </View>
          </View>
        </RBSheet>
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  fixedBtn: {
    position: 'absolute',
    right: 25,
    flex: 1,
    bottom: 25,
    backgroundColor: "#0c6ff0",
    padding: 13,
    borderRadius: 90,
    zIndex: 99999
  }
})
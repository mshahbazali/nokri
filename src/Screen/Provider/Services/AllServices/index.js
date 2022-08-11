import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState , useContext} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header'
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context';

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
    const focus = useIsFocused()
    const [data, setData] = useState([])
    const getData = async () => {
        firestore()
            .collection('Booking')
            .where('creator', '==', user.email)
            .get()
            .then(querySnapshot => {
                setData(querySnapshot._docs)
            });
    }
    useEffect(() => {
        getData()
    }, [focus])
    useEffect(() => {
        getData()
    }, [refreshing])
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fixedBtn} onPress={() => navigation.navigate("CreateService")}>
                <AntDesign name="plus" size={30} color="#fff" />
            </TouchableOpacity>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <Header title={"My Services"} />
                <View style={styles.cartItemContainer}>
                    {
                        data.map((e, i) => {
                            return (
                                <View key={i} style={styles.cartItemBox}>
                                    <View style={styles.itemImageContainer}>
                                        <Image source={{ uri: e?._data?.image }} style={styles.itemImage} />
                                    </View>
                                    <View style={styles.itemNameContainer}>
                                        <Text style={styles.itemName}>{e?._data?.name} </Text>
                                        <Text style={styles.itemPrice}>{`${e?._data?.charges} PKR`}</Text>
                                        <Text style={styles.customerName}>{e?._data?.category}</Text>
                                    </View>
                                    <View>
                                        {/* <TouchableOpacity style={styles.bookingStatusBtn} >
                                <Text style={styles.bookingStatusBtnText}>Pending</Text>
                              </TouchableOpacity> */}
                                        <View style={styles.requestBtnContainer}>
                                            <TouchableOpacity style={styles.requestCheckApprove} onPress={async () => {
                                                setRefreshing(true)
                                                await firestore()
                                                    .collection('Booking')
                                                    .doc(e._ref._documentPath._parts[1])
                                                    .delete()
                                                    .then(() => {
                                                        Alert.alert('Deleted', " Service successful deleted");
                                                        setRefreshing(false)
                                                    });
                                            }}>
                                                <AntDesign name="delete" size={25} color="#fff" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.requestCheckCancle}>
                                                <MaterialCommunityIcons name="circle-edit-outline" size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
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
    fixedBtn: {
        position: 'absolute',
        right: 25,
        flex: 1,
        bottom: 25,
        backgroundColor: "#0c6ff0",
        padding: 13,
        borderRadius: 90,
        zIndex: 99999
    },

})
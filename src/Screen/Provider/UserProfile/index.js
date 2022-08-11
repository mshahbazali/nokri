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
export default function Index({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const { userProfileId, setChatId } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const getData = async () => {
        await firestore()
            .collection('Users')
            .doc(userProfileId)
            .get()
            .then(user => {
                setName(`${user._data.firstName} ${user._data.lastName}`);
                setEmail(user._data.email)
                setType(user._data.userType)
                setImage(user._data.profileImage)
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
                <Header title={"User Profile"} />
                <View style={styles.cartItemContainer}>
                    <View style={styles.cartItemBox}>
                        <View style={styles.itemImageContainer}>
                            <Image source={{ uri: image }} style={styles.itemImage} />
                        </View>
                        <View style={styles.itemNameContainer}>
                            <Text style={styles.itemName}>{name}</Text>
                            <Text style={styles.itemPrice}>{email}</Text>
                            <Text style={styles.customerName}>{type}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.bookingStatusBtn} onPress={async () => {
                            setChatId(email)
                            await navigation.navigate("Inbox")
                        }}>
                            <Text style={styles.bookingStatusBtnText}>Chat</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
    },
    itemName: {
        fontSize: 20,
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 26,
        marginTop: 20
    },
    bookingStatusBtnText: {
        fontSize: 20,
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
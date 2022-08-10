import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
export default function Index({ title }) {
    const navigation = useNavigation()
    return (
        <View style={styles.headerContainer}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{title}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("AllInbox")}>
                <Ionicons name="chatbox-ellipses" size={30} color="#0c6ff0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                <Ionicons name="notifications" size={30} color="#0c6ff0" />
            </TouchableOpacity>
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
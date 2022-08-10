import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList, TextInput } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header'


const Chatting = () => {


  const Activity = [
    {
      id: 1,
      img: 'https://t4.ftcdn.net/jpg/02/45/28/17/360_F_245281721_2uYVgLSFnaH9AlZ1WWpkZavIcEEGBU84.jpg',
      msg: 'Hey when`s the next meeting',
      time: 'Yesterday, 9:45 AM',
      user_id: 1,
    },
    {
      id: 2,
      img: 'https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg',
      msg: 'Wednesday, next okay',
      user_id: 2,

    },
    {
      id: 3,
      img: 'https://t4.ftcdn.net/jpg/02/45/28/17/360_F_245281721_2uYVgLSFnaH9AlZ1WWpkZavIcEEGBU84.jpg',
      msg: 'Sounds perfect. I have to go through a few things, them I am ready.',
      user_id: 2,
    },
    {
      id: 4,
      img: 'https://t4.ftcdn.net/jpg/02/45/28/17/360_F_245281721_2uYVgLSFnaH9AlZ1WWpkZavIcEEGBU84.jpg',
      msg: 'Sounds perfect. I have to go through a few things, them I am ready.',
      user_id: 1,
    },
    {
      id: 5,
      img: 'https://t4.ftcdn.net/jpg/02/45/28/17/360_F_245281721_2uYVgLSFnaH9AlZ1WWpkZavIcEEGBU84.jpg',
      msg: 'Sounds perfect. I have to go through a few things, them I am ready.',
      time: 'Yesterday, 9:45 AM',
      img2: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80',
      user_id: 2,
    },

  ]


  return (
    <View style={{ ...styles.Mainview, }}>
      <Header title={"Shahbaz Ali"} />
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

        <ScrollView>
          {Activity.map((item, index) => {
            return (
              <View key={item.id}>
                {item.time && <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20, color: '#0c6ff0' }}>{item.time}</Text>}
                <>
                  <View style={{ flexDirection: 'row', justifyContent: item.user_id === 1 ? 'flex-end' : 'flex-start', alignItems: 'center', marginTop: 30, marginHorizontal: 10 }}>
                    <Text style={{ maxWidth: '70%', fontSize: 16, backgroundColor: item.user_id === 1 ? '#0c6ff0' : '#dbdbdb', color: item.user_id === 1 ? '#fff' : '#000', padding: 8, paddingVertical: 10 }}>{item.msg}</Text>
                  </View>
                </>
              </View>
            )
          })}
        </ScrollView>

      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchContainerBox}>
          <TextInput keyboardType='text' placeholder='Type message...' placeholderTextColor={"#000"} style={styles.searchInput} />
          <TouchableOpacity style={styles.cartDetailBtn}>
            <Text style={styles.cartDetailBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Chatting;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10
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
    width: '81%',
    color: "#000",
    fontSize: 18
  },
  cartDetailBtn: {
    backgroundColor: "#0c6ff0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 26,
  },
  cartDetailBtnText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: '500',
    textAlign: 'center'
  },
  Mainview: { flex: 1, backgroundColor: "#fff" },
  LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
  activity: { fontSize: 40, color: 'black', marginHorizontal: 15, marginTop: 45 },
  MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 },
  userImage: { height: 50, width: 50, borderRadius: 50 },
  postedBy: { fontSize: 13, },
  postedByTime: { fontSize: 13, color: '#0c6ff0' },
  LoginButton: { marginTop: 50, backgroundColor: '#0c6ff0', marginHorizontal: 30, padding: 10, borderRadius: 100 },
  LoginButtonText: { color: 'white', },
  ImageBg: { borderRadius: 10, paddingVertical: 20 },
  firstSection: { flexDirection: 'row', justifyContent: 'space-between' },
  message: { flexDirection: 'row', alignItems: 'center' },
  count: { fontSize: 12, paddingHorizontal: 10, borderRadius: 10 },
  newmessgaetext: { fontSize: 12, paddingHorizontal: 10, borderRadius: 10, color: 'white' },
  totalUserView: { width: 30, borderRadius: 50, backgroundColor: '#0c6ff0', alignItems: 'center', justifyContent: 'center' },
  totalUser: { fontSize: 12, borderRadius: 10, color: 'black' },
})
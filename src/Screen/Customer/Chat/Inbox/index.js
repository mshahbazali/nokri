import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList, TextInput } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../../../Context";

const Chatting = () => {
  const { chatId , user} = useContext(AuthContext)
  const [name, setName] = useState()
  const [message, setMessage] = useState()
  const [allMessage, setAllMessage] = useState([])
  const getData = async () => {
    await firestore()
      .collection('Users')
      .doc(chatId)
      .get()
      .then(user => {
        setName(`${user._data.firstName} ${user._data.lastName}`);
      });
    await firestore()
      .collection('chat')
      .where('reciverId', '==', chatId)
      .get()
      .then(data => {
        setAllMessage(data._docs)
      })

  }
  useEffect(() => {
    getData()
  }, [])
  const sendMessage = async () => {

    await firestore()
      .collection('chat')
      .add({
        sender: user.email,
        reciverId: chatId,
        message: message,
        reciverName: name
      }).then(async () => {
        setMessage('')
        await firestore()
          .collection('chat')
          .where('reciverId', '==', chatId)
          .get()
          .then(data => {
            setAllMessage(data._docs.reverse())
          })

      })

  }


  return (
    <View style={{ ...styles.Mainview, }}>
      <Header title={name} />
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

        <ScrollView>
          {allMessage.map((item, index) => {
            console.log(item)
            return (
              <View key={index}>
                {/* {item.time && <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20, color: '#0c6ff0' }}>{item.time}</Text>} */}
                <>
                  <View style={{ flexDirection: 'row', justifyContent: item._data.sender === user.email ? 'flex-end' : 'flex-start', alignItems: 'center', marginTop: 30, marginHorizontal: 10 }}>
                    <Text style={{ maxWidth: '70%', fontSize: 16, backgroundColor: item._data.sender === user.email ? '#0c6ff0' : '#dbdbdb', color: item._data.sender ===user.email ? '#fff' : '#000', padding: 8, paddingVertical: 10 }}>{item._data.message}</Text>
                  </View>
                </>
              </View>
            )
          })}
        </ScrollView>

      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchContainerBox}>
          <TextInput value={message} onChangeText={(text) => setMessage(text)} keyboardType='text' placeholder='Type message...' placeholderTextColor={"#000"} style={styles.searchInput} />
          <TouchableOpacity style={styles.cartDetailBtn} onPress={sendMessage}>
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
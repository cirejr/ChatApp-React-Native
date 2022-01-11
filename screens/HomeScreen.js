import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Avatar} from 'react-native-elements'
import {useEffect, useLayoutEffect, useState} from "react";
import {auth, db} from "../firebase";
import CustomListItem from "../components/CustomListItem";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

function HomeScreen({navigation}) {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=> {
            navigation.replace('Login')
        })
    };

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot(snapchot =>(
            setChats(snapchot.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        ))
        return unsubscribe;
    }, [])

    //<Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "myLine",
            headerLeft: () => (
                <View style={styles.header}>
                </View>
            ),
            headerRight : () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent : 'space-between',
                    width : 70,
                    marginRight : 5,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name="camera" size={26} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <SimpleLineIcons
                            name="logout" size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            )



        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        })
    }

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data :{chatName}})=> (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                )) }
                <View
                    rounded
                    style={{
                        width : 80,
                        //backgroundColor : 'blue',
                        marginTop: 200,
                        marginLeft : 300,
                    }}>
                    <TouchableOpacity
                        style={styles.add}
                        rounded
                        onPress={() => navigation.navigate("AddChat")}
                        activeOpacity={0.5}>
                        <AntDesign name="pluscircle" size={50} color='#2C6BED' />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header:{
        flexDirection : 'row',
        paddingTop : 20,
        paddingBottom : 20,
    },
    add: {
        padding : 15,
        position : 'relative'
    },
    container: {
        height : '100%',
    },
    inputContainer : {
        width : '90%',
    },
    button : {
        width : 150,
        marginTop : 10,
    }

})
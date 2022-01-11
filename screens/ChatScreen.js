import * as React from 'react';
import "firebase/firestore";
import {StatusBar} from "expo-status-bar";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard, TouchableWithoutFeedback
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useLayoutEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {auth, db} from "../firebase";
import firebase from "firebase";


function ChatScreen({navigation, route}) {
    const [input, setInput] = useState("");
    
    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            message : input,
            displayName : auth.currentUser.displayName,
            email : auth.currentUser.email,
            photoURL : auth.currentUser.photoURL
        })
        setInput('')

    }

    useLayoutEffect(() => {
            navigation.setOptions({
                title : "Chat",
                headerBackTitle : "Chats",
                headerTitle:() => (
                    <View style={styles.header}>
                        <Avatar
                            rounded
                            size={30}
                            source={require("../assets/avatar.png")}
                        />
                        <Text style={{
                            color : 'white',
                            marginLeft : 10,
                            fontSize : 20,
                            fontWeight : "700",
                        }}>
                            {route.params.chatName}</Text>
                    </View>

                ),
                headerRight : () => (
                    <View style={{
                        flexDirection : "row",
                        justifyContent : "space-between",
                        width : 70,
                        marginRight : 5
                    }}>
                        <TouchableOpacity>
                            <SimpleLineIcons name="camrecorder" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SimpleLineIcons name="phone" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )


            })
        }, [navigation])

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            {/*Chat goes here*/}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Tapez votre message"
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                            >
                                <Ionicons name="send" size={24} color="#2C6BED"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    header : {
        flexDirection: 'row'
    },
    container: {
        flex : 1
    },
    footer : {
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center',
        width : '100%',
    },
    textInput : {
        bottom : 0,
        height : 40,
        flex : 1,
        marginRight : 15,
        backgroundColor : "#ECECEC",
        padding : 10,
        color : 'grey',
        borderRadius : 30
    },

})
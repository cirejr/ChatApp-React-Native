import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, Button, Input} from 'react-native-elements'
import {useLayoutEffect, useState} from "react";
import {auth, db} from "../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";


function AddChatScreen({navigation}) {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Add new Chat",
            headerBackTitle : "Chats"
            })
        }
    )

    const createChat = async () => {
        await db.collection('chats').add({
            chatName : input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))
    }

    return(
        <View style={styles.container}>
            <Input style={styles.inputContainer}
                onSubmitEditing={createChat}
                placeholder="Enter chat name"
                value={input}
                onChangeText ={(text) => setInput(text)
                }
                leftIcon={
                    <Ionicons name="chatbubble-ellipses-outline" type="antDesign" size={24} color="black"/>
                }
            />
            <Button containerStyle={styles.button}
                    onPress={createChat}
                    title="Create new chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'white',
        height : '100%',
        flex : 1,
        padding : 30,
    },
    inputContainer : {
        width : '90%',
    },
    button : {
        width : '100%',
        marginTop : 10,
        alignItems : 'center'
    }

})
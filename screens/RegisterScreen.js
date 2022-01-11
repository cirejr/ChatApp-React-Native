import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image, Text} from 'react-native-elements'
import {useLayoutEffect, useState} from "react";
import {auth} from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";

function RegisterScreen({navigation}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImagUrl] = useState("");

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackTitle : "Login"
        }
      )
  }, [navigation])


    function register() {
        auth.
            createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName : name,
                    photoURL : imageURL || require("../assets/avatar.png")
                })
            })
            .catch((error) => alert(error.message()))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style ="light" />
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 100 , height: 100, marginTop : 20 }}
            />
            <Text h4 style={{ margin : 15 }}>
                Créer votre compte mySignal
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    leftIcon={
                        <AntDesign name="user" size={24}/>
                    }
                />
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    leftIcon={
                        <MaterialCommunityIcons name="email-edit-outline" size={24}/>
                    }
                />
                <Input placeholder="Password"
                       secureTextEntry
                       type="password"
                       value={password}
                       onChangeText={(text) => setPassword(text)}
                       leftIcon={
                           <MaterialCommunityIcons name="form-textbox-password" size={24}/>
                       }
                />
                <Input
                    placeholder="Profile Picture URL(optional)"
                    type="text"
                    value={imageURL}
                    onChangeText={(text) => setImagUrl(text)}
                    onSubmitEditing={register}
                    leftIcon={
                        <EvilIcons name="user" size={30}/>
                    }
                />
            </View>
            <Button
                containerStyle={styles.button}
                onPress={register}
                raised
                //type={"outline"}
                title={"Register"}
            />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
    },
    inputContainer : {
        width : '90%',
    },
    button : {
        width : 150,
        marginTop : 10,
    }

})
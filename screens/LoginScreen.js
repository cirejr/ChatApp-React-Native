import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image} from 'react-native-elements'
import {useEffect, useState} from "react";
import {auth} from "../firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function LoginScreen({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    function signIn() {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error => alert(error)))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style ="light" />
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 100 , height: 100 }}
            />
            <View style={styles.inputContainer}>
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
                       onSubmitEditing={signIn}
                       leftIcon={
                           <MaterialCommunityIcons name="form-textbox-password" size={24}/>
                       }
                />
            </View>
            <Button
                containerStyle={styles.button}
                onPress={signIn}
                title={"Login"}
            />
            <Button
                containerStyle={styles.button}
                onPress={() => navigation.navigate('Register')}
                type={"outline"}
                title={"Register"}
            />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    );
}

export default LoginScreen

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
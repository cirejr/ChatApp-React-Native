import * as React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, ScrollView} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements'
import {useLayoutEffect, useState} from "react";

function CustomListItem({id, chatName, enterChat}) {
    return(
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={require("../assets/avatar.png")}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    elipsizeMode="tail"
                >
                    Just a test Subtitle Just a test Subtitle Just a test SubtitleJust a test Subtitle

                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

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
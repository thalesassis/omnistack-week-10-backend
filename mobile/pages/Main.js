import React, { useState,useEffect } from 'react';
import { StyleSheet, Image, View, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';
import MapView, { Marker, Callout } from 'react-native-maps';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MaterialIcons } from '@expo/vector-icons';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';

function Main({navigation}) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(()=> { 
        async function loadInitialPosition() { 
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const {latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                })
            }
        }
        loadInitialPosition();
    },[])

    if(!currentRegion) {
        return null;
    }

    async function searchUser() {
        try {
            const usersList = await api.get("/users");
            console.log(usersList.data);
            setUsers(usersList.data);
        } catch(e) {
            console.log(e);
        }
    }

    return (
    <>
    <MapView initialRegion={currentRegion} style={{ flex:1 }}>
        {users.map(user => (
        <Marker key={user._id} coordinate={{ latitude: user.location.coordinates[1], longitude: user.location.coordinates[0] }}>
            <Image style={styles.avatar} source={{ uri: user.avatar_url }} />

            <Callout onPress={() => {
                navigation.navigate('Profile', { github_user: user.username });
            }}>
                <View style={styles.callout}>
                    <Text style={styles.userName}>{user.username}</Text>
                    <Text style={styles.userBio}>{user.bio != null ? user.bio : '(sem bio)'}</Text>
                </View>
            </Callout>
        </Marker>
        ))}
    </MapView>
    
    <View style={styles.addMore}>
        <TouchableOpacity  onPress={() => {
            navigation.navigate('AddUser');
        }} style={styles.loadButton}><MaterialIcons name="person-add" size={20} color="#FFF" /></TouchableOpacity>
    </View>
    
    <View style={styles.searchBox}>
        <TextInput style={styles.searchInput} placeholder={'Enter your text!'}/>
        <TouchableOpacity onPress={()=> searchUser()} style={styles.loadButton}><MaterialIcons name="my-location" size={20} color="#FFF" /></TouchableOpacity>
        <KeyboardSpacer topSpacing={40} />
    </View>

    </>
    )
} 

const styles = StyleSheet.create({
    addMore: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 5
    }, 
    searchBox: {
        flex: 1,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },
    loadButton: {
        width: 40,
        height: 40,
        elevation: 2,
        backgroundColor: '#000',
        borderRadius: 34,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
    }, 
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 54,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    userName: {
        fontWeight: 'bold'
    }
});

export default Main;
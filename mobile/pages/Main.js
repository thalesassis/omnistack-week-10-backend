import React, { useState,useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

function Main({navigation}) {
    const [currentRegion, setCurrentRegion] = useState(null);

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

    return <MapView initialRegion={currentRegion} style={{ flex:1 }}>
        <Marker coordinate={{ latitude: -19.8972234, longitude: -44.0312641 }}>
            <Image style={styles.avatar} source={{ uri: 'https://observatoriodocinema.bol.uol.com.br/wp-content/uploads/2019/08/cropped-cropped-wolverine-1-5.jpg' }} />

            <Callout onPress={() => {
                navigation.navigate('Profile', { github_user: 'octocat' });
            }}>
                <View style={styles.callout} />
                <Text style={styles.userName}>Nome</Text>
                <Text style={styles.userBio}>Bio</Text>
            </Callout>
        </Marker>
    </MapView>
} 

const styles = StyleSheet.create({
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
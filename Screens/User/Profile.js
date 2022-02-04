import React, {useState, useEffect, useCallback, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from "native-base";
import { useFocusEffect } from '@react-navigation/native';

import axios from "axios";
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../../Context/actions/Auth.actions';

const Profile = (props) => {
    const context = useContext(AuthGlobal);

    console.log('This Context', context)
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        if(context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null){
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                // console.log('gggggggg',context.stateUser);
                console.log('gggggggg',res);
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, { headers: {"Authorization" : `Bearer ${res}`} })
                    .then((user) => setUserProfile(user.data))  
            })
            .catch((error) => console.log('Error',error))

            return () => {
                setUserProfile();
            }
    },[context.stateUser.isAuthenticated])




    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{fontSize: 30}}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{marginTop: 20}}>
                    <Text style={{margin: 10}}>
                        Email: {userProfile ? userProfile.email : "No"}
                    </Text>
                    <Text style={{margin: 10}}>
                        Phone: {userProfile ? userProfile.phone : "No"}
                    </Text>
                </View>
                <View style={{marginTop: 50}}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]} />
                </View>
            </ScrollView>
        </Container>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    subContainer: {
        alignItems: 'center',
        marginTop: 60
    }
})

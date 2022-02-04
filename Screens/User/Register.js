import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Formcontainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async () => {
        if(email === '' || name === '' || phone === '' || password === ''){
            setError("Please provide all form values");
        }
        let data = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }

        axios
            .post(`${baseURL}users/register`, data)
            .then((res) => {
                console.log('Then',res)
                if(res.status == 200){
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "REGISTRATION SUCCESS",
                        text2: "Please log into your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 500);
                }
                
            })
            .catch((error) => {
                console.log('Error',error)
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "SOMETHING WENT WRONG",
                    text2: "Please try again."
                })
        })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <Formcontainer title={'Register'}>
                <Input
                    placeholder={"Enter Email"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Enter Full Name"}
                    name={"name"}
                    id={"name"}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Enter Phone"}
                    name={"phone"}
                    id={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Enter Password"}
                    name={"password"}
                    id={"password"}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

            <View style={styles.buttonGroup}>
                <Text>{error && (<Error message={error} />) }</Text>
                <EasyButton large primary onPress={() => register()}>
                    <Text style={{color: 'white'}}>Register</Text>
                </EasyButton>
            </View>

            <View style={[{marginTop: 40}, styles.buttonGroup]}>
                <Text style={styles.middleText}>Already have an account?</Text>
                <EasyButton large secondary onPress={() => props.navigation.navigate('Login')}>
                    <Text style={{color: 'white'}}>Login</Text>
                </EasyButton>
            </View> 
            </Formcontainer>

        </KeyboardAwareScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    }
})

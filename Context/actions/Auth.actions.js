import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import baseURL from '../../assets/common/baseUrl';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        // CONSOLE.LOG
        // console.log('Login Data',data);
        if(data){
            const token = data.token;
            AsyncStorage.setItem("jwt", token);
            const decoded = jwt_decode(token);
            console.log('Decoded', decoded);
            console.log('User', user);
            dispatch(setCurrentUser(decoded, user)) // TODO
        }else{
            // TODO
            logoutUser(dispatch)
        }

    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: "Error"
        })
        logoutUser(dispatch)
    });
};

// THIS BLOCK IS FOR GETTING PROFILE DATA
export const getUserProfile = (id,user) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}

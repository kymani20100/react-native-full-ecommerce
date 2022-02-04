import React, {useReducer, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        console.log('Async Storage',AsyncStorage.jwt)
        

        async function fetchUser() {
            const decode = await AsyncStorage.getItem('jwt');
            if(decode){
                const decoded = decode ? decode : "";
                if(setShowChild){
                    dispatch(setCurrentUser(jwt_decode(decoded)))
                }
            }
        }

        fetchUser();
        return () => setShowChild(false);
    }, [])

    if(!showChild){
        return null;
    }else {
        return (
            <AuthGlobal.Provider value={{stateUser, dispatch}}>
                {props.children}
            </AuthGlobal.Provider>
        )
    }
}

export default Auth;
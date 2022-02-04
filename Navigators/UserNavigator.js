import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import Profile from '../Screens/User/Profile';

const Stack = createStackNavigator();

const UserNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false,}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false,}} />
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}} />
      </Stack.Navigator>
    )
}

export default UserNavigator

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// SCREENS
import Checkout from '../Screens/Cart/Checkout/Checkout';
import Confirm from '../Screens/Cart/Checkout/Confirm';
import Payment from '../Screens/Cart/Checkout/Payment';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Shipping" component={Checkout} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    )
}

const CheckoutNavigator = () => {
    return (
       <MyTabs />
    )
}

export default CheckoutNavigator;


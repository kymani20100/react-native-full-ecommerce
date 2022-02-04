import React from 'react';
// import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import Orders from '../Screens/Admin/Orders';
import Products from '../Screens/Admin/Products';
import ProductForm from '../Screens/Admin/ProductForm';
import Categories from '../Screens/Admin/Categories';


const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Products" component={Products} options={{headerShown: true, title: "Products"}} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm}  />
            <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    )
}

export default AdminNavigator

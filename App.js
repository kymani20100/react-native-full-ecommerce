import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// REDUX
import {Provider} from 'react-redux';
import store from './Redux/store';

// CONTEXT API
import Auth from "./Context/store/Auth";

// IMPORTS
import Header from './Shared/Header'
import ProductContainer from './Screens/Products/ProductContainer'
import Main from './Navigators/Main'
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
        <Provider store={store}>
          <NavigationContainer>
              <Header />
              <Main />
              <Toast />
          </NavigationContainer>
        </Provider>
    </Auth>
  );
}


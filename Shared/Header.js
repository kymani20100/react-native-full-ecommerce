import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
        <Image 
            style={{height: 50}} 
            resizeMode="contain" 
            source={require("../assets/images/logo.png")} 
        />
    </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        // marginTop: 80
    }
})

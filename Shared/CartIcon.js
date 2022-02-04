import React from 'react';
import { StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';
import {Badge, Text} from 'native-base';

const CartIcon = (props) => {
    return (
        <>
            {props.cartItems.length ? (
                <Badge style={styles.badge}>
                    <Text style={[styles.text, {right: props.cartItems.length >= 10 ? (0): (-1)}]}>{props.cartItems.length}</Text>
                </Badge>
            ): null}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps)(CartIcon)

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
        top: -4,
        right: -15,
    },
    text: {
        fontSize: 12,
        width: 100,
        fontWeight: 'bold',
        color: '#FFF',
        position: 'relative',
    }
})

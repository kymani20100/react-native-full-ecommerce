import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions, Button, ScrollView} from "react-native";
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
var { height, width } = Dimensions.get("window");

const CartItem = (props) => {
    const data = props.item.item.product;
    console.log('CartItem', props.item.item.product)
    const [quantity, setQuantity] = useState(props.item.quantity)

    return (
        <ListItem style={styles.listItem} key={Math.random()} avatar>
            <Left>
                {data.image ? (
                    <Thumbnail source={{uri: data.image}} />
                ) : (
                    <Thumbnail source={require('../../assets/images/phone-1.png')}  />
                )}
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>
                <Right>
                    <Text>$ {data.price}</Text>
                </Right>
            </Body>
        </ListItem>
    )
}

export default CartItem

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#FFF',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
})

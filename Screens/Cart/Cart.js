import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';

import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as actions from "../../Redux/Action/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";

import EasyButton from '../../Shared/StyledComponents/EasyButton';

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
    var total = 0;
    props.cartItems.forEach((cart) => {
        return ((total += +cart.product.price).toFixed(2));
    });

  const [myCart, setMyCart] = useState(props.cartItems);

    return (
        <>
            {props.cartItems.length ? (
                <Container>
                    <H1 style={{alignSelf: 'center'}}>Cart</H1>
                    <SwipeListView 
                        data={props.cartItems}
                        renderItem={ (data, rowMap) => (
                          <CartItem item={data} />
                        )}
                        renderHiddenItem={ (data, rowMap) => (
                          <View style={styles.hiddenContainer}>
                              <TouchableOpacity style={styles.hiddenButton} onPress={() => props.removeFromCart(data.item)}>
                                <Icon name="trash" color={"white"} size={30} />
                              </TouchableOpacity>
                          </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />

                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>$ {total}</Text>
                        </Left>
                        <Right>
                          <EasyButton medium danger onPress={() => props.clearCart()}>
                              <Text style={{color: 'white'}}>Clear</Text>
                          </EasyButton>
                        </Right>
                        <Right>
                          <EasyButton medium primary onPress={() => props.navigation.navigate('Checkout')}>
                              <Text style={{color: 'white'}}>Checkout</Text>
                          </EasyButton>
                        </Right>
                    </View>
                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty</Text>
                    <Text>Add a product to get started</Text>
                </Container>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
      cartItems: cartItems,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearCart()),
      removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);
  
  const styles = StyleSheet.create({
    emptyContainer: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
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
    bottomContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: "#FFF",
      elevation: 20,
    },
    price: {
      fontSize: 18,
      margin: 20,
      color: "red",
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2
    }
  });
  

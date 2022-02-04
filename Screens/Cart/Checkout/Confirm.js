import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Button } from 'react-native'
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Action/cartActions'

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {

        const confirmOrder = () => {
            setTimeout(() => {
                props.clearCart();
                props.navigation.navigate("Cart")
            },500)
        }

        const confirm = props.route.params;
        console.log(confirm)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm Order</Text>
                {props.route.params && (
                    <View style={{borderWidth: 1, borderColor: 'orange', margin: 5, padding: 5}}>
                        <Text style={styles.titles}>Shipping to:</Text>
                        <View style={{padding: 8}}>
                            <Text>
                                Address: {confirm.order.order.shippingAddress1}
                            </Text>
                            <Text>
                                Address2: {confirm.order.order.shippingAddress2}
                            </Text>
                            <Text>
                                City: {confirm.order.order.city}
                            </Text>
                            <Text>
                                Zip Code: {confirm.order.order.zip}
                            </Text>
                            <Text>
                                Country: {confirm.order.order.country}
                            </Text>
                        </View>

                        <Text style={styles.titles}>Items:</Text>
                        {confirm.order.order.orderItems.map((x) => {
                             return (
                                 <ListItem 
                                    style={styles.listItem}
                                    key={x.product.name}
                                    avatar
                                 >
                                     <Left>
                                        {x.product.image ? (
                                            <Thumbnail source={{uri: x.product.image}} />
                                        ) : (
                                            <Thumbnail source={require('../../../assets/images/phone-1.png')}  />
                                        )}
                                     </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                            <Text>{x.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>${x.product.price}</Text>
                                        </Right>
                                    </Body>
                                 </ListItem>
                             )
                        })}
                    </View>
                )}

                <View style={{alignItems: 'center', margin: 20}}>
                        <Button title={'Place Order'} onPress={confirmOrder} />
                </View>

            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
    }
}

export default connect(null, mapDispatchToProps)(Confirm)

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: '#FFF'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    titles: {
        alignSelf: 'flex-start',
        margin: 8,
        fontSize: 17,
        fontWeight: 'bold'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    }
})

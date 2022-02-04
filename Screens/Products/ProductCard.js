import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
var { width } = Dimensions.get("window");
import Toast from 'react-native-toast-message';
import EasyButton from "../../Shared/StyledComponents/EasyButton"
// REDUX
import {connect} from 'react-redux';
import * as actions from '../../Redux/Action/cartActions';

const ProductCard = (props) => {
    const {name, price, image, countInStock} = props;
    // console.log(props)
    return (
        <View style={styles.container}>
           
           {image ? (
                <Image style={styles.image} resizeMode="contain" source={{uri: image}} />
           ) : (
                <Image style={styles.image} resizeMode="contain" source={require('../../assets/images/phone-1.png')}  />
           )}

           <View style={styles.card} />
           <Text style={styles.title}>
               
                {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
           </Text>
           <Text style={styles.price}>$ {price}</Text>
           {countInStock > 0 ? (
               <View style={{marginBottom: 60}}>
                   <EasyButton primary medium onPress={() => {
                       props.addItemToCart(props),
                       Toast.show({
                           topOffset: 60,
                           type: "success",
                           text1: `${name} added to cart`,
                           text2: "Go to cart to complete your order"
                       })
                    }}>
                        <Text style={{color: 'white'}}>Add</Text>
                    </EasyButton>
               </View>
           ) : (<Text style={{marginTop: 20}}>Out of Stock</Text>)}
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => 
        dispatch(actions.addToCart({quantity: 1, product}))
    }
}

// export default ProductCard;
export default connect(null, mapDispatchToProps)(ProductCard);

const styles = StyleSheet.create({
    container : {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10, 
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: - 45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

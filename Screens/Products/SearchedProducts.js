import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

var { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
    const {productsFiltered} = props;

    console.log(productsFiltered)
    return (
        <Content style={{width: width}}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem key={item._id.$oid} avatar onPress={() => {
                        props.navigation.navigate("Product Detail", { item: item })
                    }}>
                        <Left>
                            {item.image ? (
                                <Thumbnail 
                                    source={{uri: item.image}}
                                />
                                ) : (
                                <Thumbnail 
                                    source={require("../../assets/images/phone-1.png")}
                                />
                            )}
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>

                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{alignSelf: 'center'}}>No Products matched your search</Text>
                </View>
            )}
        </Content>
    );
};

export default SearchedProducts

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
      },
})

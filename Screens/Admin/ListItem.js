import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
var {width} = Dimensions.get("window")

const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(false)}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity underlayColor={"#E8E8E8"} onPress={() => {setModalVisible(false)}} style={{alignSelf: 'flex-end', position: "absolute", top: 5, right: 10}}>
                            <Icon name="close" size={20} />
                        </TouchableOpacity>

                        <EasyButton medium secondary onPress={() => [ props.navigation.navigate("ProductForm", {item: props}), setModalVisible(false)]}>
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>

                        <EasyButton medium danger onPress={() => [props.delete(props._id), setModalVisible(false)]}>
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>

                        {/* <Button title="Edit" onPress={() => [ props.navigation.navigate("ProductForm"), setModalVisible(false)]} /> */}
                        {/* <Button title="Delete" /> */}
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={[styles.container, {backgroundColor: props.index % 2 == 0 ? "#FFF" : "gainsboro"}]} onPress={() => {props.navigation.navigate("Product Detail", {item: props})}} onLongPress={() => setModalVisible(true)}>
                {props.image ? (
                    <Image style={styles.image} resizeMode="contain" source={{uri: props.image}} />
                ) : (
                    <Image style={styles.image} resizeMode="contain" source={require('../../assets/images/phone-1.png')}  />
                )}
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.category.name}</Text>
                <Text style={styles.item}>$ {props.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5, 
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: 'bold'
    }
})

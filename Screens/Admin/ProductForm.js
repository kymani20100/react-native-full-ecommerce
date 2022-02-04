import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import {Item, Picker} from "native-base";
import Formcontainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Error from '../../Shared/Error';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from 'mime';

const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);
    const [imageType, setImageType] = useState('');

    useEffect(() => {

        // THIS IS THE EDIT BLOCK
        if(!props.route.params){
            setItem(null);
        }else{
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
    
        }

        AsyncStorage.getItem("jwt").then((res) => setToken(res)).catch((error) => console.log(error));
        
        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => {
                console.log('Category', res.data)
                setCategories(res.data)
            })
            .catch((error) => alert("Error loading categories"));

            // Image Picker
            (async () => {
                if (Platform.OS !== "web"){
                    const {status} = await ImagePicker.requestCameraPermissionsAsync();
                    if(status !== "granted"){
                        alert("Sorry, we need camera permissions")
                    }
                }
            })();

            return () => {
                setCategories([])
            }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            console.log('Image', result)
            setMainImage(result.uri);
            setImage(result.uri);
            setImageType(result.type)
        }
    }

    const addProduct = () => {
        if(name == '' || brand == '' || price == '' || description == '' || category == '' || countInStock == ''){
            setError("Please fill in the form correctly");
        }

        let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");

        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });

        // console.log(mime.getType(newImageUri));

        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        // console.log('Form Data', formData);

        if(item !== null) {
            axios
            .put(`${baseURL}products/${item.id}`, formData, config)
            .then((res) => { 
                if(res.status == 200 || res.status == 201){
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Product Updated",
                        text2: "The Product has been updated"
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Server Down, Please try again"
                });
            });

        }else {
            axios
            .post(`${baseURL}products`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201){
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Product added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Server Down, Please try again"
                });
            });
        }
    }



    return (
        <Formcontainer title="Add Product">
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: mainImage}} />
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{color: "white"}} name="camera" />
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text>Brand</Text>
            </View>
            <Input 
                placeholder="Brand"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View style={styles.label}>
                <Text>Name</Text>
            </View>
            <Input 
                placeholder="Product Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.label}>
                <Text>Price</Text>
            </View>
            <Input 
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.label}>
                <Text>Count in Stock</Text>
            </View>
            <Input 
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
             <View style={styles.label}>
                <Text>Description</Text>
            </View>
            <Input 
                placeholder="Short Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />

            <Item picker>
                <Picker 
                    mode="dropdown" 
                    iosIcon={<Icon name={"arrow-down"} style={{color: "#007aff", fontSize: 25}} />}
                    style={{width: undefined}} 
                    placeholder="Select your Category" 
                    selectedValue={pickerValue} 
                    placeholderStyle={{color: "#007aff"}} 
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}>
                        {categories.map((c, index) => {
                            return <Picker.Item key={index} label={c.name} value={c._id} />
                        })}
                </Picker>
            </Item>
           

            <Text>{err ? <Error message={err} /> : null}</Text>
            <View style={styles.buttonContainer}>
                <EasyButton large primary onPress={() => addProduct()}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>
        </Formcontainer>
    )
}

export default ProductForm

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80, 
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: "#FFF"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
       position: 'absolute',
       right: 5,
       bottom: 5,
       backgroundColor: 'grey',
       padding: 8,
       borderRadius: 100,
       elevation: 20
    },

})

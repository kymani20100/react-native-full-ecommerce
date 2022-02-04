import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput } from 'react-native'
import baseURL from '../../assets/common/baseUrl';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var { width } = Dimensions.get("window");

const Item = (props) => {
    return (
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
            </EasyButton>
        </View>
    );
}

const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)})
            .catch((error) => alert("Error to load categories"));

        return () => {
            setCategories();
            setToken();
        }
    }, [])

    const addCategory = () => {
        const category = {
            name: categoryName
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .post(`${baseURL}categories`, category, config)
            .then((res) => setCategories([...categories, res.data]))
            .catch((error) => alert("Error to load categories"));

            setCategoryName("");
    }

    const deleteCategory = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}categories/${id}`, config)
            .then((res) => {
                const newCategories = categories.filter((item) => item._id !== id);
                setCategories(newCategories);
            })
            .catch((error) => alert("Error to load categories"));
    }

    return (
        <View style={{position: "relative", height: "100%"}}>
            <View style={{marginBottom: 60}}>
                <FlatList 
                    data={categories}
                    renderItem={({item, index}) => (
                        <Item key={index} item={item} index={index} delete={deleteCategory} />
                    )}
                    keyExtractor={(item) => item._id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Categories</Text>
                </View>

                <View style={{width: width / 2.5}}>
                    <TextInput style={styles.input} value={categoryName} onChangeText={(text) => setCategoryName(text)} />
                </View>

                <View>
                    <EasyButton medium primary onPress={() => addCategory()}>
                        <Text style={{color: 'white'}}>Submit</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: '#FFF',
        width: width,
        height: 60,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5
    }
})

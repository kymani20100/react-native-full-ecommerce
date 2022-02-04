import React from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { ListItem, Badge, Text } from 'native-base';

const CategoryFilter = (props) => {
    return (
        <ScrollView bounces={true} horizontal={true} style={{backgroundColor: '#f2f2f2'}}>
            {/* <Chip icon={props.active == -1 ? 'check' : 'information'} style={{backgroundColor: 'red', marginHorizontal: 3}} selectedColor={props.active == -1 ? 'aqua' : 'red'} textStyle={{color: '#FFF'}} onPress={() => {
                props.CategoryFilter('all'), props.setActive(-1)
            }}>All</Chip>

            {props.categories.map((item) => (
                <Chip key={item._id} icon={props.categories.indexOf(item) ? 'check' : 'information'} style={{backgroundColor: 'red', marginHorizontal: 3}} selectedColor={props.categories.indexOf(item) ? 'aqua' : 'red'} textStyle={{color: '#FFF'}} onPress={() => {
                props.CategoryFilter(item._id), props.setActive(props.categories.indexOf(item))
            }}>{item.name}</Chip>
            ))} */}
            <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
                <TouchableOpacity key={1} onPress={() => {props.CategoryFilter('all'), props.setActive(-1)}}>
                    <Badge style={[styles.center, {margin: 5}, props.active == -1 ? styles.active : styles.inactive]}>
                        <Text style={{color: 'white'}}>All</Text>
                    </Badge>
                </TouchableOpacity>

                {props.categories.map((item) => (
                    <TouchableOpacity key={item._id} onPress={() => {props.CategoryFilter(item._id), props.setActive(props.categories.indexOf(item))}}>
                        <Badge style={[styles.center, {margin: 5}, props.active == props.categories.indexOf(item) ? styles.active : styles.inactive]}>
                            <Text style={{color: 'white'}}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

export default CategoryFilter

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

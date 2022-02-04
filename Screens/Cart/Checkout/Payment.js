import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, View } from 'react-native'
import {Container,Header,Content,ListItem,Text,Radio,Right,Left,Picker,Icon,Body,Title} from 'native-base';

const methods = [
    { name: "Cash On Delivery", value: 1 },
    { name: "Bank Transfer", value: 2 },
    { name: "Card Payment", value: 3 },
];
  
const paymentCards = [
    { name: "Wallet", value: 1 },
    { name: "Visa", value: 2 },
    { name: "MasterCard", value: 3 },
    { name: "Other", value: 4 },
];

const Payment = (props) => {
    const order = props.route.params;
    const [selected, setSelected] = useState();
    const [card, setCard] = useState()

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Choose your payment method</Title>
                </Body>
            </Header>
            <Content>
                {methods.map((item, index) => {
                    return (
                        <ListItem key={index} onPress={() => setSelected(item.value)}>
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right>
                                <Radio selected={selected === item.value} />
                            </Right>
                        </ListItem>
                    )
                })}
                {selected == 3 && (
                    <Picker
                    mode="dropdown"
                    placeholder="Select your card"
                    iosIcon={<Icon name={"arrow-down"} style={{color: "#007aff", fontSize: 25}} />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    headerStyle={{backgroundColor: 'orange'}}
                    headerBackButtonTextStyle={{color: '#FFF'}}
                    headerTitleStyle={{color: '#FFF'}}
                    selectedValue={card}
                    onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((c,index) => {
                            return <Picker.Item key={index} label={c.name} value={c.name} />
                        })}
                    </Picker>
                )}

                <View style={{marginTop: 60, alignSelf: 'center'}}>
                        <Button title={"Confirm"} onPress={() => props.navigation.navigate("Confirm", {order: order})} />
                </View>

            </Content>
        </Container>
    )
}

export default Payment

const styles = StyleSheet.create({})

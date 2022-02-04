import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';

var {width} = Dimensions.get('window');


const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
        "bannerOne",
        "bannerTwo",
        "bannerThree"])

        return () => {
            setBannerData([]);
        }
    }, [])

    return (
       <ScrollView>
             <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper style={{height: width / 2}} showButtons={false} autoplay={true} autoplayTimeout={2}>
                        {bannerData.map((item) => {
                            return (
                                <Image 
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={require(`../assets/images/bannerTwo.png`)}
                                />
                            )
                        })}
                    </Swiper>
                    <View style={{height: 20}}></View>
                </View>
            </View>
       </ScrollView>
    )
}

export default Banner

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

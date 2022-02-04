import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions, Image } from "react-native";
import { Container, Header, Icon, Item, Input } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

var { height, width} = Dimensions.get("window");
// SCREENS
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";

const ProductContainer = (props) => {
  // STATE VARIABLES
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [productsCtg, setProductsCtg] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      axios
        .get(`${baseURL}products`)
        .then((res) => {
          // console.log("Heya", res);
          setProducts(res.data);
          setProductsFiltered(res.data);
          setInitialState(res.data);
          setProductsCtg(res.data);
          setLoading(false);
        })
        .catch((res) => {
          // handle error
          console.log(res);
        });

      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((res) => {
          // handle error
          console.log(res);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState([]);
      };
    }, [])
  );

  // SEARCH PRODUCT FUNCTION
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // CATEGORY MAGIC
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {!loading ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus === true && <Icon onPress={onBlur} name="ios-close" />}
            </Item>
          </Header>
          {focus === true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    CategoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No Products found for that category</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        <View style={[styles.center, {backgroundColor: '#FFF', height: height }]}>
            <Image style={{width: 350, height: 350, justifyContent: 'center', alignItems: 'center'}} source={require('../../assets/images/empty.png')}  />
            <Text style={{fontSize: 15, }}>Looks like the Mall is empty mate.</Text>
        </View>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

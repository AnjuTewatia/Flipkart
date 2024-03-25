import { StyleSheet, View, Platform, ScrollView, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import { Typography } from '../../Components/Typography';
import Common from '../../utils/common';
import HomeImages, { BrandImage } from '../../Components/HomeImages';
import IMAGES from '../../utils/Images';
import { useAppContext } from '../../Components/AppContext';
import useFetch from '../../utils/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderStoreListing from '../../Components/RenderStoreListing';

const Home = ({ navigation }) => {
  return (
    <AppBaseComponent
      title={'Home'}
      renderChild={Content({ navigation })}
      topPadding={0}
      height={'97%'}
    />
  );
};
const Content = ({ navigation }) => {

  const [data, setData] = useState('')
  const [getProduct, { response, loading, error }] = useFetch('product', {
    method: 'GET',
  });


  const handleProducts = async () => {
    try {
      const res = await getProduct()
      if (res) {
        setData(res)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    handleProducts()
  }, [])

  const RenderItem = ({ item }) => {
    return (
      <>
        <View style={styles.product}>
          <Image
            source={{ uri: item.image1 }}
            style={{
              width: 300,
              height: 200,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 20, textAlign: "left" }}>
            {item?.title}
          </Text>
          <Text style={{ color: "grey", textAlign: "left" }}>
            {item?.description}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "left" }}>
            {" "}
            Price:{item?.price}
          </Text>
          <TouchableOpacity
            style={styles.cartbutton}
            onPress={() => navigation.navigate('Details',{id :item?._id})}
          >
            <Text style={{ color: "white", fontSize: 18 }}>View Details</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }


  return (
    <View
      bounces={false}
      style={[Common.container, styles.container]}
      showsVerticalScrollIndicator={false}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
  },
  welcomeText: {
    fontSize: 24,
    marginTop: 12,
    color: '#371841',
    marginBottom: 6,
    fontFamily: 'DMSans-SemiBold',
  },
  LogoText: {
    color: '#8C2457',
    fontFamily: 'DMSans-Bold',
  },
  product: {
    flexDirection: "column",
    marginBottom: 16,
    padding: 20,
    borderColor: "grey",
    borderWidth: 2,
    margin: 20,
  },
  cartbutton: {
    backgroundColor: "grey",
    padding: 13,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
});

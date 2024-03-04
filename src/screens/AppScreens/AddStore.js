import {Alert, FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';

import {useAppContext} from '../../Components/AppContext';
import RenderStoreListing from '../../Components/RenderStoreListing';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import Shimmer from '../../Components/Shimmer';
import NoFound from '../../Components/NoFound';
const AddStore = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Add Store'}
      backButton
      navigation={navigation}
      height={'97%'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {getCurrentLocation} = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStore = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100&type=liquor_store%7Cbar%7Ccafe%7Csupermarket%7Cstore%7Cshopping_mall&key=AIzaSyBK5_ZV8qCWXGmVZo6WOFdRVhntc-Sqg4c`,
      );
      const data = await response.json();

      setPlaces(data?.results);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation()
      .then(({latitude, longitude}) => {
        getStore(latitude, longitude);
      })
      .catch(error => {
        // Handle error
        console.log('Error:', error);
      });
  }, []);

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreListing
          item={item}
          type={'addstore'}
          navigation={navigation}
        />
      </>
    );
  };

  function searchByName(data, query) {
    setSearchValue(query);

    query = query.toLowerCase();
    const newData = data.filter(item =>
      item.name.toLowerCase().includes(query),
    );
    setPlaces(newData);
  }
  return (
    <>
      <View style={[Common.container, styles.storeContainer]}>
        <View style={styles.searchContainer}>
          <RenderImages source={IMAGES.searchicon} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={text => searchByName(places, text)}
            placeholder="Search Store by Name"
            placeholderTextColor={'#99999E'}></TextInput>
        </View>
        {loading ? (
          <Shimmer />
        ) : (
          <>
            {places?.length > 0 ? (
              <FlatList
                bounces={false}
                contentContainerStyle={{paddingBottom: 10}}
                data={places}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                renderItem={RenderItem}
              />
            ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <NoFound title={'No store found at this location'} />
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};
export default AddStore;

const styles = StyleSheet.create({
  storeContainer: {
    flex: 1,
  },

  searchContainer: {
    height: 50,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 8,
    borderRadius: 8,
    width: '99%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchicon: {
    width: 16,
    height: 16,
    zIndex: 999,
    marginHorizontal: 2,
  },
  input: {
    width: '94%',
    marginHorizontal: 4,
    color: '#000',
    fontSize: 15,
    padding: 2,
  },
});

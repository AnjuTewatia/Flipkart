import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';
import BottomSheet from '../../Components/BottomSheet';
import Common from '../../utils/common';
import RightHeaderButton from '../../Components/RightHeaderButton';
import useFetch from '../../utils/useFetch';
import RenderStoreListing from '../../Components/RenderStoreListing';
import Shimmer from '../../Components/Shimmer';
import NoFound from '../../Components/NoFound';
import {useIsFocused} from '@react-navigation/native';

const StoreListing = ({navigation, route}) => {
  const type = route?.params?.type;
  return (
    <AppBaseComponent
      title={'Store Listing'}
      navigation={navigation}
      backButton
      height={'97%'}
      renderChild={Content({navigation, type})}
      rightButton={
        type === 'store' ? (
          <RightHeaderButton
            icon={IMAGES.addIcon}
            title="Store"
            onPress={() => navigation.navigate('AddStore')}
          />
        ) : null
      }
    />
  );
};

const Content = ({navigation, type}) => {
  const [searchvalue, setSearchValue] = useState('');
  const [paginationValue, setPaginationValue] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [data, setdata] = useState([]);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [totalRecords, setTotalRecords] = useState('');
  const [currentRecord, setCurrentRecord] = useState('');
  const [loading, setLoading] = useState(false);
  const {checkAndRequestLocationPermission} = useAppContext();
  const isFocused = useIsFocused();

  const [storeListing, {response, error}] = useFetch('get-stores', {
    method: 'POST',
  });

  const handleStoreListing = async updatePage => {
    try {
      const res = await storeListing({
        keywords: searchvalue,
        pagination_value: paginationValue,
        page: pageNo,
      });
      if (updatePage) {
        setdata(prevData => prevData.concat(res?.data?.data));
      } else {
        setdata(res?.data?.data);
      }
      setTotalRecords(res?.data?.total);
      setCurrentRecord(res?.data?.to);
    } catch (error) {
      console.error('Error fetching store listing:', error);
    }
    setLoading(false);
    setBottomLoader(false);
  };

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreListing item={item} type={type} navigation={navigation} />
      </>
    );
  };
  const handleReachedEnd = async () => {
    setBottomLoader(false);
    if (!loading && data.length > 9 && data.length < totalRecords) {
      if (currentRecord < totalRecords) {
        setBottomLoader(true);
        setPageNo(prev => prev + 1);
      }
    }
  };

  const handleSearchChange = text => {
    setSearchValue(text);
    setdata([]);
    setPageNo(1);
  };

  useEffect(() => {
    checkAndRequestLocationPermission();
    setLoading(true);
    if (searchvalue) {
      const timer = setTimeout(() => {
        console.log('hello');
        handleStoreListing();
      }, 800);
      return () => clearTimeout(timer);
    } else {
      handleStoreListing();
    }
  }, [searchvalue, isFocused]);

  useEffect(() => {
    if (pageNo > 1) {
      setBottomLoader(true);
      handleStoreListing(true);
    }
  }, [pageNo]);

  return (
    <>
      <View style={[Common.container, styles.storeContainer]}>
        <View style={styles.searchContainer}>
          <RenderImages source={IMAGES.searchicon} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder="Search store by name"
            value={searchvalue}
            onChangeText={handleSearchChange}
            placeholderTextColor={'#99999E'}></TextInput>
        </View>

        {loading ? (
          <Shimmer />
        ) : (
          <>
            {data?.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                data={data}
                extraData={data}
                keyExtractor={item => item?.uuid}
                showsVerticalScrollIndicator={false}
                renderItem={RenderItem}
                onEndReached={handleReachedEnd}
                ListFooterComponent={
                  bottomLoader ? (
                    <View style={{marginBottom: 40}}>
                      <ActivityIndicator size="large" color={'#000'} />
                    </View>
                  ) : (
                    <></>
                  )
                }
              />
            ) : (
              <NoFound title={'No store found'} />
            )}
          </>
        )}
      </View>
    </>
  );
};
export default StoreListing;

const styles = StyleSheet.create({
  container: {
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

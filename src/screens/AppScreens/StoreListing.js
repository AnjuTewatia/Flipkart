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
  const [loading, setLoading] = useState(true);

  const [storeListing, {response, error}] = useFetch('get-stores', {
    method: 'POST',
  });

  const handleStoreListing = async () => {
    try {
      const res = await storeListing({
        keywords: searchvalue,
        pagination_value: paginationValue,
        page: pageNo,
      });

      setdata(prevData => prevData.concat(res?.data?.data));
      setTotalRecords(res?.data?.total);
      setCurrentRecord(res?.data?.to);
      setBottomLoader(false);
    } catch (error) {
      console.error('Error fetching store listing:', error);
    }
  };

  useEffect(() => {
    handleStoreListing();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [pageNo, searchvalue]);

  const RenderItem = ({item}) => {
    return (
      <>
        {loading ? (
          <Shimmer />
        ) : (
          <RenderStoreListing item={item} type={type} navigation={navigation} />
        )}
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

    const timeoutId = setTimeout(() => {
      setdata([]);
      handleStoreListing(); // Call API after a delay
    }, 500); // Adjust delay as needed (e.g., 300ms, 500ms)
    return () => clearTimeout(timeoutId); // Cleanup function for unmounting
  };
  return (
    <>
      <View style={[Common.container, styles.storeContainer]}>
        <View style={styles.searchContainer}>
          <RenderImages source={IMAGES.searchicon} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder="Search store by name"
            value={searchvalue}
            onChangeText={text => handleSearchChange(text)}
            placeholderTextColor={'#99999E'}></TextInput>
        </View>

        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={data}
          extraData={data}
          keyExtractor={item => item?.id}
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

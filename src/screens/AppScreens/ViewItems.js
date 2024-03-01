import {FlatList, Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';

import {useAppContext} from '../../Components/AppContext';

import BottomSheet from '../../Components/BottomSheet';
import Common from '../../utils/common';
import RightHeaderButton from '../../Components/RightHeaderButton';
import RenderStoreItems from '../../Components/RenderStoreItems';
import Scanner from '../../Components/Scanner';
import useFetch from '../../utils/useFetch';
import {useIsFocused} from '@react-navigation/native';
import Shimmer from '../../Components/Shimmer';
import NoFound from '../../Components/NoFound';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import ConfirmModal from '../../Components/ConfirmModal';

const ViewItems = ({navigation, route}) => {
  const store_id = route?.params?.item?.id;
  const store_uuid = route?.params?.item?.uuid;
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleScan = data => {
    setScannedData(data);
    setScannerVisible(false);
    navigation.navigate('AddItem', {data: data?.data, id: store_id});
  };

  const requestCameraPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.CAMERA;
      } else {
        permission = PERMISSIONS.ANDROID.CAMERA;
      }
      const result = await check(permission);
      console.log(result);
      // if(result === RESULTS.DENIED){
      //   const requestResult = await request(permission);

      // }
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permission);
          if (requestResult === 'blocked') {
            setIsOpen(true);
          }
          if (requestResult === RESULTS.GRANTED) {
            setScannerVisible(true);
          }
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          setScannerVisible(true);
          break;
        case RESULTS.BLOCKED:
          setIsOpen(true);
          break;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <AppBaseComponent
      title={'View Items'}
      navigation={navigation}
      backButton
      renderChild={Content({
        navigation,
        store_uuid,
        handleScan,
        scannerVisible,
        store_id,
        setScannerVisible,
        isOpen,
        setIsOpen,
      })}
      rightButton={
        <RightHeaderButton
          icon={IMAGES.addIcon}
          title="Item"
          onPress={() => requestCameraPermission()}
        />
      }
    />
  );
};

const Content = ({
  navigation,
  handleScan,
  scannerVisible,
  setScannerVisible,
  store_uuid,
  store_id,
  isOpen,
  setIsOpen,
}) => {
  const {goToSettings, getCurrentLocation} = useAppContext();
  const [searchvalue, setSearchValue] = useState('');
  const [paginationValue, setPaginationValue] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [data, setdata] = useState([]);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const [storeListing, {response, loading, error}] = useFetch('get-items', {
    method: 'POST',
  });
  console.log(store_uuid);

  const isFocused = useIsFocused();
  const handleStoreListing = async () => {
    try {
      const res = await storeListing({
        store_uuid: store_uuid,
        keywords: searchvalue,
        pagination_value: paginationValue,
        page: pageNo,
      });

      setdata(res?.data[0]?.items);
      // setdata(prevData => prevData.concat(res?.data?.data));
      // setTotalRecords(res?.data?.total);
      // setCurrentRecord(res?.data?.to);
    } catch (error) {
      console.error('Error fetching store listing:', error);
    }
  };

  useEffect(() => {
    handleStoreListing();
    getCurrentLocation();
  }, [isFocused]);

  const toggleFavorite = id => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          is_favourite: item.is_favourite === 0 ? 1 : 0,
        };
      }
      return item;
    });
    const newData = [...updatedData];
    // Update component state or props with the updated data
    setdata(newData); // Assuming you have a setData function to update the state
  };

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreItems
          item={item}
          store_id={store_id}
          heartIcon
          onPress={() => toggleFavorite(item?.id)}
        />
      </>
    );
  };

  return (
    <>
      <View style={[Common.container, styles.storeContainer]}>
        <View style={styles.searchContainer}>
          <RenderImages source={IMAGES.searchicon} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder="Search Item by Name"
            placeholderTextColor={'#99999E'}></TextInput>
        </View>
        <>
          {loading ? (
            <Shimmer />
          ) : (
            <>
              {data?.length === 0 ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <NoFound title={'No items added'} />
                </View>
              ) : (
                <FlatList
                  bounces={false}
                  data={data}
                  keyExtractor={item => item?.id}
                  renderItem={RenderItem}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </>
          )}
        </>
      </View>
      <BottomSheet
        navigation={navigation}
        isVisible={bottomSheetVisible}
        onClose={toggleBottomSheet}
        onRequestClose={toggleBottomSheet}
      />
      <Scanner
        onScan={handleScan}
        isOpen={scannerVisible}
        handleClose={() => setScannerVisible(false)}
      />
      <ConfirmModal
        isOpen={isOpen}
        // loading={loader}
        handleClose={() => setIsOpen(false)}
        title="Permission Denied"
        description="Access was previously denied, Please grant Camera access from the Settings"
        onYesClick={() => goToSettings()}
        onNoClick={() => setIsOpen(false)}
        cancelText="Cancel"
        confirmText="Go to Settings"
      />
    </>
  );
};
export default ViewItems;

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
  favoriteView: {
    width: '99%',
    maxHeight: 100,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 16,
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  EmptyHeart: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  text: {
    color: '#6E6F76',
    fontSize: 13,
    marginHorizontal: 5,
  },
  rightarrow: {
    width: 25,
    height: 25,
    backgroundColor: '#EBE8EC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeart: {
    width: 25,
    height: 25,
  },
});

import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {Typography} from '../../Components/Typography';
import {useAppContext} from '../../Components/AppContext';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import Button from '../../Components/Button';

import Scanner from '../../Components/Scanner';
import useFetch from '../../utils/useFetch';
import RenderStoreItems from '../../Components/RenderStoreItems';
import ConfirmModal from '../../Components/ConfirmModal';
import Toast from 'react-native-toast-message';

const Compare = ({navigation, route}) => {
  const title = route?.params?.title;
  const store = route?.params?.item;

  return (
    <AppBaseComponent
      navigation={navigation}
      title={title}
      backButton
      height={'97%'}
      renderChild={Content({navigation, title, store})}
    />
  );
};

const Content = ({navigation, title, store}) => {
  const {windowWidth, goToSettings} = useAppContext();
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [replaceid, setReplaceId] = useState('');

  const [data, setData] = useState([]);
  const [getItem, {}] = useFetch('get-item-by-barcode', {method: 'POST'});

  const handleGetItems = async code => {
    try {
      const res = await getItem({
        bar_code: code,
        store_id: store?.id,
      });
      const isDuplicate = data?.some(item => item?.id === res?.data?.id);
      if (!isDuplicate) {
        // If not a duplicate, append the new data to the state
        setData(prev => [...prev, res?.data]);
      } else {
        // Handle duplicate item scenario here (optional)
      }
    } catch (error) {}
  };

  const handleEdit = async code => {
    const res = await getItem({
      bar_code: code,
      store_id: store?.id,
    });
    replaceItemById(res?.data);
  };

  const handleScan = data => {
    setScannedData(data);
    if (editmode) {
      handleEdit(data?.data);
    } else {
      handleGetItems(data?.data);
    }
    setScannerVisible(false);
  };

  const deleteItem = idToDelete => {
    setLoader(true);
    // Filter out the item with the specified ID
    const updatedItems = data.filter(item => item.id !== idToDelete);
    // Update the state with the filtered list
    setData(updatedItems);
    setIsOpen(false);
    setLoader(false);
  };

  const replaceItem = id => {
    setReplaceId(id);
    setEditmode(true);
    setScannerVisible(true);
  };

  const replaceItemById = newItem => {
    const itemIndex = data.findIndex(item => item.id === replaceid);
    if (itemIndex !== -1) {
      const updatedItems = [...data];
      updatedItems[itemIndex] = newItem;
      setData(updatedItems);
    }
  };

  const CalculateValue = () => {
    const maxValue = Math.max(
      ...data.map(
        item =>
          (item?.pack_size * item?.quantity * item?.alcohol_percentage) /
          item?.price,
      ),
    );
    data.forEach(item => {
      const result =
        (item?.pack_size * item?.quantity * item?.alcohol_percentage) /
        item?.price;
      item.result = result;
      item.best_choice = result === maxValue;
    });
    return data;
  };
  const CalculatedValue = async () => {
    const result = CalculateValue();
    const newData = [...result]; // Create a copy of the updated array
    setData(newData);
  };

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
    setData(newData); // Assuming you have a setData function to update the state
  };

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreItems
          item={item}
          editIcon
          type={title}
          store_id={store?.id}
          ondeletePress={() => setIsOpen(true)}
          onEditPress={() => {
            replaceItem(item?.id);
          }}
          onPress={() => toggleFavorite(item?.id)}
        />
        <ConfirmModal
          isOpen={isOpen}
          loading={loader}
          handleClose={() => setIsOpen(false)}
          title="Delete"
          description="Are you sure you want to delete this item?"
          onYesClick={() => deleteItem(item?.id)}
          onNoClick={() => setIsOpen(false)}
          cancelText="No"
          confirmText="Yes"
        />
      </>
    );
  };

  const [modal, setModal] = useState(false);
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
          // setIsOpen(true);
          const requestResult = await request(permission);

          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          setScannerVisible(true);
          break;
        case RESULTS.BLOCKED:
          setModal(true);
          break;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <View style={[Common.container, styles.compareContainer]}>
        <View
          style={styles.favoriteView}
          onPress={() => {
            type === 'search'
              ? navigation.navigate('storeItems')
              : toggleBottomSheet();
          }}>
          <View style={{marginHorizontal: 15}}>
            <Typography
              type="h3"
              style={[styles.title, {width: windowWidth - 140}]}>
              {store?.name?.length > 30
                ? `${store?.name?.slice(0, 30)}...`
                : store?.name}
            </Typography>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RenderImages
                source={IMAGES.locationicon}
                style={{width: 15, height: 19}}
              />
              <Typography
                type="h5"
                style={[styles.text, {width: windowWidth - 155}]}>
                {store?.address}
              </Typography>
            </View>
          </View>
        </View>
        <View style={{flex: 1, paddingBottom: 80}}>
          <FlatList
            data={data}
            keyExtractor={item => item?.id}
            renderItem={RenderItem}
            extraData={data}
            ListFooterComponent={
              <>
                {(data?.length <= 3 && title === 'Compare') ||
                (data?.length == 0 && title === 'Calculate') ? (
                  <Pressable
                    style={styles.scanBtn}
                    onPress={() => requestCameraPermission()}>
                    <RenderImages
                      source={IMAGES.scanIcon}
                      style={{width: 24, height: 24, marginHorizontal: 5}}
                    />
                    <Typography type="h4" style={styles.btnText}>
                      Scan Barcode
                    </Typography>
                  </Pressable>
                ) : null}
              </>
            }
          />
        </View>

        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <Button
            title={title}
            onPress={CalculatedValue}
            opacity={data?.length === 0 ? true : false}
          />
        </View>
      </View>
      <Scanner
        onScan={handleScan}
        isOpen={scannerVisible}
        handleClose={() => setScannerVisible(false)}
      />

      <ConfirmModal
        isOpen={modal}
        // loading={loader}
        handleClose={() => setModal(false)}
        title="Permission Denied"
        description="Access was previously denied, Please grant Camera access from the Settings"
        onYesClick={() => goToSettings()}
        onNoClick={() => setModal(false)}
        cancelText="Cancel"
        confirmText="Go to Settings"
      />
    </>
  );
};
export default Compare;

const styles = StyleSheet.create({
  compareContainer: {
    flex: 1,
  },
  favoriteView: {
    width: '99%',
    height: 87,
    backgroundColor: '#EBE8EC',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 12,
    padding: 10,
  },
  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
    lineHeight: 20,
  },
  text: {
    color: '#6E6F76',
    fontSize: 12,
    marginHorizontal: 5,
    lineHeight: 16,
    marginVertical: 10,
  },
  scanBtn: {
    backgroundColor: 'rgba(248, 126, 125, 0.18)',
    borderWidth: 1,
    borderColor: '#F87E7D',
    borderStyle: 'dashed',
    width: '99%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 80,
  },
  btnText: {
    color: '#371841',
    fontWeight: '700',
  },
  storeView: {
    width: '99%',
    height: 104,
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
    paddingVertical: 10,
  },

  calculatestoreView: {
    width: '99%',
    maxHeight: 120,
    flexDirection: 'row',
    paddingHorizontal: 6,
    marginTop: 12,

    paddingVertical: 10,
  },
  storeTitle: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
  },
  topIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    flexDirection: 'row',
  },
  storeText: {
    color: '#6E6F76',
    fontSize: 13,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
  brandname: {
    fontSize: 14,
    color: '#99999E',
    marginRight: 10,
  },
  verifiedText: {
    fontSize: 12,
    color: '#fff',
  },
});

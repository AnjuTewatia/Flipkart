import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from './AppContext';
import {EmptyHeart, FilledHeart, RightArrow} from '../Icons';
import RenderImages from './RenderImages';
import IMAGES from '../utils/Images';
import {Typography} from './Typography';
import RightHeaderButton from './RightHeaderButton';
import useFetch from '../utils/useFetch';
import ConfirmModal from './ConfirmModal';
import Toast from 'react-native-toast-message';
import BottomSheet from './BottomSheet';

const RenderStoreListing = ({
  item,
  type,
  navigation,
  onheartPress,
  deleteIcon,
  ondeletePress,
}) => {
  const {windowWidth} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [addStore, {response, loading, error}] = useFetch('create-store', {
    method: 'POST',
  });

  const [addtoFavorite] = useFetch('add-to-favourite', {
    method: 'POST',
  });

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };
  const latitude = item?.geometry?.location?.lat;
  const longitude = item?.geometry?.location?.lng;

  const handleAddStore = async () => {
    try {
      const res = await addStore({
        name: item?.name,
        address: item?.vicinity,
        google_id: item?.place_id,
        latitude: latitude,
        longitude: longitude,
      });
      if (res?.status === 200) {
        navigation.goBack();
      }
    } catch (error) {
      // setIsOpen(false);
    }
    // setIsOpen(false);
  };

  const handleAddToFavorite = async () => {
    const res = await addtoFavorite({
      store_id: item?.id,
      type: 1,
    });
    console.log('res==>', res);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [error]);

  return (
    <>
      <Pressable
        disabled={type === 'addstore'}
        style={styles.favoriteView}
        onPress={() => {
          type === 'search'
            ? navigation.navigate('storeItems', item)
            : type === 'addstore'
            ? console.log('add store', item)
            : toggleBottomSheet();
        }}>
        {deleteIcon && (
          <Pressable
            style={styles.deleteIcon}
            onPress={() => {
              ondeletePress();
            }}>
            <RenderImages
              source={IMAGES.deleteicon}
              style={{width: 18, height: 18}}
            />
          </Pressable>
        )}
        {type === 'search' && (
          <Pressable style={styles.deleteIcon}>
            <View style={styles.rightarrow}>
              <RightArrow />
            </View>
          </Pressable>
        )}
        {type === 'addstore' && (
          <Pressable style={styles.addicon} onPress={() => setIsOpen(true)}>
            <RightHeaderButton
              icon={null}
              title={'+ Cart'}
              color={'#fff'}
              onPress={() => setIsOpen(true)}
            />
          </Pressable>
        )}
        {/* { && (
          <Pressable
            style={styles.EmptyHeart}
            onPress={() => {
              onheartPress(), handleAddToFavorite();
            }}>
            <View style={styles.emptyHeart}>
              {item?.is_favourite === 0 ? <EmptyHeart /> : <FilledHeart />}
            </View>
          </Pressable>
        )} */}
        {!deleteIcon && type !== 'addstore' ? (
          <Pressable
            style={styles.EmptyHeart}
            onPress={() => {
              onheartPress(), handleAddToFavorite();
            }}>
            <View style={styles.emptyHeart}>
              {item?.is_favourite === 0 ? <EmptyHeart /> : <FilledHeart />}
            </View>
          </Pressable>
        ) : null}
        <RenderImages
          source={item?.image1}
          style={{width: 67, height: 67}}
        />
        <View style={{marginHorizontal: 15}}>
          <Typography
            type="h3"
            numberOfLines={1}
            style={[styles.title, {width: windowWidth - 200}]}>
           {item?.title}
          </Typography>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
    
            <Typography
              type="h5"
              style={[styles.text, {width: windowWidth - 200}]}>
               ₹ {item?.price}
            </Typography>
          </View>
        </View>
      </Pressable>

      <ConfirmModal
        isOpen={isOpen}
        loading={loading}
        handleClose={() => setIsOpen(false)}
        title="Add Store"
        description="Are you sure you want to add this store?"
        onYesClick={() => handleAddStore()}
        onNoClick={() => setIsOpen(false)}
        cancelText="No"
        confirmText="Yes"
      />
      {/* <BottomSheet
        item={item}
        navigation={navigation}
        isVisible={bottomSheetVisible}
        onClose={toggleBottomSheet}
        onRequestClose={toggleBottomSheet}
      /> */}
    </>
  );
};

export default RenderStoreListing;

const styles = StyleSheet.create({
  favoriteView: {
    width: '99%',
    height: 104,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 14,
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
    marginTop: -10,
  },
  text: {
    color: '#6E6F76',
    fontSize: 12,
    marginBottom: 5,
    marginVertical: 8,
    lineHeight: 16,
    marginHorizontal: 6,
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addicon: {
    position: 'absolute',
    top: 10,
    right: 4,
    backgroundColor: '#8C2457',
    margin: 5,
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  EmptyHeart: {
    position: 'absolute',
    bottom: 6,
    right: 6,
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

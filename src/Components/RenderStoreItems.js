import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RenderImages from './RenderImages';
import {Typography} from './Typography';
import IMAGES from '../utils/Images';
import {useAppContext} from './AppContext';
import ConfirmPrice from './ConfirmPriceButton';
import {EmptyHeart} from '../Icons';
import ConfirmModal from './ConfirmModal';
import Shimmer from './Shimmer';

const RenderStoreItems = ({item, store_id, heartIcon}) => {
  const {windowWidth} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  return (
    <>
      <View style={[styles.favoriteView]}>
        <RenderImages
          source={IMAGES.beer}
          style={{
            width: '30%',
            height: '100%',
            position: 'absolute',
            right: 0,
            zindex: 999,
          }}
        />
        <Pressable
          style={styles.deleteIcon}
          onPress={() => !heartIcon && setIsOpen(true)}>
          {heartIcon ? (
            <EmptyHeart />
          ) : (
            <RenderImages
              source={IMAGES.deleteicon}
              style={{width: 18, height: 18}}
            />
          )}
        </Pressable>
        <RenderImages
          source={IMAGES.arrowimg}
          style={{width: 65, minHeight: 65}}
        />
        <View style={{marginHorizontal: 15}}>
          <Typography
            type="h3"
            style={[styles.title, {width: windowWidth - 140}]}>
            {item?.name?.length > 30
              ? `${item?.name?.slice(0, 30)}...`
              : item?.name}
          </Typography>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}>
            <Typography type="h5" style={[styles.text]}>
              {parseFloat(item?.alcohol_percentage)}% alcohol
            </Typography>
            <Typography type="h5" style={[styles.text]}>
              |
            </Typography>
            <Typography type="h5" style={[styles.text]}>
              {parseFloat(item?.quantity)} ml
            </Typography>
            <Typography type="h5" style={[styles.text]}>
              |
            </Typography>
            <Typography type="h5" style={[styles.text]}>
              {item?.pack_size} cans
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
              width: '60%',
              marginHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Typography type="sm" style={[styles.brandname, {}]}>
              {item?.brand?.name}
            </Typography>
            <RenderImages
              source={IMAGES.tagicon}
              style={{width: 19, height: 19}}
            />
            <Typography
              type="h5"
              style={[
                styles.text,
                {
                  width: '50%',
                  fontWeight: '800',
                  color: '#F87E7D',
                  fontSize: 18,
                },
              ]}>
              $ {parseFloat(item?.price.slice(0, 2))}
            </Typography>
          </View>
        </View>
        <View style={{position: 'absolute', right: 0, bottom: 18}}>
          <ConfirmPrice
            title={'Confirm Price'}
            item={item}
            store_id={store_id}
          />
        </View>
        <ConfirmModal
          isOpen={isOpen}
          loading={loader}
          handleClose={() => setIsOpen(false)}
          title="Delete"
          description="Are you sure you want to delete the item?"
          onYesClick={() => removeUser()}
          onNoClick={() => setIsOpen(false)}
          cancelText="No"
          confirmText="Yes"
        />
      </View>
    </>
  );
};

export default RenderStoreItems;

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
    padding: 15,
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  text: {
    color: '#6E6F76',
    fontSize: 14,
    marginHorizontal: 4,
    marginTop: 2,
  },
  brandname: {
    fontSize: 14,
    color: '#99999E',
    marginHorizontal: 5,
  },
});

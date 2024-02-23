import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RenderImages from './RenderImages';
import {Typography} from './Typography';
import IMAGES from '../utils/Images';
import {useAppContext} from './AppContext';
import ConfirmPrice from './ConfirmPriceButton';
import {EmptyHeart} from '../Icons';
import ConfirmModal from './ConfirmModal';

const RenderStoreItems = ({heartIcon}) => {
  const {windowWidth} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  return (
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
        style={{width: '18%', minHeight: '85%'}}
      />
      <View style={{marginHorizontal: 15}}>
        <Typography
          type="h3"
          style={[styles.title, {width: windowWidth - 140}]}>
          Violet Crumb-Ball
        </Typography>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 2,
          }}>
          <Typography type="h5" style={[styles.text]}>
            10% alcohol
          </Typography>
          <Typography type="h5" style={[styles.text]}>
            |
          </Typography>
          <Typography type="h5" style={[styles.text]}>
            200ml
          </Typography>
          <Typography type="h5" style={[styles.text]}>
            |
          </Typography>
          <Typography type="h5" style={[styles.text]}>
            10 cans
          </Typography>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Typography type="sm" style={styles.brandname}>
            Bacardi
          </Typography>
          <RenderImages
            source={IMAGES.tagicon}
            style={{width: 18, height: 18}}
          />
          <Typography
            type="h5"
            style={[
              styles.text,
              {width: windowWidth - 155, fontWeight: '800', color: '#F87E7D'},
            ]}>
            $43
          </Typography>
          <View style={{position: 'absolute', right: 50, bottom: -2}}>
            <ConfirmPrice title={'Confirm Price'} />
          </View>
        </View>
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
  );
};

export default RenderStoreItems;

const styles = StyleSheet.create({
  favoriteView: {
    width: '99%',
    maxHeight: 130,
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
  text: {
    color: '#6E6F76',
    fontSize: 13,
    marginHorizontal: 5,
  },
  brandname: {
    fontSize: 14,
    color: '#99999E',
    marginRight: 10,
  },
});

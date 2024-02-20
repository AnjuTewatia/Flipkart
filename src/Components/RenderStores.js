import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderImages from './RenderImages';
import {Typography} from './Typography';
import IMAGES from '../utils/Images';
import {useAppContext} from './AppContext';

const RenderStores = () => {
  const {windowWidth} = useAppContext();

  return (
    <View style={styles.favoriteView}>
      <Pressable style={styles.deleteIcon}>
        <RenderImages
          source={IMAGES.deleteicon}
          style={{width: 18, height: 18}}
        />
      </Pressable>
      <RenderImages
        source={IMAGES.favoriteimg}
        style={{width: '18%', minHeight: '85%'}}
      />
      <View style={{marginHorizontal: 15}}>
        <Typography
          type="h3"
          style={[styles.title, {width: windowWidth - 140}]}>
          Violet Crumb-Ball
        </Typography>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RenderImages
            source={IMAGES.locationicon}
            style={{width: 16, height: 18}}
          />
          <Typography
            type="h5"
            style={[styles.text, {width: windowWidth - 155}]}>
            Akshya Nagar 1st Block 1st Cross Rammurthy nagar
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default RenderStores;

const styles = StyleSheet.create({
  favoriteView: {
    width: '99%',
    maxHeight: 120,
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
});

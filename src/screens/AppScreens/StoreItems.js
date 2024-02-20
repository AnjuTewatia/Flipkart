import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {Typography} from '../../Components/Typography';
import {useAppContext} from '../../Components/AppContext';
import {EmptyHeart, RightArrow} from '../../Icons';

const StoreItems = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Violet Crumb-Ball'}
      navigation={navigation}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {windowWidth} = useAppContext();
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
        <Pressable style={styles.deleteIcon}>
          <EmptyHeart />
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
          </View>
        </View>
      </View>
    </>
  );
};
export default StoreItems;

const styles = StyleSheet.create({
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

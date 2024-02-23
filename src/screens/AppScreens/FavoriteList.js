import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';

import Common from '../../utils/common';

import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';

import RenderStores from '../../Components/RenderStores';
import RenderStoreItems from '../../Components/RenderStoreItems';
import RightHeaderButton from '../../Components/RightHeaderButton';

const FavouriteList = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Favorites'}
      navigation={navigation}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {windowWidth} = useAppContext();
  return (
    <ScrollView style={[Common.container, [styles.favoriteContainer]]}>
      <RenderStoreItems />
    </ScrollView>
  );
};

export default FavouriteList;

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    marginTop: 10,
  },
  favoriteView: {
    width: '99%',
    maxHeight: 110,
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
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  text: {
    color: '#6E6F76',

    marginHorizontal: 5,
  },
});

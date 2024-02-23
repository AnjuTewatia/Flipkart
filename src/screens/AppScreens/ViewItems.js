import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {Typography} from '../../Components/Typography';
import {useAppContext} from '../../Components/AppContext';
import {EmptyHeart, RightArrow} from '../../Icons';
import BottomSheet from '../../Components/BottomSheet';
import Common from '../../utils/common';
import RightHeaderButton from '../../Components/RightHeaderButton';
import RenderStoreItems from '../../Components/RenderStoreItems';

const ViewItems = ({navigation, route}) => {
  const type = route?.params?.type;
  return (
    <AppBaseComponent
      title={'ViewItems'}
      navigation={navigation}
      backButton
      renderChild={Content({navigation, type})}
      rightButton={
        <RightHeaderButton
          icon={IMAGES.addIcon}
          title="Item"
          onPress={() => navigation.navigate('AddItem')}
        />
      }
    />
  );
};

const Content = ({navigation, type}) => {
  const {windowWidth} = useAppContext();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  return (
    <>
      <View style={[Common.container, styles.storeContainer]}>
        <View style={styles.searchContainer}>
          <RenderImages source={IMAGES.searchicon} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder="Search store by name"
            placeholderTextColor={'#99999E'}></TextInput>
        </View>
        <RenderStoreItems heartIcon />
        <BottomSheet
          navigation={navigation}
          isVisible={bottomSheetVisible}
          onClose={toggleBottomSheet}
          onRequestClose={toggleBottomSheet}
        />
      </View>
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

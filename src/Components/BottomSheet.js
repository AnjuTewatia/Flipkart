import React, {useState} from 'react';
import {View, StyleSheet, Modal, Pressable} from 'react-native';
import {Typography} from './Typography';
import RenderImages from './RenderImages';
import IMAGES from '../utils/Images';
import {useAppContext} from './AppContext';

const BottomSheet = ({item, isVisible, onClose, navigation}) => {
  if (!isVisible) {
    return null;
  }
  const [type, setType] = useState(1);
  const handleOverlayPress = () => {
    onClose();
  };
  const {windowWidth} = useAppContext();

  const handleContentViewPress = event => {
    event.stopPropagation(); // Prevents the press event from propagating to the overlay Pressable
  };

  const handleNavigation = (type, route, title) => {
    setType(type);
    setTimeout(() => {
      onClose();
      navigation.navigate(route, title);
    }, 100);
  };
  return (
    <View style={styles.container}>
      <Modal transparent visible={isVisible} onRequestClose={onClose}>
        <Pressable onPress={handleOverlayPress} style={styles.overlay}>
          <Pressable style={styles.content} onPress={handleContentViewPress}>
            <View
              style={{
                width: 50,
                height: 4,
                borderWidth: 1,
                backgroundColor: '#99999E',
                borderColor: '#99999E',
                borderRadius: 5,
                alignSelf: 'center',
              }}
            />
            <View
              style={styles.favoriteView}
              onPress={() => {
                type === 'search'
                  ? navigation.navigate('storeItems')
                  : toggleBottomSheet();
              }}>
              <RenderImages
                source={IMAGES.favoriteimg}
                style={{width: '18%', minHeight: '85%'}}
              />
              <View style={{marginHorizontal: 15}}>
                <Typography
                  type="h3"
                  style={[styles.title, {width: windowWidth - 220}]}>
                  {item?.name}
                </Typography>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RenderImages
                    source={IMAGES.locationicon}
                    style={{width: 16, height: 18}}
                  />
                  <Typography
                    type="h5"
                    style={[styles.text, {width: windowWidth - 155}]}>
                    {item?.address}
                  </Typography>
                </View>
              </View>
            </View>

            <Pressable
              style={[
                styles.option,
                {backgroundColor: type === 1 ? '#8C2457' : '#E6E6E7'},
              ]}
              onPress={() => handleNavigation(1, 'compare', 'Compare')}>
              <Typography
                type="h4"
                style={[
                  styles.optionText,
                  {color: type === 1 ? '#fff' : '#6E6F76'},
                ]}>
                Compare
              </Typography>
            </Pressable>
            <Pressable
              style={[
                styles.option,
                {backgroundColor: type === 2 ? '#8C2457' : '#E6E6E7'},
              ]}
              onPress={() => handleNavigation(2, 'compare', 'Calculate')}>
              <Typography
                type="h4"
                style={[
                  styles.optionText,
                  {color: type === 2 ? '#fff' : '#6E6F76'},
                ]}>
                Calculate
              </Typography>
            </Pressable>
            <Pressable
              style={[
                styles.option,
                {backgroundColor: type === 3 ? '#8C2457' : '#E6E6E7'},
              ]}
              onPress={() => handleNavigation(3, 'FavouriteList', '')}>
              <Typography
                type="h4"
                style={[
                  styles.optionText,
                  {color: type === 3 ? '#fff' : '#6E6F76'},
                ]}>
                Favorite
              </Typography>
            </Pressable>
            <Pressable
              style={[
                styles.option,
                {backgroundColor: type === 4 ? '#8C2457' : '#E6E6E7'},
              ]}
              onPress={() => handleNavigation(4, 'ViewItems', item)}>
              <Typography
                type="h4"
                style={[
                  styles.optionText,
                  {color: type === 4 ? '#fff' : '#6E6F76'},
                ]}>
                View Items
              </Typography>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  option: {
    marginVertical: 8,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: '600',
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
    marginHorizontal: 5,
    marginVertical: 8,
  },
});

export default BottomSheet;

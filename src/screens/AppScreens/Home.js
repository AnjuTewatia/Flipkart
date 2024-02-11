import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';
import Common from '../../utils/common';
import HomeImages from '../../Components/HomeImages';
import IMAGES from '../../utils/Images';

const Home = ({navigation}) => {
  return (
    <AppBaseComponent title={'Home'} renderChild={Content({navigation})} />
  );
};

const Content = ({navigation}) => {
  return (
    <View style={Common.container}>
      <Typography type="h1" style={styles.welcomeText}>
        Welcome to the{' '}
        <Typography type="h1" style={styles.LogoText}>
          Drink   mate!
        </Typography>
      </Typography>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          alignSelf: 'center',
        }}>
        <HomeImages
          image={IMAGES.storebg}
          title={'Search'}
          instruction={'With this option, you can search for the store name'}
          btnImg={IMAGES.searchicon}
          onPress={() => console.log('search')}
        />
        <HomeImages
          image={IMAGES.searchbg}
          title={'I’m In The Store'}
          instruction={'With this option, you can go to for the store screen'}
          btnImg={IMAGES.storeicon}
          onPress={() => console.log('store')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    marginTop: 12,
    color: '#371841',
    fontWeight: '700',
    marginBottom: 6,
  },
  LogoText: {
    // fontSize: 26,
    color: '#8C2457',
    fontWeight: Platform.OS === 'android' ? '900' : '700',
  },
});

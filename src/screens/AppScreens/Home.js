import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';
import Common from '../../utils/common';
import HomeImages, {BrandImage} from '../../Components/HomeImages';
import IMAGES from '../../utils/Images';

const Home = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Home'}
      renderChild={Content({navigation})}
      topPadding={0}
    />
  );
};

const Content = ({navigation}) => {
  return (
    <ScrollView
      style={[Common.container, styles.container]}
      showsVerticalScrollIndicator={false}>
      <Typography type="h1" style={styles.welcomeText}>
        Welcome to the{' '}
        <Typography type="h1" style={styles.LogoText}>
          Drinkmate!
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
          onPress={() => navigation.navigate('storeListing', {type: 'search'})}
        />
        <HomeImages
          image={IMAGES.searchbg}
          title={'I’m In The Store'}
          instruction={'With this option, you can go to for the store screen'}
          btnImg={IMAGES.storeicon}
          onPress={() => navigation.navigate('storeListing', {type: 'store'})}
        />
        <BrandImage
          image={IMAGES.brandbg}
          title={'Alcohol Brands'}
          instruction={'With this option, you can explore alcohol brand names'}
          btnImg={IMAGES.storeicon}
          onPress={() => navigation.navigate('AlcoholBrands')}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
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

import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  PixelRatio,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS, Height, WIDTH} from '../utils/styleConst';
import {Typography} from '../Components/Typography';
import {BackButton} from '../Icons';
const AuthBaseComponent = ({
  title,
  instruction,
  renderChild,
  topPaddingZero,
  backButton,
  navigation,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgContainer}
      source={require('../assets/authImages/authbg.png')}>
      <StatusBar
        animated
        translucent={false}
        // hidden
        barStyle={'default'}></StatusBar>
      <SafeAreaView style={[styles.safeAreaView]}>
        {backButton && (
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <BackButton />
          </Pressable>
        )}

        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoView}>
            <Image
              style={styles.logoimg}
              source={require('../assets/authImages/Logo.png')}
            />
            <Typography type="h1" style={styles.logoText}>
              DrinkMate
            </Typography>
          </View>
          <View style={styles.formView}>
            <Typography type="h2" style={styles.titleText}>
              {title}
            </Typography>
            <Typography type="sm" style={styles.instructiontext}>
              {instruction}
            </Typography>
          </View>
          <View style={[styles.content, {paddingTop: topPaddingZero ? 0 : 0}]}>
            {renderChild}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flexGrow: 1,
    width: '100%',
    height: Height,
    paddingTop: 0,
    // position: 'relative',
  },
  safeAreaView: {},
  logoView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
  },
  logoimg: {
    width: 47,
    height: 50,
    margin: 5,
  },
  logoText: {
    fontSize: 36,
    color: COLORS.logoColor,
    fontWeight: '800',
    margin: 5,
  },
  formView: {
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: '700',
    margin: 5,
  },
  instructiontext: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '400',
    margin: 5,
    color: '#6E6F76',
    width: '90%',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '90%',
    width: WIDTH,
    paddingHorizontal: 18,
    marginVertical: 10,
    paddingBottom: 5,
  },
  backButton: {
    top: 10,
    left: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AuthBaseComponent;

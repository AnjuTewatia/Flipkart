import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackButton} from '../Icons';
import {COLORS} from '../utils/styleConst';
import {Typography} from '../Components/Typography';

const AuthBaseComponent = ({
  title,
  instruction,
  renderChild,
  backButton,
  navigation,
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgContainer}
      source={require('../assets/authImages/authbg.png')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          extraHeight={180}
          keyboardShouldPersistTaps="handled">
          {backButton && (
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackButton />
            </Pressable>
          )}
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
            <Typography type="sm" style={styles.instructionText}>
              {instruction}
            </Typography>
          </View>
          <View style={styles.content}>{renderChild}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    position: 'relative',
  },
  safeAreaView: {
    flex: 1,
  },
  logoView: {
    justifyContent: 'center',
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
  instructionText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '400',
    margin: 5,
    color: '#6E6F76',
    width: '90%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    marginVertical: 10,
    paddingBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 15,
    zIndex: 999,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthBaseComponent;

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
import {COLORS, Height, WIDTH} from '../utils/styleConst';
import {Typography} from '../Components/Typography';

const AuthBaseComponent = ({
  title,
  instruction,
  renderChild,
  backButton,
  navigation,
}) => {
  return (
    <>
      <Image
        style={{
          position: 'absolute',
          width: WIDTH,
          height: Height,
        }}
        resizeMode="cover"
        source={require('../assets/authImages/authbg.png')}
      />
      <View style={styles.bgContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          extraHeight={180}
          keyboardShouldPersistTaps="handled">
          <SafeAreaView style={styles.safeAreaView}>
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
          </SafeAreaView>
        </KeyboardAwareScrollView>
        {/* </ImageBackground> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  safeAreaView: {
    flex: 1,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
    marginTop: 60,
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
    top: StatusBar.currentHeight + 15,
    left: 10,
    zIndex: 999,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthBaseComponent;

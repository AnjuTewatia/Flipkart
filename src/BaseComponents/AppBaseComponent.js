import {
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, Height, WIDTH} from '../utils/styleConst';
import {Typography} from '../Components/Typography';
import {WhiteBackButton} from '../Icons';
import Common from '../utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {log} from 'react-native-reanimated';

const AppBaseComponent = ({
  title,
  renderChild,
  backButton,
  navigation,
  rightButton,
  height,
  topPadding,
  paddingHorizontal,
}) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={[
            styles.statusBar,
            {height: statusBarHeight, backgroundColor: '#371841'},
          ]}
        />
      )}
      <StatusBar
        backgroundColor={'#371841'}
        animated
        barStyle={'light-content'}
      />
      <View style={Common.container}>
        <View style={[styles.safeAreaView]}>
          <View style={styles.header}>
            {backButton && (
              <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <WhiteBackButton />
              </Pressable>
            )}
            <Typography type="h2" style={styles.titleText}>
              {title}
            </Typography>
            {rightButton && (
              <View style={styles.rightButton}>{rightButton}</View>
            )}
          </View>
          <ScrollView
            bounces
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.content,
              {
                paddingTop: topPadding ?? 10,
                height: height ? height : '95%',
                paddingHorizontal: paddingHorizontal ?? 10,
              },
            ]}>
            {renderChild}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flexGrow: 1,
    width: '100%',
    height: Height,
    paddingTop: 0,
    position: 'relative',
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
  header: {
    paddingHorizontal: 10,
    backgroundColor: '#371841',
    height: 50,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '700',
    margin: 5,
    textAlign: 'center',
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
    alignItems: 'flex-start',
    width: WIDTH,
    // : 10,
    // paddingBottom: 5,
    // backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    marginHorizontal: 10,
    width: 30,
    zIndex: 999,
  },
  rightButton: {
    position: 'absolute',
    marginHorizontal: 10,
    right: 0,
    // zIndex: -999,
  },
});
export default AppBaseComponent;

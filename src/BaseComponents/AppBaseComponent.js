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
import {BackButton} from '../Icons';
import Common from '../utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AppBaseComponent = ({
  title,
  renderChild,
  topPaddingZero,
  backButton,
  navigation,
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
        barStyle={'light-content'}></StatusBar>
      <View style={Common.container}>
        <View style={[styles.safeAreaView]}>
          {backButton && (
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackButton />
            </Pressable>
          )}

          <View style={styles.header}>
            <Typography type="h2" style={styles.titleText}>
              {title}
            </Typography>
          </View>
          <View bounces showsVerticalScrollIndicator={false}>
            <View
              style={[styles.content, {paddingTop: topPaddingZero ? 0 : 0}]}>
              {renderChild}
            </View>
          </View>
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
    height: 44,
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
    height: Height,
    width: WIDTH,
    paddingHorizontal: 18,
    paddingBottom: 5,
    backgroundColor: '#F5F5F5',
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
export default AppBaseComponent;

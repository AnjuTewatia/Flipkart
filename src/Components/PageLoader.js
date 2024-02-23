import {BlurView} from 'expo-blur';
import React, {useEffect} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/styleConst';
import {Typography} from './Typography';

const PageLoader = ({bgColor}) => {
  const styles = StyleSheet.create({
    modalLayout: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor ?? COLORS.white,
    },
  });

  return (
    <View style={styles.modalLayout}>
      <Typography type="h1" white>
        <ActivityIndicator size="large" />
      </Typography>
    </View>
  );
};

export default PageLoader;

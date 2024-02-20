import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from './AppContext';
const ConfirmPrice = ({title, onPress, style}) => {
  const {windowWidth} = useAppContext();
  return (
    <TouchableHighlight
      style={[styles.linearGradient, style]}
      onPress={onPress}>
      <LinearGradient
        colors={['#371841', '#8C2457']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient, style, {width: windowWidth - 280}]}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
};

export default ConfirmPrice;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 17,
    // padding: 5,
    height: 28,
    marginTop: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    minWidth: 81,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'DM Sans',
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

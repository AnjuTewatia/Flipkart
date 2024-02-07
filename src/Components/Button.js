import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Button = ({title, onPress}) => {
  return (
    <TouchableHighlight style={styles.linearGradient} onPress={onPress}>
      <LinearGradient
        colors={['#371841', '#8C2457']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  linearGradient: {
    marginVertical: 20,
    borderRadius: 7,
    height: 48,
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'DM Sans',
    color: '#ffffff',
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
});

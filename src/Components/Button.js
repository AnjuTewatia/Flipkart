import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Button = ({title, onPress, loading, style}) => {
  const handlePress = () => {
    if (!loading) {
      onPress();
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableHighlight
      disabled={loading}
      style={[styles.linearGradient, style]}
      onPress={handlePress}>
      <LinearGradient
        colors={['#371841', '#8C2457']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient, style]}>
        <Text style={styles.buttonText}>{title}</Text>
        {loading && <ActivityIndicator color={'#fff'} />}
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
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'DM Sans',
    color: '#ffffff',
    fontWeight: '800',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
});

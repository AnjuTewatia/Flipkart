import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatNumberWithLeadingZero = number => {
  if (number < 10) {
    return '0' + number;
  } else {
    return number.toString();
  }
};
export const saveLocalLoginDetail = token => {
  AsyncStorage.setItem('login_user', JSON.stringify({token: token}));
};

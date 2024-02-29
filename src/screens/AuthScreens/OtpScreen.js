import {StyleSheet, Text, View} from 'react-native';
import React, {useState, version} from 'react';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import Common from '../../utils/common';
import OtpCommonPage from '../../Components/OtpCommonPage';
import Button from '../../Components/Button';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';
import {saveLocalLoginDetail} from '../../utils/functions';
import {useAppContext} from '../../Components/AppContext';

const OtpScreen = ({navigation, route}) => {
  const data = route?.params;
  return (
    <AuthBaseComponent
      title={'OTP Verification'}
      instruction={`Please enter one time password (OTP) that is sent to ${data?.email}`}
      navigation={navigation}
      backButton
      renderChild={Content({navigation, data})}
    />
  );
};

const Content = ({navigation, data}) => {
  const [value, setValue] = useState('');
  const [optTimer, setOptTimer] = useState(59);
  const {setUserData} = useAppContext();
  const handleSubmit = async () => {
    if (value.length > 3) {
      handleVerifyOtp(value);
    } else {
      console.log('error');
    }
  };

  const [verfiyOtp, {response: res, loading: loader, error: err}] = useFetch(
    'verify-otp',
    {
      method: 'POST',
    },
  );

  const handleVerifyOtp = async value => {
    const res = await verfiyOtp({
      uuid: data?.uuid,
      otp: value,
    });
    const resData = res?.data;
    if (res) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      if (data?.type === 'forgot') {
        navigation.navigate('resetPassword', {uuid: data?.uuid});
      } else {
        setUserData(JSON.stringify({token: resData?.token}));
        saveLocalLoginDetail(resData?.token);
      }
    }
  };

  const [resendOtp, {response, loading, error}] = useFetch('resend-otp', {
    method: 'POST',
  });

  const handleResend = async () => {
    setOptTimer(59);

    const res = await resendOtp({uuid: data?.uuid});
    if (res) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
    }
  };
  return (
    <View style={Common.container}>
      <OtpCommonPage
        value={value}
        setValue={setValue}
        setOptTimer={setOptTimer}
        optTimer={optTimer}
        email={data?.email}
        resendOtp={handleResend}
      />
      <Button title={'Submit'} onPress={handleSubmit} loading={loader} />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});

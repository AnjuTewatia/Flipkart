import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import Common from '../../utils/common';
import OtpCommonPage from '../../Components/OtpCommonPage';
import Button from '../../Components/Button';

const OtpScreen = ({navigation}) => {
  return (
    <AuthBaseComponent
      title={'OTP Verification'}
      instruction={
        'Please enter one time password (OTP) that is sent to info08@gmail.com'
      }
      navigation={navigation}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const [value, setValue] = useState('');
  const [optTimer, setOptTimer] = useState(59);
  const handleResend = async () => {
    setOptTimer(59);
  };

  const handleSubmit = async () => {
    if (value.length > 3) {
      console.log('hfhfh');
    } else {
      console.log('error');
    }
  };
  return (
    <View style={Common.container}>
      <OtpCommonPage
        value={value}
        setValue={setValue}
        setOptTimer={setOptTimer}
        optTimer={optTimer}
        // handleSubmit={handleSubmit}
        // email={email}
        // loading={loading}
        resendOtp={handleResend}
      />
      <Button title={'Submit'} onPress={handleSubmit} />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});

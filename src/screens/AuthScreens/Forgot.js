import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import Common from '../../utils/common';
import InputField from '../../Components/InputField';
import {useFormik} from 'formik';
import Button from '../../Components/Button';
import {forgotEmailScheme} from '../../utils/validations';

const Forgot = ({navigation}) => {
  return (
    <AuthBaseComponent
      title={'Forgot Password'}
      instruction={
        'Please enter your email address and we will send you a one-time password(OTP).'
      }
      navigation={navigation}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotEmailScheme,
    onSubmit: values => {
      navigation.navigate('otpScreen', {email: values?.email});
    },
  });
  return (
    <View style={Common.container}>
      <InputField
        formik={formik}
        type="email"
        name="email"
        label={'Email Address'}
        placeholder="Enter Email Address"
      />
      <Button title="Send" onPress={() => formik.handleSubmit()} />
    </View>
  );
};
export default Forgot;

const styles = StyleSheet.create({
  sendButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
});
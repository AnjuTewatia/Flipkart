import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import Common from '../../utils/common';
import InputField from '../../Components/InputField';
import {useFormik} from 'formik';
import Button from '../../Components/Button';
import {forgotEmailScheme} from '../../utils/validations';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';

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
      handleForgotPassword(values);
    },
  });
  const [forgotPassword, {response, loading, error}] = useFetch(
    'forgot-password',
    {method: 'POST'},
  );
  const handleForgotPassword = async values => {
    const res = await forgotPassword(values);
    const resData = res?.data;
    if (res) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      navigation.navigate('otpScreen', {
        email: resData?.email,
        uuid: resData?.uuid,
        type: 'forgot',
      });
    }
  };
  return (
    <View style={[Common.container, styles.container]}>
      <InputField
        formik={formik}
        type="email"
        name="email"
        label={'Email Address'}
        placeholder="Enter Email Address"
      />
      <Button
        title="Send"
        onPress={() => formik.handleSubmit()}
        loading={loading}
      />
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
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

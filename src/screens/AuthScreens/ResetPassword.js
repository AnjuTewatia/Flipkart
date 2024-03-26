import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Common from '../../utils/common';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import {useFormik} from 'formik';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import {resetPasswordScheme} from '../../utils/validations';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';
import {CommonActions} from '@react-navigation/native';

const ResetPassword = ({navigation, route}) => {
  const data = route?.params;
  return (
    <AuthBaseComponent
      title={'Reset Password '}
      instruction={'Please reset your password by entering a new password.'}
      navigation={navigation}
      renderChild={Content({navigation, data})}
    />
  );
};

const Content = ({navigation, data}) => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordScheme,

    onSubmit: values => {
      handleResetPassword(values);
    },
  });

  const [resetPassword, {response, loading, error}] = useFetch(
    'reset-password',
    {method: 'POST'},
  );

  const handleResetPassword = async values => {
    const res = await resetPassword({
      uuid: data?.uuid,
      ...values,
    });
    if (res) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Reset to the initial route
          routes: [{name: 'login'}], // Replace the navigation stack with the initial route
        }),
      );
    }
  };
  return (
    <View style={Common.container}>
      <InputField
        formik={formik}
        type="password"
        name="password"
        label={'New Password'}
        placeholder="Enter New Password"
      />
      <InputField
        formik={formik}
        type="password"
        name="confirmPassword"
        label={'Confirm Password'}
        placeholder="Enter Confirm Password"
      />
      <Button
        title="Submit"
        onPress={() => formik.handleSubmit()}
        loading={loading}
      />
    </View>
  );
};
export default ResetPassword;

const styles = StyleSheet.create({
  submitButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
});

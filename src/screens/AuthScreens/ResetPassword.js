import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Common from '../../utils/common';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import {useFormik} from 'formik';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import {resetPasswordScheme} from '../../utils/validations';

const ResetPassword = () => {
  return (
    <AuthBaseComponent
      title={'Reset Password '}
      instruction={'Please reset your password by entering a new password.'}
      navigation={navigation}
      renderChild={Content({})}
    />
  );
};

const Content = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordScheme,

    onSubmit: values => {
      console.log(values);
    },
  });
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
      <Button title="Submit" onPress={() => formik.handleSubmit()} />
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

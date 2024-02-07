import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Common from '../../utils/common';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import {useFormik} from 'formik';
import {signUpValidationScheme} from '../../utils/validations';
import {Typography} from '../../Components/Typography';

const SignUp = ({navigation}) => {
  return (
    <AuthBaseComponent
      title={'Sign Up'}
      instruction={'Please enter the below details to create an account.'}
      navigation={navigation}
      renderChild={Content({navigation})}
    />
  );
};
const Content = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpValidationScheme,
    onSubmit: values => {
      navigation.navigate('otpScreen', {email: values?.email});
    },
  });
  return (
    <View style={Common.container}>
      <InputField
        formik={formik}
        maxLength={20}
        type="name"
        name="name"
        label={'First Name'}
        placeholder="Enter Name"
      />
      <InputField
        formik={formik}
        maxLength={20}
        type="surname"
        name="surname"
        label={'Last name'}
        placeholder="Enter Last Name"
      />
      <InputField
        formik={formik}
        type="email"
        name="email"
        label={'Email Address'}
        placeholder="Enter Email Address"
      />
      <InputField
        formik={formik}
        type="password"
        name="password"
        label={'Password'}
        placeholder="Enter Password"
      />
      <InputField
        formik={formik}
        type="password"
        name="confirmPassword"
        label={'Confirm Password'}
        placeholder="Enter Confirm Password"
      />
      <Button title="Sign Up" onPress={() => formik.handleSubmit()} />
      <Pressable
        style={[styles.login, {width: '80%'}]}
        onPress={() => navigation.navigate('login')}>
        <Typography type="xs" style={[styles.login]}>
          Already have an account?{' '}
          <Typography style={{color: '#F87E7D', fontWeight: '700'}}>
            Log In
          </Typography>
        </Typography>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  login: {
    textAlign: 'center',
    color: '#99999E',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
});

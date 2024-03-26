import { Platform, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import Common from '../../utils/common';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import { useFormik } from 'formik';
import { signUpValidationScheme } from '../../utils/validations';
import { Typography } from '../../Components/Typography';
import useFetch from '../../utils/useFetch';
import { useAppContext } from '../../Components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const SignUp = ({ navigation }) => {
  return (
    <AuthBaseComponent
      title={'Sign Up'}
      instruction={'Please enter the below details to create an account.'}
      navigation={navigation}
      renderChild={Content({ navigation })}
    />
  );
};
const Content = ({ navigation }) => {
  const { device_id, fcmToken,setUserData,setUserProfile } = useAppContext();

  const [registerUser, { response, loading, error }] = useFetch('user/register', {
    method: 'POST',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpValidationScheme,
    onSubmit: values => {
      // console.log(values);
      handleRegister(values);
    },
  });

  const handleRegister = async values => {
    const payload = {
      ...values,
      role: 'user'
    };
    try {
      const res = await registerUser(payload);
// console.log('res ==>', res)
// console.log('res data==>', res?.data)
      if (res) {
        Toast.show({
          type: 'success',
          text1: res?.msg,
        });
        setUserData(res?.token)
        setUserProfile(res?.user);
        AsyncStorage.setItem('login_user', JSON.stringify(res?.token));
      
        AsyncStorage.setItem('userProfile', JSON.stringify(res?.user));
      }
      else{
        Toast.show({
          type: 'error',
          text1: res?.msg,
        });
      }
    } catch (error) {
      // console.log('catch', error);
    }
  };

  return (
    <View>
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
        type="email"
        name="email"
        label={'Email Address'}
        placeholder="Enter Email Address"
      />
      <InputField
        formik={formik}
        maxLength={10}
        name="phoneNumber"
        label={'Phone Number'}
        placeholder="Enter Phone Number"
        keyboardType='decimal-pad'
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
      <Button
        title="Sign Up"
        loading={loading}
        onPress={() => formik.handleSubmit()}
      />
      <Pressable
        style={[styles.login, { width: '80%', marginBottom: 20 }]}
        onPress={() => navigation.navigate('login')}>
        <Typography type="xs" style={[styles.login]}>
          Already have an account?{' '}
          <Typography style={{ color: '#F87E7D', fontWeight: '700' }}>
            Log In
          </Typography>
        </Typography>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    textAlign: 'center',
    color: '#99999E',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
});

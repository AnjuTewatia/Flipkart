import { StyleSheet, View, Image, Pressable, Platform } from 'react-native';
import React, { useEffect } from 'react';
import AuthBaseComponent from '../../BaseComponents/AuthBaseComponent';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import { Typography } from '../../Components/Typography';
import { useFormik } from 'formik';
import { loginValidationScheme } from '../../utils/validations';
import IMAGES from '../../utils/Images';
import RenderImages from '../../Components/RenderImages';
import Common from '../../utils/common';
import { useAppContext } from '../../Components/AppContext';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';
import { saveLocalLoginDetail } from '../../utils/functions';
import { useIsFocused } from '@react-navigation/native';
import Googlelogin from '../../utils/Googlelogin';
import { appleLogin } from '../../utils/AppleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  return (
    <AuthBaseComponent
      title="Log In"
      instruction={'Please fill below details to continue.'}
      navigation={navigation}
      renderChild={Content({ navigation })}
    />
  );
};
const Content = ({ navigation }) => {
  const { setUserData, device_id, fcmToken, getFcmToken,setUserProfile } = useAppContext();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationScheme,
    onSubmit: values => {
      handleloginUser(values);
    },
  });

  const [loginuser, { response, loading, error }] = useFetch('user/login', {
    method: 'POST',
  });
  const isfocused = useIsFocused();

  const handleloginUser = async values => {
    const payload = {
      ...values,
      role: 'user'
    };
    const res = await loginuser(payload);

    if (res) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      setUserData(res?.token);
      setUserProfile(res?.user);
      AsyncStorage.setItem('login_user', JSON.stringify(res?.token));
 
      AsyncStorage.setItem('userProfile', JSON.stringify(res?.user));
    } else {
      Toast.show({
        type: 'error',
        text1: res?.message,
      });
      
    }
  };
  useEffect(() => {
    getFcmToken();
    formik.resetForm();
  }, [isfocused]);
  return (
    <View style={Common.container}>
      <InputField
        formik={formik}
        type="email"
        name="email"
        label={'Email Address'}
        placeholder="Enter Email Address"
      />
      <InputField
        formik={formik}
        label={'Password'}
        type="password"
        name="password"
        placeholder="Enter Password"
      />
      {/* <Pressable
        style={[styles.forgotText, { width: '50%' }]}
        onPress={() => navigation.navigate('forgot')}>
        <Typography type="xs" style={styles.forgotText}>
          Forgot Password
        </Typography>
      </Pressable> */}
      <Button
        title="Log In"
        onPress={() => formik.handleSubmit()}
        loading={loading}
      />

      <Pressable
        style={[styles.Signup, { width: '60%' }]}
        onPress={() => navigation.navigate('signUp')}>
        <Typography type="xs" style={[styles.Signup]}>
          New User ?{' '}
          <Typography style={{ color: '#F87E7D', fontWeight: '700' }}>
            Create Account
          </Typography>
        </Typography>
      </Pressable>

      <View style={styles.orSection}>
        <View style={styles.dashes} />
        <Typography type="xs" style={styles.orText}>
          or
        </Typography>
        <View style={styles.dashes} />
      </View>
      <View style={styles.socialLogin}>
        <Pressable style={styles.iconWrapper} onPress={Googlelogin}>
          <RenderImages style={styles.logoImg} source={IMAGES.googleLogo} />
        </Pressable>
        <Pressable style={styles.iconWrapper}>
          <RenderImages style={styles.logoImg} source={IMAGES.facebookLogo} />
        </Pressable>
        {Platform.OS === 'ios' && (
          <Pressable style={styles.iconWrapper} onPress={appleLogin}>
            <RenderImages style={styles.logoImg} source={IMAGES.applelogo} />
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  forgotText: {
    textAlign: 'right',
    color: '#F87E7D',
    fontSize: 14,
    right: 6,
    alignSelf: 'flex-end',
    marginVertical: 5,
    fontWeight: '700',
  },
  Signup: {
    textAlign: 'center',
    color: '#99999E',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  orSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dashes: {
    borderWidth: 0.5,
    width: '40%',
    marginHorizontal: 5,
    borderStyle: 'dashed',
    borderColor: '#8B7991',
  },
  orText: {
    color: '#8B7991',
    fontSize: 14,
    fontWeight: '400',
  },
  socialLogin: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconWrapper: {
    height: 45,
    width: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 45,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowColor: '#CFAFF3',
    shadowRadius: 4,
    elevation: 4, // For Android
  },
  logoImg: {
    height: 23,
    width: 23,
  },
});

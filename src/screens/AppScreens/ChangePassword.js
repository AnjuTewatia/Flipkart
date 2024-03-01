import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {Typography} from '../../Components/Typography';
import {COLORS} from '../../utils/styleConst';
import InputField from '../../Components/InputField';
import {useFormik} from 'formik';
import {changePasswordScheme} from '../../utils/validations';
import Button from '../../Components/Button';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';

const ChangePassword = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Change Password'}
      backButton
      height={'97%'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const [changePassword, {loading}] = useFetch('change-password', {
    method: 'POST',
  });

  const handleChangePassword = async values => {
    const res = await changePassword({...values});
    if (res?.status === 200) {
      navigation.goBack();
    }
  };
  const formik = useFormik({
    initialValues: {
      current_password: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordScheme,
    onSubmit: values => {
      handleChangePassword(values);
    },
  });

  return (
    <>
      <View style={Common.container}>
        <InputField
          formik={formik}
          style={Common.field}
          label={'Old Password'}
          type="password"
          name="current_password"
          placeholder="Enter Old Password"
        />
        <InputField
          formik={formik}
          style={Common.field}
          label={'New Password'}
          type="password"
          name="password"
          placeholder="Enter New Password"
        />
        <InputField
          formik={formik}
          style={Common.field}
          label={'Confirm Password'}
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
        />
        <View style={{position: 'absolute', bottom: 0}}>
          <Button
            title={'Change'}
            onPress={() => formik.handleSubmit()}
            loading={loading}
          />
        </View>
      </View>
    </>
  );
};
export default ChangePassword;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    minHeight: 60,
    width: '98%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#371841',
    fontWeight: '700',
    fontSize: 18,
    textAlignVertical: 'center',
  },
});

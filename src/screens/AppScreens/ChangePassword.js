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

const ChangePassword = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Change Password'}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordScheme,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <>
      <View style={Common.container}>
        <InputField
          formik={formik}
          label={'Old Password'}
          type="password"
          name="oldPassword"
          placeholder="Enter Old Password"
        />
        <InputField
          formik={formik}
          label={'New Password'}
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
        />
        <InputField
          formik={formik}
          label={'Confirm Password'}
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
        />
        <Button title={'Change'} onPress={() => formik.handleSubmit()} />
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

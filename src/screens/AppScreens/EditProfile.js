import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {Typography} from '../../Components/Typography';
import {COLORS} from '../../utils/styleConst';
import InputField from '../../Components/InputField';
import {useFormik} from 'formik';
import {editProfileScheme} from '../../utils/validations';
import Button from '../../Components/Button';

const EditProfile = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Edit Profile'}
      backButton
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
    },
    validationSchema: editProfileScheme,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <>
      <View style={Common.container}>
        <InputField
          formik={formik}
          label={'Name'}
          name="name"
          placeholder="Enter  Name"
        />
        <InputField
          formik={formik}
          label={'Last Name'}
          name="surname"
          placeholder="Enter Last Name"
        />
        <InputField
          formik={formik}
          label={'Email Address'}
          type="email"
          name="email"
          placeholder="Enter Email Address"
        />
        <Button title={'Save'} onPress={() => formik.handleSubmit()} />
      </View>
    </>
  );
};
export default EditProfile;

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

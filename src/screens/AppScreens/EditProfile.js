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
import useFetch from '../../utils/useFetch';
import {useAppContext} from '../../Components/AppContext';
import Toast from 'react-native-toast-message';

const EditProfile = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Edit Profile'}
      backButton
      height={'97%'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {userProfile, setUserProfile} = useAppContext();
  const {first_name, last_name, email, points} = userProfile;
  const [getProfile, {}] = useFetch('profile', {mehtod: 'GET'});

  const [editprofile, {response, loading, error}] = useFetch('edit-profile', {
    method: 'POST',
  });
  const handleEditProfile = async values => {
    const res = await editprofile({...values});
    if (res?.status === 200) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      handlegetProfile();
    }
  };

  const handlegetProfile = async () => {
    const res = await getProfile();
    if (res?.status === 200) {
      setUserProfile(res?.data);
      navigation.goBack();
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: first_name ?? '',
      last_name: last_name ?? '',
      email: email ?? '',
    },
    validationSchema: editProfileScheme,
    onSubmit: values => {
      handleEditProfile(values);
    },
  });

  return (
    <>
      <View style={Common.container}>
        <InputField
          formik={formik}
          label={'Name'}
          name="first_name"
          placeholder="Enter  Name"
        />
        <InputField
          formik={formik}
          label={'Last Name'}
          name="last_name"
          placeholder="Enter Last Name"
        />
        {/* <InputField
          formik={formik}
          label={'Email Address'}
          type="email"
          name="email"
          placeholder="Enter Email Address"
        /> */}
        <View style={{position: 'absolute', bottom: 0}}>
          <Button
            title={'Save'}
            onPress={() => formik.handleSubmit()}
            loading={loading}
          />
        </View>
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

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {useFormik} from 'formik';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import useFetch from '../../utils/useFetch';
import {addBrandValidation} from '../../utils/validations';
import Toast from 'react-native-toast-message';
import {log} from 'react-native-reanimated';

const AddBrand = ({navigation, route}) => {
  return (
    <AppBaseComponent
      backButton
      title={'Add Brand'}
      navigation={navigation}
      height={'97%'}
      renderChild={Content({navigation, route})}
    />
  );
};

const Content = ({navigation, route}) => {
  const [data, setdata] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [getCategory, {}] = useFetch('get-alcohol-category', {method: 'GET'});

  const editData = route?.params.data;
  const type = route?.params?.type;

  const [addBrand, {loading}] = useFetch('add-alcohol-brand', {
    method: 'POST',
  });

  const [editBrand, {response: res, loading: loader, error: err}] = useFetch(
    'update-alcohol-brand',
    {
      method: 'POST',
    },
  );
  const formik = useFormik({
    initialValues: {
      name: editData?.name ?? '',
      category: editData?.alcohol_category?.name ?? '',
    },
    validationSchema: addBrandValidation,
    onSubmit: values => {
      if (type === 'add') {
        handleBrand(values);
      } else if (type === 'edit') {
        handleeditBrand(values);
      }
    },
  });

  const handleGetCategory = async () => {
    const res = await getCategory();
    if (res?.status === 200) {
      setdata(res?.data?.alcohol_categories);
    }
  };

  const handleBrand = async values => {
    const res = await addBrand({
      ...values,
      alcohol_category_id: categoryId,
    });
    if (res.status == 200) {
      navigation.goBack();
    }
  };

  const handleeditBrand = async values => {
    const res = await editBrand({
      ...values,
      id: editData?.id,
      alcohol_category_id: categoryId ?? editData?.alcohol_category?.id,
    });
    if (res.status == 200) {
      navigation.goBack();
    }
  };
  useEffect(() => {
    handleGetCategory();
  }, []);
  return (
    <>
      <View style={[Common.container, styles.container]}>
        <InputField
          maxLength={50}
          formik={formik}
          bgcolor={'#fff'}
          name="name"
          label={'Alcohol Brand Name'}
          placeholder="Enter Alcohol Brand Name"
        />
        <InputField
          formik={formik}
          bgcolor={'#fff'}
          name="category"
          dropdown={true}
          label={'Category'}
          setCategoryId={setCategoryId}
          options={data}
          placeholder="Select Category"
        />
        <View style={{position: 'absolute', bottom: 0}}>
          <Button
            title={'Submit'}
            onPress={() => formik.handleSubmit()}
            loading={loading || loader}
          />
        </View>
      </View>
    </>
  );
};

export default AddBrand;

const styles = StyleSheet.create({});

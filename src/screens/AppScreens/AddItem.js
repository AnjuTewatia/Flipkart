import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useFormik} from 'formik';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addItemValidation} from '../../utils/validations';
import useFetch from '../../utils/useFetch';
import {Typography} from '../../Components/Typography';
import Toast from 'react-native-toast-message';

const AddItem = ({navigation, route}) => {
  const qrcode = route?.params?.data;
  const store_id = route?.params?.id;

  return (
    <AppBaseComponent
      backButton
      title={'Add Item'}
      height={'97%'}
      navigation={navigation}
      renderChild={Content({navigation, qrcode, store_id})}
    />
  );
};
const Content = ({navigation, qrcode, store_id}) => {
  const [data, setData] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      brandName: '',
      alcohol_percentage: '',
      quantity: '',
      pack_size: '',
      price: '',
    },
    validationSchema: addItemValidation,
    onSubmit: values => {
      handleAddItem(values);
    },
  });

  const [getBrands] = useFetch('all-alcohol-brands', {method: 'GET'});

  const [addItems, {response, loading, error}] = useFetch('create-item', {
    method: 'POST',
  });

  const handleAddItem = async values => {
    const res = await addItems({
      ...values,
      store_id: store_id,
      bar_code: qrcode,
      alcohol_brand_id: brandId,
    });
    if (res?.status === 200) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      navigation.goBack();
    }
  };
  const handleGetBrands = async () => {
    const res = await getBrands();
    setData(res?.data);
  };

  useEffect(() => {
    handleGetBrands();
  }, []);
  return (
    <>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        extraHeight={180}
        keyboardShouldPersistTaps="handled"
        style={[Common?.container, styles.container]}>
        <View>
          <View style={styles.barCode}>
            <RenderImages
              source={IMAGES.barCode}
              style={{width: '100%', height: 75, alignSelf: 'center'}}
            />
            <Typography style={styles.qrtext}>{qrcode}</Typography>
          </View>
          <View style={{marginVertical: 6}} />

          <InputField
            formik={formik}
            bgcolor={'#fff'}
            name="name"
            label={'Item Name'}
            placeholder="Enter Item Name"
          />
          <InputField
            formik={formik}
            dropdown={true}
            options={data}
            setCategoryId={setBrandId}
            bgcolor={'#fff'}
            name="brandName"
            label={'Alcohol Brand Name'}
            placeholder="Select Alcoho Brand Name"
          />
          <InputField
            formik={formik}
            maxLength={3}
            bgcolor={'#fff'}
            keyboardType={'number-pad'}
            name="alcohol_percentage"
            label={'Alcohol %'}
            placeholder="Enter Alcoho %"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            maxLength={4}
            keyboardType={'number-pad'}
            name="quantity"
            label={'ml / Can'}
            placeholder="Enter ml / Can"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            maxLength={2}
            keyboardType={'number-pad'}
            name="pack_size"
            label={'Pack Size'}
            placeholder="Enter Pack Size"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            maxLength={6}
            keyboardType={'number-pad'}
            name="price"
            label={'Price'}
            placeholder="Enter Price"
          />
        </View>

        <Button
          title={'Save'}
          onPress={() => formik.handleSubmit()}
          loading={loading}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  barCode: {
    width: '99%',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowColor: '#CFAFF3',
    shadowRadius: 4,
    elevation: 4,
    height: 102,
    borderRadius: 6,
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  qrtext: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#050713',
  },
});

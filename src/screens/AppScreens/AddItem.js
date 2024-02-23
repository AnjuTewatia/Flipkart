import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useFormik} from 'formik';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addItemValidation} from '../../utils/validations';

const AddItem = ({navigation}) => {
  return (
    <AppBaseComponent
      backButton
      title={'Add Item'}
      navigation={navigation}
      renderChild={Content({navigation})}
    />
  );
};
const Content = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      itenName: '',
      brandName: '',
      alcoholpercentage: '',
      mlCan: '',
      packSize: '',
      price: '',
    },
    validationSchema: addItemValidation,
    onSubmit: values => {
      console.log(values);
    },
  });

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
              style={{width: '100%', height: 95, alignSelf: 'center'}}
            />
          </View>
          <View style={{marginVertical: 6}} />

          <InputField
            formik={formik}
            bgcolor={'#fff'}
            name="itenName"
            label={'Item Name'}
            placeholder="Enter Item Name"
          />
          <InputField
            formik={formik}
            dropdown={true}
            bgcolor={'#fff'}
            name="brandName"
            label={'Alcohol Brand Name'}
            placeholder="Select Alcoho Brand Name"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            keyboardType={'number-pad'}
            name="alcoholpercentage"
            label={'Alcohol %'}
            placeholder="Enter Alcoho %"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            keyboardType={'number-pad'}
            name="mlCan"
            label={'ml / Can'}
            placeholder="Enter ml / Can"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            keyboardType={'number-pad'}
            name="packSize"
            label={'Pack Size'}
            placeholder="Enter Pack Size"
          />
          <InputField
            formik={formik}
            bgcolor={'#fff'}
            keyboardType={'number-pad'}
            name="price"
            label={'Price'}
            placeholder="Enter Price"
          />
        </View>

        <Button title={'Save'} onPress={() => formik.handleSubmit()} />
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
});

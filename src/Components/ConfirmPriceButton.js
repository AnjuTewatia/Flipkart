import {Pressable, StyleSheet, Text, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from './AppContext';
import ConfirmModal from './ConfirmModal';
import ConfirmPriceModal from './ConfirmPriceModal';
import AddNewPrice from './AddNewPrice';
import useFetch from '../utils/useFetch';
import Toast from 'react-native-toast-message';
import {useFormik} from 'formik';
const ConfirmPrice = ({title, onPress, style, item, store_id}) => {
  const {windowWidth, initialRegion} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [loader, setLoader] = useState(false);

  const openModal = async () => {
    setIsOpen(false);
    setTimeout(() => {
      setPriceModal(true);
    }, 100);
  };

  const [confirmPrice, {response, loading, error}] = useFetch('confirm-price', {
    method: 'POST',
  });

  const handleConfirmPrice = async values => {
    try {
      const res = await confirmPrice({
        store_id: store_id,
        item_uuid: item?.uuid,
        item_confirm: values ? '2' : '1',
        updated_price: values?.updated_price ?? item?.price,
        user_latitude: initialRegion?.latitude,
        user_longitude: initialRegion?.longitude,
      });
      console.log('res ==>', res);
      if (res?.status === 200) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
      }
    } catch (error) {}
    setIsOpen(false);
    setPriceModal(false);
  };
  const formik = useFormik({
    initialValues: {
      updated_price: '',
    },
    onSubmit: values => {
      handleConfirmPrice(values, '2');
    },
  });
  return (
    <>
      <Pressable
        style={[styles.linearGradient, style]}
        onPress={() => setIsOpen(true)}>
        <LinearGradient
          colors={['#371841', '#8C2457']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.linearGradient, style, {width: 65}]}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Pressable>
      <ConfirmPriceModal
        isOpen={isOpen}
        name={item?.name}
        loading={loading}
        price={item?.price}
        onYesClick={() => handleConfirmPrice()}
        onCrossClick={() => setIsOpen(false)}
        onNoClick={() => openModal()}
        cancelText="No"
        confirmText="Yes"
      />
      <AddNewPrice
        isOpen={priceModal}
        loading={loading}
        name={item?.name}
        formik={formik}
        description="Are you sure you want to delete the item?"
        onYesClick={() => formik.handleSubmit()}
        onCrossClick={() => setPriceModal(false)}
        onNoClick={() => setPriceModal(false)}
        cancelText="Cancel"
        confirmText="Save"
      />
    </>
  );
};

export default ConfirmPrice;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 17,
    // padding: 5,
    height: 24,
    marginTop: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    minWidth: 81,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: 'DM Sans',
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

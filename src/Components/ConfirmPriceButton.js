import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from './AppContext';
import ConfirmPriceModal from './ConfirmPriceModal';
import AddNewPrice from './AddNewPrice';
import useFetch from '../utils/useFetch';
import Toast from 'react-native-toast-message';
import {useFormik} from 'formik';
import {PriceSchema} from '../utils/validations';
import ConfirmModal from './ConfirmModal';
const ConfirmPrice = ({title, style, item, store_id}) => {
  const {
    initialRegion,
    locationpermission,
    goToSettings,
    checkAndRequestLocationPermission,
  } = useAppContext();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [priceModal, setPriceModal] = useState(false);

  const openModal = async () => {
    setIsOpen(false);
    setTimeout(() => {
      setPriceModal(true);
    }, 100);
  };

  const [confirmPrice, {loading}] = useFetch('confirm-price', {
    method: 'POST',
  });

  const checkPermission = () => {
    if (locationpermission === 'blocked') {
      setModal(true);
      return;
    } else if (locationpermission === 'granted') {
      setIsOpen(true);
      return;
    } else {
      // checkAndRequestLocationPermission();
      return;

      //
    }
  };

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
    validationSchema: PriceSchema,
    onSubmit: values => {
      handleConfirmPrice(values, '2');
    },
  });
  return (
    <>
      <Pressable
        style={[styles.linearGradient, style]}
        onPress={checkPermission}>
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
      <ConfirmModal
        isOpen={modal}
        // loading={loader}
        handleClose={() => setModal(false)}
        title="Permission Denied"
        description="Access was previously denied, Please grant location access from the Settings."
        onYesClick={() => goToSettings()}
        onNoClick={() => setModal(false)}
        cancelText="Cancel"
        confirmText="Go to Settings."
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

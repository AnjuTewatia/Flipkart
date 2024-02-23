import React, {ReactNode, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../utils/styleConst';

import {Typography} from './Typography';
import {Keyboard} from 'react-native';
import {CrossIcon} from '../Icons';
import {TextInput} from 'react-native-gesture-handler';
import InputField from './InputField';
import {useFormik} from 'formik';

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
    paddingTop: 30,
  },
  modalHeading: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 17,
    color: '#371841',
    fontWeight: '800',
  },
  modalPara: {
    textAlign: 'center',
    lineHeight: 20,
    color: '#371841',
    fontSize: 18,
    width: '70%',
    alignSelf: 'center',
  },
  price: {
    textAlign: 'center',
    lineHeight: 24,
    color: '#371841',
    fontSize: 18,
    fontWeight: '800',
  },
  modalFooter: {
    flexDirection: 'row',
    borderTopWidth: 0.6,
    borderTopColor: COLORS.grey,
  },
  footerBtn: {
    flexDirection: 'row',
    gap: 4,
    flexBasis: '50%',
    flexGrow: 1,
    padding: 10,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightBtn: {
    color: COLORS.grey,
  },
  divider: {
    borderRightColor: COLORS.grey,
    borderRightWidth: 0.6,
    // alignSelf: "center",
  },
  modalText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  fullView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalLayout: {
    zIndex: 999,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modaldialog: {
    zIndex: 2,
    minHeight: 100,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,.94)',
    borderRadius: 14,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 4,
  },
});
const AddNewPrice = ({
  loading,
  isOpen,
  handleClose,
  title,
  description,
  onYesClick,
  onNoClick,
  onCrossClick,
  price,
  confirmText,
  cancelText,
}) => {
  const formik = useFormik({
    initialValues: {
      newPrice: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      style={{}}
      animationType="none"
      // animationType="slide"
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback
        style={{flexGrow: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View style={[styles.fullView, styles.modalLayout]}>
          <View style={styles.modaldialog}>
            <View style={styles.modalContent}>
              <Typography type="sm" style={styles.modalPara}>
                <Typography type="h3" style={styles.price}>
                  Archie Rose
                </Typography>
                {''} price is not correct kindly update the price.
              </Typography>
            </View>
            <InputField
              bgcolor={'#fff'}
              style={styles.input}
              formik={formik}
              name="newPrice"
              placeholder="Enter New Price"
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={loading ? null : onNoClick}>
                {typeof cancelText === 'object' ? (
                  cancelText
                ) : (
                  <Typography
                    type="h5"
                    style={[styles.lightBtn, styles.modalText]}>
                    {cancelText ?? 'No'}
                  </Typography>
                )}
              </TouchableOpacity>

              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={loading ? null : onYesClick}>
                {typeof confirmText === 'object' ? (
                  cancelText
                ) : (
                  <Typography
                    type="h5"
                    style={[
                      (styles.modalText, {color: '#371841', fontWeight: '700'}),
                    ]}>
                    {confirmText ?? 'Yes'}
                  </Typography>
                )}
                {loading && <ActivityIndicator />}
              </TouchableOpacity>
            </View>

            <Pressable
              style={{position: 'absolute', top: 4, right: 4}}
              onPress={onCrossClick}>
              <CrossIcon />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddNewPrice;

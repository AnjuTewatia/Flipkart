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

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
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
    lineHeight: 16,
    color: '#6E6F76',
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
    backgroundColor: COLORS.white,
    borderRadius: 14,
  },
});
const ConfirmModal = ({
  loading,
  isOpen,
  handleClose,
  title,
  description,
  onYesClick,
  onNoClick,
  onCrossClick,

  confirmText,
  cancelText,
}) => {
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
              <Typography type="h4" style={styles.modalHeading}>
                {title}
              </Typography>
              {description ? (
                typeof description === 'string' ? (
                  <Typography type="sm" style={styles.modalPara}>
                    {description}
                  </Typography>
                ) : (
                  description
                )
              ) : (
                <></>
              )}
            </View>
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
                {loading && <ActivityIndicator color={'#000'} />}
              </TouchableOpacity>
            </View>
            {onCrossClick && (
              <Pressable
                style={{position: 'absolute', top: 2, right: 2}}
                onCrossClick={onCrossClick}>
                <CrossIcon />
              </Pressable>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;

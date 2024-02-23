import {Pressable, StyleSheet, Text, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from './AppContext';
import ConfirmModal from './ConfirmModal';
import ConfirmPriceModal from './ConfirmPriceModal';
import AddNewPrice from './AddNewPrice';
const ConfirmPrice = ({title, onPress, style}) => {
  const {windowWidth} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [priceModal, setPriceModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const openModal = async () => {
    setIsOpen(false);
    setTimeout(() => {
      setPriceModal(true);
    }, 100);
  };
  return (
    <>
      <Pressable
        style={[styles.linearGradient, style]}
        onPress={() => setIsOpen(true)}>
        <LinearGradient
          colors={['#371841', '#8C2457']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.linearGradient, style, {width: windowWidth - 280}]}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Pressable>
      <ConfirmPriceModal
        isOpen={isOpen}
        loading={loader}
        price={'45'}
        onYesClick={() => setIsOpen(false)}
        onCrossClick={() => setIsOpen(false)}
        onNoClick={() => openModal()}
        cancelText="No"
        confirmText="Yes"
      />
      <AddNewPrice
        isOpen={priceModal}
        loading={loader}
        price={'45'}
        description="Are you sure you want to delete the item?"
        onYesClick={() => setPriceModal(false)}
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
    height: 28,
    marginTop: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    minWidth: 81,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'DM Sans',
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

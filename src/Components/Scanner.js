import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, Modal, Pressable} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {WhiteBackButton} from '../Icons';
import {useAppContext} from './AppContext';
import {Height, WIDTH} from '../utils/styleConst';

const Scanner = ({onScan, isOpen, handleClose}) => {
  const {windowWidth} = useAppContext();
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    if (scannedData) {
      onScan(scannedData);
    }
  }, [scannedData, onScan]);

  const handleScan = ({data}) => {
    // Display an alert with the scanned QR code data
    Alert.alert('Scanned QR Code', data, [{text: 'OK', onPress: () => {}}]);
    setScannedData(data);
  };

  return (
    <Modal transparent visible={isOpen} onRequestClose={handleClose}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleClose}>
          <WhiteBackButton />
        </Pressable>
        <View style={styles.cameraContainer}>
          {/* Border corners */}
          <View style={styles.topLeftCorner} />
          <View style={styles.topRightCorner} />
          <View style={styles.bottomLeftCorner} />
          <View style={styles.bottomRightCorner} />
          {/* QR Code Scanner */}
          <QRCodeScanner
            onRead={handleScan}
            containerStyle={styles.scannerContainer}
            cameraStyle={{flex: 1}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    top: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  scannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: WIDTH / 1.5,
    height: Height / 2.5,

    borderColor: '#F87E7D', // Add border color
    overflow: 'hidden',
    // borderRadius: 10,
    alignSelf: 'center',
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  scannedDataText: {
    color: '#000',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default Scanner;

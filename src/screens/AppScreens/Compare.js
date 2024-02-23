import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {Typography} from '../../Components/Typography';
import {useAppContext} from '../../Components/AppContext';
import ConfirmPrice from '../../Components/ConfirmPriceButton';
import {Tick} from '../../Icons';
import Button from '../../Components/Button';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Scanner from '../../Components/Scanner';

const Compare = ({navigation, route}) => {
  const title = route?.params;

  return (
    <AppBaseComponent
      navigation={navigation}
      title={title}
      backButton
      renderChild={Content({navigation, title})}
    />
  );
};

const Content = ({navigation, title}) => {
  const {windowWidth} = useAppContext();
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const handleScan = data => {
    console.log('faff data:', data);
    setScannedData(data);
    setScannerVisible(false);
  };

  return (
    <>
      <View style={[Common.container, styles.compareContainer]}>
        <View
          style={styles.favoriteView}
          onPress={() => {
            type === 'search'
              ? navigation.navigate('storeItems')
              : toggleBottomSheet();
          }}>
          <View style={{marginHorizontal: 15}}>
            <Typography
              type="h3"
              style={[styles.title, {width: windowWidth - 140}]}>
              Violet Crumb-Ball
            </Typography>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RenderImages
                source={IMAGES.locationicon}
                style={{width: 16, height: 18}}
              />
              <Typography
                type="h5"
                style={[styles.text, {width: windowWidth - 155}]}>
                Akshya Nagar 1st Block 1st Cross Rammurthy nagar
              </Typography>
            </View>
          </View>
        </View>
        {/* // */}
        {title === 'Calculate' && (
          <View style={[styles.calculateView, {maxHeight: 200}]}>
            <View style={styles.topIcon}>
              <Pressable style={styles.icon}>
                <RenderImages
                  source={IMAGES.deleteicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
              <Pressable style={styles.icon}>
                <RenderImages
                  source={IMAGES.editicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
            </View>
            <View style={[styles.calculatestoreView]}>
              <RenderImages
                source={IMAGES.beer}
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  zindex: 999,
                }}
              />

              <RenderImages
                source={IMAGES.arrowimg}
                style={{width: '18%', minHeight: '85%'}}
              />
              <View style={{marginHorizontal: 15}}>
                <Typography
                  type="h3"
                  style={[styles.storeTitle, {width: windowWidth - 140}]}>
                  Violet Crumb-Ball
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    // justifyContent: 'sp',
                  }}>
                  <Typography type="h5" style={[styles.storeText]}>
                    10% alcohol
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    200ml
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    10 cans
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Typography type="sm" style={styles.brandname}>
                    Bacardi
                  </Typography>
                  <RenderImages
                    source={IMAGES.tagicon}
                    style={{width: 18, height: 18}}
                  />
                  <Typography
                    type="h5"
                    style={[
                      styles.text,
                      {
                        width: windowWidth - 155,
                        fontWeight: '800',
                        color: '#F87E7D',
                      },
                    ]}>
                    $43
                  </Typography>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: -2,
                      right: 45,
                    }}>
                    <ConfirmPrice title={'Confirm Price'} />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 54,
                width: '99%',
                backgroundColor: '#F5F5F5',
                marginBottom: 12,
                alignSelf: 'center',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#EBE8EC',
                justifyContent: 'center',
                paddingHorizontal: 12,
              }}>
              <Typography type="h3" style={styles.itemprice}>
                {' '}
                23.6mL of alcohol / $1
              </Typography>
            </View>
          </View>
        )}
        {title === 'Compare' && (
          <>
            <View style={[styles.storeView]}>
              <RenderImages
                source={IMAGES.beer}
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  zindex: 999,
                }}
              />
              <View style={styles.topIcon}>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.deleteicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.editicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
              </View>

              <RenderImages
                source={IMAGES.arrowimg}
                style={{width: '18%', minHeight: '85%'}}
              />
              <View style={{marginHorizontal: 15}}>
                <Typography
                  type="h3"
                  style={[styles.storeTitle, {width: windowWidth - 140}]}>
                  Violet Crumb-Ball
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    // justifyContent: 'sp',
                  }}>
                  <Typography type="h5" style={[styles.storeText]}>
                    10% alcohol
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    200ml
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    10 cans
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Typography type="sm" style={styles.brandname}>
                    Bacardi
                  </Typography>
                  <RenderImages
                    source={IMAGES.tagicon}
                    style={{width: 18, height: 18}}
                  />
                  <Typography
                    type="h5"
                    style={[
                      styles.text,
                      {
                        width: windowWidth - 155,
                        fontWeight: '800',
                        color: '#F87E7D',
                      },
                    ]}>
                    $43
                  </Typography>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: -2,
                      right: 45,
                    }}>
                    <ConfirmPrice title={'Confirm Price'} />
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.storeView]}>
              <RenderImages
                source={IMAGES.beer}
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  zindex: 999,
                }}
              />
              <View style={styles.topIcon}>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.deleteicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.editicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
              </View>

              <RenderImages
                source={IMAGES.arrowimg}
                style={{width: '18%', minHeight: '85%'}}
              />
              <View style={{marginHorizontal: 15}}>
                <Typography
                  type="h3"
                  style={[styles.storeTitle, {width: windowWidth - 140}]}>
                  Violet Crumb-Ball
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    // justifyContent: 'sp',
                  }}>
                  <Typography type="h5" style={[styles.storeText]}>
                    10% alcohol
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    200ml
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    10 cans
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Typography type="sm" style={styles.brandname}>
                    Bacardi
                  </Typography>
                  <RenderImages
                    source={IMAGES.tagicon}
                    style={{width: 18, height: 18}}
                  />
                  <Typography
                    type="h5"
                    style={[
                      styles.text,
                      {
                        width: windowWidth - 155,
                        fontWeight: '800',
                        color: '#F87E7D',
                      },
                    ]}>
                    $43
                  </Typography>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: -2,
                      right: 50,
                      backgroundColor: '#58C800',
                      padding: 2,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 81,
                    }}>
                    <Tick />
                    <Typography style={styles.verifiedText}>
                      Verified
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
            {/* Best Offer for You  */}
            <View
              style={[
                styles.storeView,
                {
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: '#8C2457',
                },
              ]}>
              <RenderImages
                source={IMAGES.beer}
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  zindex: 999,
                }}
              />
              <View style={styles.topIcon}>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.deleteicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
                <Pressable style={styles.icon}>
                  <RenderImages
                    source={IMAGES.editicon}
                    style={{width: 18, height: 18}}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  width: '18%',
                  minHeight: '85%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  // position: 'relative', // Ensure the parent container has relative positioning
                }}>
                <RenderImages
                  source={IMAGES.bestOffer}
                  style={{
                    width: '100%',
                    minHeight: '100%',
                    // position: 'absolute',
                    // zIndex: -999,
                    left: 40,
                    top: 22,
                  }}
                />
                <RenderImages
                  source={IMAGES.arrowimg}
                  style={{width: '100%', minHeight: '100%', left: -30}} // Set higher zIndex for arrow image
                />
              </View>

              <View style={{marginHorizontal: 15}}>
                <Typography
                  type="h3"
                  style={[styles.storeTitle, {width: windowWidth - 140}]}>
                  Violet Crumb-Ball
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    // justifyContent: 'sp',
                  }}>
                  <Typography type="h5" style={[styles.storeText]}>
                    10% alcohol
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    200ml
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    |
                  </Typography>
                  <Typography type="h5" style={[styles.storeText]}>
                    10 cans
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Typography type="sm" style={styles.brandname}>
                    Bacardi
                  </Typography>
                  <RenderImages
                    source={IMAGES.tagicon}
                    style={{width: 18, height: 18}}
                  />
                  <Typography
                    type="h5"
                    style={[
                      styles.text,
                      {
                        width: windowWidth - 155,
                        fontWeight: '800',
                        color: '#F87E7D',
                      },
                    ]}>
                    $43
                  </Typography>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: -2,
                      right: 45,
                    }}>
                    <ConfirmPrice title={'Confirm Price'} />
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {title === 'Calculate' && <></>}
        {/* // */}
        <Pressable
          style={styles.scanBtn}
          onPress={() => setScannerVisible(true)}>
          <RenderImages
            source={IMAGES.scanIcon}
            style={{width: 24, height: 24, marginHorizontal: 5}}
          />
          <Typography type="h4" style={styles.btnText}>
            Scan Barcode
          </Typography>
        </Pressable>
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <Button title={title} />
        </View>
      </View>
      <Scanner
        onScan={handleScan}
        isOpen={scannerVisible}
        handleClose={() => setScannerVisible(false)}
      />
    </>
  );
};
export default Compare;

const styles = StyleSheet.create({
  compareContainer: {
    flex: 1,
  },
  favoriteView: {
    width: '99%',
    minHeight: 80,
    backgroundColor: '#EBE8EC',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 12,
  },
  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 16,
  },
  text: {
    color: '#6E6F76',
    fontSize: 13,
    marginHorizontal: 5,
  },
  scanBtn: {
    backgroundColor: 'rgba(248, 126, 125, 0.18)',
    borderWidth: 1,
    borderColor: '#F87E7D',
    borderStyle: 'dashed',
    width: '99%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  btnText: {
    color: '#371841',
    fontWeight: '700',
  },
  storeView: {
    width: '99%',
    maxHeight: 120,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingVertical: 10,
  },
  calculateView: {
    width: '99%',
    maxHeight: 120,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginVertical: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  calculatestoreView: {
    width: '99%',
    maxHeight: 120,
    flexDirection: 'row',
    paddingHorizontal: 6,
    marginTop: 12,

    paddingVertical: 10,
  },
  storeTitle: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 16,
  },
  topIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    flexDirection: 'row',
  },
  storeText: {
    color: '#6E6F76',
    fontSize: 13,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
  brandname: {
    fontSize: 14,
    color: '#99999E',
    marginRight: 10,
  },
  verifiedText: {
    fontSize: 12,
    color: '#fff',
  },
  itemprice: {
    color: '#8C2457',
    fontWeight: '600',
  },
});

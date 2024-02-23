import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import MapView, {Marker} from 'react-native-maps';
import {WIDTH} from '../../utils/styleConst';
import InputField from '../../Components/InputField';
import {useFormik} from 'formik';
import Button from '../../Components/Button';
import Geolocation from '@react-native-community/geolocation';
import {LocationMarker} from '../../Icons';
import useFetch from '../../utils/useFetch';
import {log} from 'react-native-reanimated';
import {addStoreValidation} from '../../utils/validations';
const AddStore = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Add Store'}
      backButton
      navigation={navigation}
      height={'97%'}
      topPadding={0}
      paddingHorizontal={0}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const [currentRegion, setCurrentRegion] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    validationSchema: addStoreValidation,
    onSubmit: values => {
      handleAddStore(values);
    },
  });

  const [addStore, {response, loading, error}] = useFetch('create-store', {
    method: 'POST',
  });

  const handleAddStore = async values => {
    const res = await addStore({
      ...values,
      latitude: currentRegion?.latitude,
      longitude: currentRegion?.longitude,
    });
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const handleMarkerDragEnd = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  return (
    <>
      <View style={styles.container}>
        {currentRegion && (
          <MapView style={styles.map} initialRegion={currentRegion}>
            <Marker
              draggable
              onDragEnd={handleMarkerDragEnd}
              coordinate={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
              title="Your Location"
              description="This is your current location">
              <LocationMarker />
            </Marker>
          </MapView>
        )}
        <View style={styles.storeformView}>
          <InputField
            maxLength={50}
            formik={formik}
            // bgcolor={'#fff'}
            name="name"
            label={'Store Name'}
            placeholder="Enter Store Name"
          />
          <InputField
            formik={formik}
            name="address"
            label={'Address'}
            placeholder="Enter Address"
          />
          <Button title={'Save'} onPress={() => formik.handleSubmit()} />
        </View>
      </View>
    </>
  );
};
export default AddStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  storeformView: {
    // height: 200,
    width: WIDTH,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For
    position: 'absolute',
    padding: 10,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

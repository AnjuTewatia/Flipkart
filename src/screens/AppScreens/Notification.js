import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';

const Notification = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Notifications'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {windowWidth} = useAppContext();

  return (
    <ScrollView style={[Common.container, [styles.notificationContainer]]}>
      <Typography type="label">Today</Typography>
      <View style={styles.notificationView}>
        <RenderImages
          source={IMAGES.notificationimg}
          style={{width: '21%', minHeight: '90%'}}
        />
        <View style={{marginHorizontal: 15}}>
          <Typography
            type="h3"
            style={[styles.title, {width: windowWidth - 140}]}>
            Price Updated
          </Typography>
          <Typography
            type="h5"
            style={{color: '#6E6F76', width: windowWidth - 155, fontSize: 14}}>
            Points have been deducted as the price has not been confirmed.
          </Typography>
        </View>
      </View>
      <View style={styles.notificationView}>
        <RenderImages
          source={IMAGES.notificationimg}
          style={{width: '21%', minHeight: '90%'}}
        />
        <View style={{marginHorizontal: 15}}>
          <Typography
            type="h3"
            style={[styles.title, {width: windowWidth - 140}]}>
            Price Updated
          </Typography>
          <Typography
            type="h5"
            style={{color: '#6E6F76', width: windowWidth - 155, fontSize: 14}}>
            Points have been deducted as the price has not been confirmed.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    marginTop: 10,
  },
  notificationView: {
    width: '99%',
    maxHeight: 100,
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
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 16,
  },
});

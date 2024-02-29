import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {Typography} from '../../Components/Typography';
import {COLORS} from '../../utils/styleConst';
import {useAppContext} from '../../Components/AppContext';
import useFetch from '../../utils/useFetch';
import Toast from 'react-native-toast-message';

const ManageNotification = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Manage Notification'}
      backButton
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {userProfile, setUserProfile} = useAppContext();

  const [notification_status, setNotificationStatus] = useState(
    userProfile?.notification_status,
  );
  const [checked, setChecked] = useState(
    notification_status == 0 ? false : true,
  );

  const [getnotification] = useFetch('notification-status', {method: 'GET'});

  const handleNotification = async () => {
    setChecked(notification_status == 0 ? true : false);
    const res = await getnotification();
    console.log('res ==>', res);
    if (res?.status === 200) {
      setUserProfile(res?.data);
      setNotificationStatus(res?.data?.notification_status);
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
    }
  };

  return (
    <>
      <View style={Common.container}>
        <View style={styles.wrapper}>
          <Typography type="h3" style={styles.title}>
            Push Notifications
          </Typography>
          <Switch
            shouldRasterizeIOS
            thumbColor={COLORS.white}
            ios_backgroundColor={
              checked ? '#F87E7D' : 'rgba(120, 120, 128, 0.16)'
            }
            trackColor={{
              false: 'rgba(120, 120, 128, 0.16)',
              true: '#F87E7D',
            }}
            value={checked}
            onValueChange={() => handleNotification()}
          />
        </View>
      </View>
    </>
  );
};
export default ManageNotification;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    minHeight: 60,
    width: '98%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#371841',
    fontWeight: '700',
    fontSize: 18,
    textAlignVertical: 'center',
  },
});

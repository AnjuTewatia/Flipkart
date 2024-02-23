import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';
import {RightArrow} from '../../Icons';
import Button from '../../Components/Button';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmModal from '../../Components/ConfirmModal';
import useFetch from '../../utils/useFetch';

const Profile = ({navigation}) => {
  return (
    <AppBaseComponent
      title={'Profile'}
      height={'94%'}
      renderChild={Content({navigation})}
    />
  );
};

const Content = ({navigation}) => {
  const {windowWidth, removeUser, device_id} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const Options = [
    {
      title: 'Earned Points',
      desc: '75',
      image: IMAGES.earnedPoints,
      onPress: () => {
        console.log('HHJHJ');
      },
    },
    {
      title: 'Manage Notifications',
      image: IMAGES.bell,
      rightarrow: true,
      onPress: () => {
        navigation.navigate('manageNotification');
      },
    },
    {
      title: 'Change Password',
      image: IMAGES.changePassword,
      rightarrow: true,
      onPress: () => {
        navigation.navigate('changePassword');
      },
    },
    {
      title: 'Delete Account',
      image: IMAGES.profiledelete,
      onPress: () => {
        console.log('HHJHJ');
      },
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <Pressable onPress={item?.onPress}>
        <View style={styles.OptionContainer}>
          <RenderImages source={item?.image} style={{width: 50, height: 50}} />

          <View
            style={{
              marginHorizontal: 15,
            }}>
            <Typography
              type="h2"
              style={[styles.optiontitle, {width: windowWidth - 170}]}>
              {item?.title}
            </Typography>
            {item?.desc && (
              <Typography
                type="h4"
                style={[styles.optiondescription, {width: windowWidth - 170}]}>
                {item?.desc}
              </Typography>
            )}
          </View>
          {item?.rightarrow && (
            <View style={styles.rightarrow}>
              <RightArrow />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const [logout, {response, loading, error}] = useFetch('logout', {
    method: 'POST',
  });

  const handlelogout = async () => {
    const res = await logout({
      device_id: device_id,
      device_token: '2222',
      device_type: Platform.OS,
    });
    if (res) {
      setIsOpen(false);
      removeUser();
    }
  };

  return (
    <ScrollView style={Common.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profilesection}>
        <Pressable
          style={styles.editIcon}
          onPress={() => navigation.navigate('editProfile')}>
          <RenderImages
            source={IMAGES.editicon}
            style={{width: 20, height: 20}}
          />
        </Pressable>
        <View style={styles.img}>
          <Pressable style={styles.cameraIcon}>
            <View style={styles.camera}>
              <RenderImages
                source={IMAGES.cameraIcon}
                style={{width: 14, height: 16}}
              />
            </View>
          </Pressable>
          <RenderImages
            source={IMAGES.profileImg}
            style={{width: 64, height: 64}}
          />
        </View>
        <View style={{marginHorizontal: 10}}>
          <Typography
            type="h2"
            style={[styles.name, {width: windowWidth - 170}]}>
            John Doe
          </Typography>
          <Typography
            type="h4"
            style={[styles.email, {width: windowWidth - 170}]}>
            xyz001@gmail.com
          </Typography>
        </View>
      </View>

      <LinearGradient
        colors={['#8C2457', '#F87E7D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient]}>
        <Typography type="h2" style={styles.subscriptiontitle}>
          Subscription Plan
        </Typography>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography type="h2" style={styles.price}>
            $9.99{' '}
            <Typography type="h4" style={{color: '#fff'}}>
              {' '}
              / month.
            </Typography>
          </Typography>
          <Pressable
            style={styles.viewBtn}
            onPress={() => navigation.navigate('SubScription')}>
            <Typography type="h6" style={{color: '#fff'}}>
              View Details
            </Typography>
          </Pressable>
        </View>
      </LinearGradient>
      <View style={styles.OtherOption}>
        <Typography type="label" style={{fontWeight: '700', gap: 24}}>
          Other Options
        </Typography>
        <FlatList
          data={Options}
          keyExtractor={item => item?.title}
          renderItem={RenderItem}
        />
      </View>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={{
          padding: 8,
          marginVertical: 20,
          left: 3,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RenderImages source={IMAGES.logout} style={{width: 18, height: 18}} />
        <Typography
          type="h5"
          style={{color: '#8C2457', marginHorizontal: 8, fontSize: 18}}>
          Log Out
        </Typography>
      </Pressable>

      <ConfirmModal
        isOpen={isOpen}
        loading={loading}
        handleClose={() => setIsOpen(false)}
        title="Log Out"
        description="Are you sure you want to logout your account?"
        onYesClick={() => handlelogout()}
        onNoClick={() => setIsOpen(false)}
        cancelText="No"
        confirmText="Yes"
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profilesection: {
    marginVertical: 18,
    maxHeight: 120,
    width: '98%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  img: {
    borderWidth: 2,
    borderColor: '#F87E7D',
    borderRadius: 78,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  name: {
    color: '#371841',
    fontWeight: '700',
    fontSize: 20,
  },
  email: {
    color: '#371841',
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  cameraIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 25,
    left: -6,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: 23,
    height: 23,
    backgroundColor: '#F87E7D',
    bottom: 0,
    borderRadius: 25,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OptionContainer: {
    marginVertical: 12,
    maxHeight: 60,
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
  },
  optiontitle: {
    color: '#371841',
    fontWeight: '700',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  optiondescription: {
    color: '#371841',
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 5,
  },
  rightarrow: {
    position: 'absolute',
    right: 10,
    width: 25,
    height: 25,
    backgroundColor: '#EBE8EC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OtherOption: {
    marginTop: 10,
  },
  linearGradient: {
    width: '98%',
    alignSelf: 'center',
    height: 103,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  subscriptiontitle: {
    color: '#fff',
    marginVertical: 5,
    fontWeight: '600',
    fontSize: 20,
  },
  price: {
    color: '#fff',
    marginVertical: 5,
    fontWeight: '600',
    fontSize: 34,
  },
  viewBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 6,
  },
});

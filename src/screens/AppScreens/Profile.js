import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Platform,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import {Typography} from '../../Components/Typography';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';
import {RightArrow} from '../../Icons';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmModal from '../../Components/ConfirmModal';
import useFetch from '../../utils/useFetch';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import pickImage from '../../utils/ImagePicker';
import ActionSheet from 'react-native-actionsheet';
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
  const actionRef = useRef();

  const {windowWidth, removeUser, device_id, fcmToken, userProfile} =
    useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  console.log('userProfile ==>', userProfile);
  const {name, email} = userProfile;
  const [selectedImage, setSelectedImage] = useState(null);
  const [casenNo, setCaseNo] = useState(null);
  const Actions = ['View Image', 'Camera', 'Gallery', 'Cancel'];
  const Options = [
  

    {
      title: 'Delete Account',
      image: IMAGES.profiledelete,
      onPress: () => {
        setDeleteAcc(true);
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

  const [logout, {loading}] = useFetch(`user/${userProfile?._id}`, {
    method: 'DELETE',
  });

  const [deleteacc, setDeleteAcc] = useState(false)
  const handleDelete = async () => {
    const res = await logout();
    if (res) {
      setDeleteAcc(false);
    removeUser();
    }
  };

  
  const handlelogout = async () => {
    setIsOpen(false);
    removeUser();
    // const res = await logout({
    //   device_id: device_id,
    //   device_token: fcmToken,
    //   device_type: Platform.OS,
    // });
    // if (res) {
    
    // }
  };

  const showActionSheet = () => {
    actionRef.current.show();
  };

  const hideActionSheet = () => {
    actionRef.current.hide();
  };

  const handleImagePick = async () => {
    const image = await pickImage(); // Using the pickImage function to pick an image
    if (image) {
      setSelectedImage(image.path);
    }
  };

  const handleCameraOpen = async () => {
    const image = await pickImage(true); // Using the pickImage function to open the camera
    if (image) {
      setSelectedImage(image.path);
    }
  };

  const requestCameraPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.CAMERA;
      } else {
        permission = PERMISSIONS.ANDROID.CAMERA;
      }
      const result = await check(permission);

      switch (result) {
        case RESULTS.DENIED:
          const requestResult = await request(permission);
          if (requestResult === 'blocked') {
          }
          if (requestResult === RESULTS.GRANTED) {
            handleCameraOpen();
          }
          break;

        case RESULTS.GRANTED:
          handleCameraOpen();
          break;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestMediaPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.MEDIA_LIBRARY;
      } else {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      }
      const result = await check(permission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permission);
          if (requestResult === 'blocked') {
          }
          if (requestResult === RESULTS.GRANTED) {
            handleImagePick();
          }
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          handleImagePick();

          break;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAction = index => {
    switch (index) {
      case 0:
        setCaseNo(0);
        setTimeout(() => {
          console.log('View Image');
        }, 500);
        // Handle the first action
        break;
      case 1:
        setCaseNo(1);
        setTimeout(() => {
          requestCameraPermission();
        }, 500);
        // Handle the second action
        break;
      case 2:
        setCaseNo(2);
        setTimeout(() => {
          requestMediaPermission();
        }, 500);
        // Handle the second action
        break;
      // Add more cases for additional actions if needed
      default:
        break;
    }
  };
  return (
    <ScrollView
      style={Common.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <View style={styles.profilesection}>
        <Pressable
          style={styles.editIcon}
          onPress={() => navigation.navigate('editProfile')}>
          <RenderImages
            source={IMAGES.editicon}
            style={{width: 20, height: 20}}
          />
        </Pressable>
        <Pressable style={styles.img} onPress={showActionSheet}>
          <Pressable style={styles.cameraIcon} onPress={showActionSheet}>
            <View style={styles.camera}>
              <RenderImages
                source={IMAGES.cameraIcon}
                style={{width: 14, height: 16}}
              />
            </View>
          </Pressable>
          <RenderImages
            resizeMode="contain"
            source={selectedImage ?? IMAGES.user}
            style={{borderRadius: 67, width: 67, height: 67}}
          />
        </Pressable>
        <View style={{marginHorizontal: 10}}>
          <Typography
            type="h2"
            style={[styles.name, {width: windowWidth - 170}]}>
            {name}
          </Typography>
          <Typography
            type="h4"
            style={[styles.email, {width: windowWidth - 170}]}>
            {email}
          </Typography>
        </View>
      </View>

   
      <View style={styles.OtherOption}>
   
        <FlatList
          bounces={false}
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
       <ConfirmModal
        isOpen={deleteacc}
        loading={loading}
        handleClose={() => setDeleteAcc(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account?"
        onYesClick={() => handleDelete()}
        onNoClick={() => setDeleteAcc(false)}
        cancelText="No"
        confirmText="Yes"
      />
      <ActionSheet
        ref={actionRef}
        options={Actions}
        cancelButtonIndex={3}
        onPress={handleAction}
        animated={true}
        onDismiss={hideActionSheet}
        useNativeDriver={true}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profilesection: {
    marginVertical: 18,
    height: 120,
    width: '98%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.11,
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
    color: '#6E6F76',
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
    marginVertical: 6,
    maxHeight: 60,
    width: '98%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
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
    // padding: 10,
    padding: 15,
    marginVertical: 10,
  },
  subscriptiontitle: {
    color: '#fff',
    // marginVertical: 5,
    // fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
    fontSize: 20,
  },
  price: {
    color: '#fff',
    marginVertical: 5,
    fontFamily: 'DMSans-Bold',
    fontSize: 34,
  },
  viewBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 6,
  },
  bottomText: {
    color: '#000',
    width: '99%',
    backgroundColor: '#F5F5F5',
    height: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6E7',
  },
});

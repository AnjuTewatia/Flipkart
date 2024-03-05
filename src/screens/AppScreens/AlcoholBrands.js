import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import RightHeaderButton from '../../Components/RightHeaderButton';
import IMAGES from '../../utils/Images';
import Common from '../../utils/common';
import RenderImages from '../../Components/RenderImages';
import {DeleteIcon, EmptyHeart} from '../../Icons';
import {Typography} from '../../Components/Typography';
import {useAppContext} from '../../Components/AppContext';
import useFetch from '../../utils/useFetch';
import ConfirmModal from '../../Components/ConfirmModal';
import Toast from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import NoFound from '../../Components/NoFound';
import Shimmer from '../../Components/Shimmer';

const AlcoholBrands = ({navigation}) => {
  return (
    <AppBaseComponent
      navigation={navigation}
      title={'Alcohol Brands'}
      backButton
      renderChild={Content({navigation})}
      rightButton={
        <RightHeaderButton
          icon={IMAGES.addIcon}
          title="Brand"
          onPress={() => navigation.navigate('AddBrand', {type: 'add'})}
        />
      }
    />
  );
};
const Content = ({navigation}) => {
  const {windowWidth, userData} = useAppContext();
  const isFocused = useIsFocused();

  const [data, setData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);

  const [getbrands, {response, loading, error}] = useFetch(
    'all-alcohol-brands',
    {method: 'GET'},
  );

  const [
    deletebrand,
    {response: delRespose, loading: delLoader, error: delError},
  ] = useFetch('delete-alcohol-brand', {
    method: 'POST',
  });

  const deleteItem = () => {
    const newData = data.filter(item => item?.id !== deleteId);
    setData(newData);
  };

  const handleDeleteBrand = async () => {
    try {
      const res = await deletebrand({
        id: deleteId,
      });
      if (res?.status === 200) {
        deleteItem();
        setModal(false);
      }
    } catch (error) {}
  };

  const handleGetBrands = async () => {
    const res = await getbrands();

    if (res?.status === 200) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    handleGetBrands();
  }, [delRespose, isFocused]);
  const RenderBrands = ({item}) => {
    return (
      <View style={[styles.favoriteView]}>
        <View style={styles.topIcon}>
          <Pressable
            style={styles.icon}
            onPress={() => {
              setDeleteId(item?.id);
              setModal(true);
            }}>
            <DeleteIcon />
            {/* <RenderImages
              source={IMAGES.deleteicon}
              style={{width: 21, height: 21}}
            /> */}
          </Pressable>
          <Pressable
            style={styles.icon}
            onPress={() =>
              navigation.navigate('AddBrand', {type: 'edit', data: item})
            }>
            <RenderImages
              source={IMAGES.editicon}
              style={{width: 21, height: 21}}
            />
          </Pressable>
        </View>
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
        <Pressable style={styles.deleteIcon}></Pressable>
        <RenderImages
          source={IMAGES.arrowimg}
          style={{width: 65, minHeight: 65}}
        />
        <View style={{marginHorizontal: 15}}>
          <Typography
            type="h3"
            style={[styles.title, {width: windowWidth - 200}]}>
            {item?.name?.length > 30
              ? `${item?.name?.slice(0, 30)} ...`
              : item?.name}
          </Typography>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Typography type="h5" style={[styles.text]}>
              {item?.alcohol_category?.name}
            </Typography>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={Common.container}>
        {loading ? (
          <Shimmer />
        ) : (
          <>
            {data?.length > 0 ? (
              <FlatList
                data={data}
                bounces={false}
                keyExtractor={item => item?.id}
                renderItem={RenderBrands}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NoFound title={' No brands added'} />
              </View>
            )}
          </>
        )}
      </View>
      <ConfirmModal
        isOpen={modal}
        loading={delLoader}
        handleClose={() => setModal(false)}
        title="Delete"
        description="Are you sure you want to delete this alcohol brand?"
        onYesClick={() => handleDeleteBrand()}
        onNoClick={() => setModal(false)}
        cancelText="No"
        confirmText="Yes"
      />
    </>
  );
};

export default AlcoholBrands;

const styles = StyleSheet.create({
  favoriteView: {
    width: '99%',
    height: 99,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 6,
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
  },
  deleteIcon: {
    // position: 'absolute',
    top: 6,
    right: 10,
  },
  EmptyHeart: {
    // position: 'absolute',
    bottom: 6,
    right: 6,
  },
  text: {
    color: '#99999E',
    fontSize: 16,
    // marginHorizontal: 5,
  },
  rightarrow: {
    width: 25,
    height: 25,
    backgroundColor: '#EBE8EC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeart: {
    width: 25,
    height: 25,
  },
  topIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    flexDirection: 'row',
    zIndex: 999,
  },
  icon: {
    marginHorizontal: 8,
    padding: 2,
  },
});

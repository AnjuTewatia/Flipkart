import {StyleSheet, ScrollView, FlatList, View, Pressable,Image,Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import IMAGES from '../../utils/Images';
import {useAppContext} from '../../Components/AppContext';
import RenderStoreItems from '../../Components/RenderStoreItems';
import RightHeaderButton from '../../Components/RightHeaderButton';
import useFetch from '../../utils/useFetch';
import RenderStoreListing from '../../Components/RenderStoreListing';
import Shimmer from '../../Components/Shimmer';
import NoFound from '../../Components/NoFound';
import {Typography} from '../../Components/Typography';
import {ColorTick} from '../../Icons';
import ConfirmModal from '../../Components/ConfirmModal';
import {useIsFocused} from '@react-navigation/native';
import { BASE_URL } from '../../utils/baseUrl';
import Button from '../../Components/Button';

const Favourites = ({navigation}) => {
  const [sort, setSort] = useState(false);
  return (
    <AppBaseComponent
      title={'Favorites'}
      renderChild={Content({navigation, sort, setSort})}
      height={'94%'}
      topPadding={false}
      rightButton={
        <RightHeaderButton
          icon={IMAGES.sortby}
          title="Sort by"
          onPress={() => setSort(!sort)}
        />
      }
    />
  );
};

const Content = ({navigation, sort, setSort}) => {
  const {getCurrentLocation, setInitialRegion,userData} = useAppContext();
  const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(false)
  const [type, setType] = useState('1');
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [deleteType, setDeletetype] = useState('');
  const [open, setOpen] = useState(false);
 
  const fetchdata = async () => {
    setLoading(true)
    try {
        const res = await fetch(`${BASE_URL}cart`, {
            headers: {
                token: userData
            }
        })
        const resdata = await res.json()
        console.log('resDaa', resdata.cart);
        setData(resdata?.cart)

    } catch (error) {

    }
setLoading(false)
}

  const RenderItem = ({item}) => {
    return (
      <>
      <View>
      <Image
                        source={{ uri: item?.image1 }}
                        style={{
                            width: 300,
                            height: 200,
                            marginBottom: 10,
                        }}
                    />
                    <Text>{item?.title}</Text>
                    <Text>{item?.price}</Text>
      </View>
      </>
    );
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    data.forEach(item => {
      if (item?.price) {
        totalPrice += item.price;
      }
    });
    
    return totalPrice.toFixed(2);
  };
  const totalPrice = calculateTotalPrice();
  useEffect(() => {
   fetchdata()
  }, [isFocused]);

  return (
    <>
      {sort && (
        <View style={styles.sortModal}>
          <Pressable style={styles.row} onPress={() => setType('1')}>
            <Typography style={styles.sortText}>Stores</Typography>
            {type === '1' && <ColorTick />}
          </Pressable>
          <Pressable style={styles.row} onPress={() => setType('2')}>
            <Typography style={styles.sortText}>Items</Typography>
            {type === '2' && <ColorTick />}
          </Pressable>
        </View>
      )}
      <View
        style={[Common.container, styles.favoriteContainer]}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <Shimmer />
        ) : (
        
          <FlatList
            data={data}
            bounces={false}
            key={(item, index) => item?.id}
            renderItem={RenderItem}
            extraData={data}
            showsVerticalScrollIndicator={false}
          />
        )}
        {data?.length === 0 && !loading && (
          <View style={{flex: 1}}>
            <NoFound title={'No Cart item found'} />
          </View>
        )}
        <View style={{marginBottom: 10}} />
      </View>
    {data?.length> 1 &&  <View style={{ position: 'absolute', bottom: 0, alignSelf:"center" }}>
                    <Button
                        title={`Total : ${totalPrice}`}
                        // onPress={Addtocart}
                    // loading={loading}
                    />
                </View>}
      <ConfirmModal
        isOpen={modal}
        // loading={loading}
        handleClose={() => setModal(false)}
        title="Remove"
        description="Are you sure you want to remove this item from favourite?"
        onYesClick={() => toggleFavoriteItem()}
        onNoClick={() => setModal(false)}
        cancelText="No"
        confirmText="Yes"
      />
      <ConfirmModal
        isOpen={open}
        // loading={loading}
        handleClose={() => setOpen(false)}
        title="Remove"
        description="Are you sure you want to remove this store from favourite?"
        onYesClick={() => toggleFavoriteStore()}
        onNoClick={() => setOpen(false)}
        cancelText="No"
        confirmText="Yes"
      />
    </>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent:"center"
  },
  favoriteView: {
    width: '99%',
    maxHeight: 110,
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
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  text: {
    color: '#6E6F76',

    marginHorizontal: 5,
  },
  sortModal: {
    position: 'absolute',

    height: 75,
    backgroundColor: '#fff',
    zIndex: 999,
    top: 2,
    right: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-around',
    width: 130,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    color: '#371841',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

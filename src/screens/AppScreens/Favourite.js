import {StyleSheet, ScrollView, FlatList, View, Pressable} from 'react-native';
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
          title="Sortby"
          onPress={() => setSort(!sort)}
        />
      }
    />
  );
};

const Content = ({navigation, sort, setSort}) => {
  const {windowWidth} = useAppContext();
  const [type, setType] = useState('1');
  const [data, setData] = useState([]);
  const [getFavoriteItems, {loading}] = useFetch('get-favourite-list', {
    method: 'POST',
  });
  const handleGetFavourites = async () => {
    try {
      const res = await getFavoriteItems({type: type});
      if (res?.status === 200) {
        setData(res?.data);
      }
    } catch (error) {}
    setSort(false);
  };

  const RenderItem = ({item}) => {
    return (
      <>
        {item?.item ? (
          <RenderStoreItems
            item={item?.item}
            // store_id={store_id}
            onPress={() => console.log('hello')}
          />
        ) : item?.store ? (
          <RenderStoreListing
            item={item?.store}
            type={type}
            navigation={navigation}
            onheartPress={() => console.log('jejej')}
          />
        ) : null}
      </>
    );
  };

  useEffect(() => {
    handleGetFavourites();
  }, [type]);
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
      <ScrollView style={[Common.container, [styles.favoriteContainer]]}>
        {loading ? (
          <Shimmer />
        ) : (
          <FlatList
            data={data}
            extraData={data}
            key={(item, index) => index.tostring()}
            renderItem={RenderItem}
            showsVerticalScrollIndicator
          />
        )}
        {data?.length === 0 && <NoFound title={'No favorite item foumd'} />}
      </ScrollView>
    </>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    marginTop: 10,
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

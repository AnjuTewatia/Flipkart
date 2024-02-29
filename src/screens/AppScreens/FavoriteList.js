import {StyleSheet, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {useAppContext} from '../../Components/AppContext';
import RenderStoreItems from '../../Components/RenderStoreItems';
import useFetch from '../../utils/useFetch';
import NoFound from '../../Components/NoFound';
import Shimmer from '../../Components/Shimmer';

const FavouriteList = ({navigation, route}) => {
  const store_id = route?.params?.item?.id;
  return (
    <AppBaseComponent
      title={'Favorites'}
      navigation={navigation}
      backButton
      renderChild={Content({navigation, store_id})}
    />
  );
};

const Content = ({navigation, store_id}) => {
  const {windowWidth} = useAppContext();
  const [data, setData] = useState(null);

  const [getItems, {response, loading, error}] = useFetch(
    'get-favourite-items-by-store',
    {method: 'POST'},
  );
  console.log(store_id);
  const handleGetStores = async () => {
    const res = await getItems({
      store_id: store_id,
    });
    if (res?.status === 200) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    handleGetStores();
  }, []);

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreItems
          item={item}
          store_id={store_id}
          onPress={() => console.log('hello')}
        />
      </>
    );
  };

  return (
    <ScrollView style={[Common.container, [styles.favoriteContainer]]}>
      <>
        {loading ? (
          <Shimmer />
        ) : (
          <>
            {data?.items?.length === 0 ? (
              <NoFound title={'No Favorite item added'} />
            ) : (
              <FlatList
                data={data}
                keyExtractor={item => item?.id}
                renderItem={RenderItem}
              />
            )}
          </>
        )}
      </>
    </ScrollView>
  );
};

export default FavouriteList;

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
});

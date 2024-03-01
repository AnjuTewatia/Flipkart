import {StyleSheet, ScrollView, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBaseComponent from '../../BaseComponents/AppBaseComponent';
import Common from '../../utils/common';
import {useAppContext} from '../../Components/AppContext';
import RenderStoreItems from '../../Components/RenderStoreItems';
import useFetch from '../../utils/useFetch';
import NoFound from '../../Components/NoFound';
import Shimmer from '../../Components/Shimmer';
import ConfirmModal from '../../Components/ConfirmModal';

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
  const [data, setData] = useState(null);
  const [deleteid, setDeleteId] = useState(null);
  const [getItems, {response, loading, error}] = useFetch(
    'get-favourite-items-by-store',
    {method: 'POST'},
  );
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

  const [modal, setModal] = useState(false);

  const toggleFavorite = id => {
    console.log(id);
    const updatedData = data.map(item => {
      if (item.id === deleteid) {
        return {
          ...item,
          is_favourite: item.is_favourite === 0 ? 1 : 0,
        };
      }
      return item;
    });
    const newData = updatedData.filter(item => item.is_favourite !== 0);

    console.log('newdataa', newData);
    // Update component state or props with the updated data
    const newUpdatedData = [...newData];
    setData(newUpdatedData);

    setModal(false); // Assuming you have a setData function to update the state
    handleAddToFavorite();
  };
  const [addtoFavorite] = useFetch('add-to-favourite', {
    method: 'POST',
  });

  const handleAddToFavorite = async () => {
    const res = await addtoFavorite({
      store_id: store_id,
      item_id: deleteid,
      type: 2,
    });
    console.log('res ==>', res);
  };

  const RenderItem = ({item}) => {
    return (
      <>
        <RenderStoreItems
          item={item}
          store_id={store_id}
          ondeletePress={() => {
            setModal(true), setDeleteId(item?.id);
          }}
        />
      </>
    );
  };

  return (
    <>
      <ScrollView
        style={[Common.container, [styles.favoriteContainer]]}
        bounces={false}>
        <>
          {loading ? (
            <Shimmer />
          ) : (
            <>
              {data?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <NoFound title={'No Favorite items yet '} />
                </View>
              ) : (
                <FlatList
                  data={data}
                  bounces={false}
                  keyExtractor={item => item?.id}
                  renderItem={RenderItem}
                />
              )}
            </>
          )}
        </>
      </ScrollView>
      <ConfirmModal
        isOpen={modal}
        // loading={loading}
        handleClose={() => setModal(false)}
        title="Delete"
        description="Are you sure you want to remove this item from favourite?"
        onYesClick={() => toggleFavorite()}
        onNoClick={() => setModal(false)}
        cancelText="No"
        confirmText="Yes"
      />
    </>
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

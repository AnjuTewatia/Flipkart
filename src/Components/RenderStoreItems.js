import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RenderImages from './RenderImages';
import {Typography} from './Typography';
import IMAGES from '../utils/Images';
import {useAppContext} from './AppContext';
import ConfirmPrice from './ConfirmPriceButton';
import {EmptyHeart, FilledHeart} from '../Icons';
import useFetch from '../utils/useFetch';

const RenderStoreItems = ({
  item,
  store_id,
  heartIcon,
  editIcon,
  ondeletePress,
  onEditPress,
  type,
  onPress,
}) => {
  const {windowWidth} = useAppContext();

  const [addtoFavorite] = useFetch('add-to-favourite', {
    method: 'POST',
  });

  const handleAddToFavorite = async () => {
    console.log(store_id, item?.id);
    const res = await addtoFavorite({
      store_id: store_id,
      item_id: item?.id,
      type: 2,
    });
    console.log('res ==>', res);
  };

  return (
    <>
      {type === 'Calculate' && item?.result ? (
        <View style={[styles.calculateView, {height: 200}]}>
          <View
            style={{
              position: 'absolute',
              top: 6,
              right: 10,
              flexDirection: 'row',
              zIndex: 999,
            }}>
            {heartIcon ? (
              <Pressable
                style={styles.deleteIcon}
                onPress={() => {
                  onPress(), handleAddToFavorite();
                }}>
                {item?.is_favourite === 0 ? <EmptyHeart /> : <FilledHeart />}
              </Pressable>
            ) : (
              <Pressable style={styles.deleteIcon} onPress={ondeletePress}>
                <RenderImages
                  source={IMAGES.deleteicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
            )}

            {editIcon && (
              <Pressable style={styles.deleteIcon} onPress={onEditPress}>
                <RenderImages
                  source={IMAGES.editicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
            )}
          </View>
          <View style={[styles.calculatestoreView]}>
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
            <RenderImages
              source={IMAGES.arrowimg}
              style={{width: 65, minHeight: 65}}
            />
            <View style={{marginHorizontal: 12}}>
              <Typography
                type="h3"
                style={[styles.title, {width: windowWidth - 140}]}>
                {item?.name?.length > 30
                  ? `${item?.name?.slice(0, 30)}...`
                  : item?.name}
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 2,
                }}>
                <Typography type="h5" style={[styles.text]}>
                  {parseFloat(item?.alcohol_percentage)}% alcohol
                </Typography>
                <Typography type="h5" style={[styles.text]}>
                  |
                </Typography>
                <Typography type="h5" style={[styles.text]}>
                  {parseFloat(item?.quantity)} ml
                </Typography>
                <Typography type="h5" style={[styles.text]}>
                  |
                </Typography>
                <Typography type="h5" style={[styles.text]}>
                  {item?.pack_size} cans
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                  width: '60%',
                  justifyContent: 'space-between',
                }}>
                <Typography type="sm" style={[styles.brandname, {}]}>
                  {item?.brand?.name?.length > 8
                    ? `${item?.brand?.name?.slice(0, 10)}..`
                    : item?.brand?.name ?? ''}
                </Typography>
                <RenderImages
                  source={IMAGES.tagicon}
                  style={{width: 19, height: 19}}
                />
                <Typography
                  type="h5"
                  style={[
                    styles.text,
                    {
                      width: '50%',
                      fontWeight: '800',
                      color: '#F87E7D',
                      fontSize: 18,
                    },
                  ]}>
                  ${parseFloat(item?.price)}
                </Typography>
              </View>
            </View>
            <View style={{position: 'absolute', right: 0, bottom: 18}}>
              <ConfirmPrice
                title={'Confirm Price'}
                item={item}
                store_id={store_id}
              />
            </View>
          </View>
          <View
            style={{
              height: 54,
              width: '99%',
              backgroundColor: '#F5F5F5',
              marginBottom: 12,
              alignSelf: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#EBE8EC',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}>
            <Typography type="h3" style={styles.itemprice}>
              {item?.result.toFixed(2)}mL of alcohol / $1
            </Typography>
          </View>
        </View>
      ) : (
        <View
          style={[
            [
              styles.favoriteView,
              item?.best_choice && {
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderColor: '#8C2457',
              },
            ],
          ]}>
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
          <View
            style={{
              position: 'absolute',
              top: 6,
              right: 10,
              flexDirection: 'row',
              zIndex: 999,
            }}>
            {heartIcon ? (
              <Pressable
                style={styles.deleteIcon}
                onPress={() => {
                  onPress(), handleAddToFavorite();
                }}>
                {item?.is_favourite === 0 ? <EmptyHeart /> : <FilledHeart />}
              </Pressable>
            ) : (
              <Pressable style={styles.deleteIcon} onPress={ondeletePress}>
                <RenderImages
                  source={IMAGES.deleteicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
            )}

            {editIcon && (
              <Pressable style={styles.deleteIcon} onPress={onEditPress}>
                <RenderImages
                  source={IMAGES.editicon}
                  style={{width: 18, height: 18}}
                />
              </Pressable>
            )}
          </View>

          {item?.best_choice ? (
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',

                // position: 'relative', // Ensure the parent container has relative positioning
              }}>
              <RenderImages
                source={IMAGES.bestOffer}
                style={{
                  width: 60,
                  height: 60,
                  zIndex: 999,
                  left: 28,
                  top: 22,
                }}
              />
              <RenderImages
                source={IMAGES.arrowimg}
                style={{width: 60, height: 60, left: -30}} // Set higher zIndex for arrow image
              />
            </View>
          ) : (
            <RenderImages
              source={IMAGES.arrowimg}
              style={{width: 60, minHeight: 60}}
            />
          )}

          <View style={{marginHorizontal: 12}}>
            <Typography
              type="h3"
              style={[styles.title, {width: windowWidth - 140}]}>
              {item?.name?.length > 30
                ? `${item?.name?.slice(0, 30)}...`
                : item?.name}
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 2,
              }}>
              <Typography type="h5" style={[styles.text]}>
                {parseFloat(item?.alcohol_percentage)}% alcohol
              </Typography>
              <Typography type="h5" style={[styles.text]}>
                |
              </Typography>
              <Typography type="h5" style={[styles.text]}>
                {parseFloat(item?.quantity)} ml
              </Typography>
              <Typography type="h5" style={[styles.text]}>
                |
              </Typography>
              <Typography type="h5" style={[styles.text]}>
                {item?.pack_size} cans
              </Typography>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                width: '75%',
                justifyContent: 'space-between',
              }}>
              <Typography type="sm" style={[styles.brandname, {}]}>
                {item?.brand?.name?.length > 8
                  ? `${item?.brand?.name?.slice(0, 12)}..`
                  : item?.brand?.name ?? ''}
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // right: 10,
                }}>
                <RenderImages
                  source={IMAGES.tagicon}
                  style={{width: 19, height: 19}}
                />
                <Typography
                  type="h5"
                  style={[
                    styles.text,
                    {
                      width: '50%',
                      fontWeight: '800',
                      color: '#F87E7D',
                      fontSize: 18,
                    },
                  ]}>
                  ${parseFloat(item?.price)}
                </Typography>
              </View>
            </View>
          </View>
          <View style={{position: 'absolute', right: 0, bottom: 18}}>
            {type != 'search' && (
              <ConfirmPrice
                title={'Confirm Price'}
                item={item}
                store_id={store_id}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default RenderStoreItems;

const styles = StyleSheet.create({
  favoriteView: {
    width: '99%',
    height: 104,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 6,
    alignItems: 'center',
    marginVertical: 6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
  },

  title: {
    fontWeight: '700',
    color: '#371841',
    fontSize: 18,
  },
  deleteIcon: {
    marginHorizontal: 6,
  },
  text: {
    color: '#6E6F76',
    fontSize: 14,
    marginHorizontal: 4,
    marginTop: 2,
  },
  brandname: {
    fontSize: 14,
    color: '#99999E',
    marginHorizontal: 5,
  },
  calculateView: {
    width: '99%',
    height: 120,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginVertical: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
  },
  topIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    flexDirection: 'row',
  },
  calculatestoreView: {
    width: '99%',
    maxHeight: 120,
    flexDirection: 'row',
    paddingHorizontal: 6,
    marginTop: 12,

    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  itemprice: {
    color: '#8C2457',
    fontWeight: '600',
    fontSize: 18,
  },
});

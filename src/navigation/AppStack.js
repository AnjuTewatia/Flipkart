import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/AppScreens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/AppScreens/Notification';
import Favourites from '../screens/AppScreens/Favourite';
import Profile from '../screens/AppScreens/Profile';
import ManageNotification from '../screens/AppScreens/ManageNotification';
import ChangePassword from '../screens/AppScreens/ChangePassword';
import {Typography} from '../Components/Typography';
import RenderImages from '../Components/RenderImages';
import IMAGES from '../utils/Images';
import {COLORS} from '../utils/styleConst';
import EditProfile from '../screens/AppScreens/EditProfile';
import StoreListing from '../screens/AppScreens/StoreListing';
import StoreItems from '../screens/AppScreens/StoreItems';
import Compare from '../screens/AppScreens/Compare';
import FavouriteList from '../screens/AppScreens/FavoriteList';
import ViewItems from '../screens/AppScreens/ViewItems';
import AddItem from '../screens/AppScreens/AddItem';
import AddStore from '../screens/AppScreens/AddStore';
import AlcoholBrands from '../screens/AppScreens/AlcoholBrands';
import AddBrand from '../screens/AppScreens/AddBrand';
import SubScription from '../screens/AppScreens/SubsScription';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        component={BottomTabs}
        name="bottomTabs"
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        component={ManageNotification}
        name="manageNotification"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ChangePassword}
        name="changePassword"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={EditProfile}
        name="editProfile"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={StoreListing}
        name="storeListing"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={StoreItems}
        name="storeItems"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Compare}
        name="compare"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FavouriteList}
        name="FavouriteList"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViewItems}
        name="ViewItems"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AddItem}
        name="AddItem"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AddStore}
        name="AddStore"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AlcoholBrands}
        name="AlcoholBrands"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AddBrand}
        name="AddBrand"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SubScription}
        name="SubScription"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarLabelStyle: {color: COLORS.grey},
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 10,
            // height: 60,
          },
        }}>
        <Tab.Screen
          component={Home}
          name="Home"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <>
                  <View style={styles.tabBar}>
                    <RenderImages
                      source={focused ? IMAGES.activeHome : IMAGES.unActiveHome}
                      style={{width: 22, height: 22}}
                    />
                    <Typography
                      type="sm"
                      style={[
                        styles.tabText,
                        {color: focused ? COLORS.gradientText : COLORS.grey},
                      ]}>
                      Home
                    </Typography>
                  </View>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          component={Notification}
          name="Notificatios"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <>
                  <View style={styles.tabBar}>
                    <RenderImages
                      source={
                        focused
                          ? IMAGES.activeNotification
                          : IMAGES.unActiveNotification
                      }
                      style={{width: 22, height: 22}}
                    />
                    <Typography
                      type="sm"
                      style={[
                        styles.tabText,
                        {color: focused ? COLORS.gradientText : COLORS.grey},
                      ]}>
                      Notificatios
                    </Typography>
                  </View>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          component={Favourites}
          name="Favorites"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <>
                  <View style={styles.tabBar}>
                    <RenderImages
                      source={
                        focused
                          ? IMAGES.activeFavorite
                          : IMAGES.unActiveFavorite
                      }
                      style={{width: 22, height: 22}}
                    />
                    <Typography
                      type="sm"
                      style={[
                        styles.tabText,
                        {color: focused ? COLORS.gradientText : COLORS.grey},
                      ]}>
                      Favorites
                    </Typography>
                  </View>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          component={Profile}
          name="Profile"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <>
                  <View style={styles.tabBar}>
                    <RenderImages
                      source={
                        focused ? IMAGES.activeProfile : IMAGES.unActiveProfile
                      }
                      style={{width: 22, height: 22}}
                    />
                    <Typography
                      type="sm"
                      style={[
                        styles.tabText,
                        {color: focused ? COLORS.gradientText : COLORS.grey},
                      ]}>
                      Profile
                    </Typography>
                  </View>
                </>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default AppStack;

const styles = StyleSheet.create({
  tabBar: {justifyContent: 'center', alignItems: 'center'},
  tabText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
});

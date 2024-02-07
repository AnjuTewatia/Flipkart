import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/AppScreens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/AppScreens/Notification';
import Favourites from '../screens/AppScreens/Favourite';
import Profile from '../screens/AppScreens/Profile';
import {Typography} from '../Components/Typography';
import {HomeActive} from '../Icons';
import RenderImages from '../Components/RenderImages';
import IMAGES from '../utils/Images';
import {COLORS} from '../utils/styleConst';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={BottomTabs}
        name="bottomTabs"
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
            bottom: 0,
            padding: 10,
            // minHeight: bottomTabsHeight,
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
    fontSize: 12,
    fontWeight: '700',
  },
});

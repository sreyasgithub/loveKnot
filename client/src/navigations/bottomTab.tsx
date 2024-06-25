import React, {ReactNode, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType, Pressable} from 'react-native';
import {Avatar} from 'react-native-elements';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

import images from '../assets/images';
import Home from '../screens/tabs/home';
import PhotoJournal from '../screens/tabs/photo-journal';
import FunActivities from '../screens/tabs/fun-activities';
import Chat from '../screens/tabs/chat';

import colors from '../assets/colors';

import {ChatHeader, HomeHeader} from '../components/headers';

import Profile from '../screens/tabs/profile';
import CustomDrawer from '../components/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const showHeader = (isShown: boolean) => {
    return {
      headerShown: isShown,
      contentStyle: {
        backgroundColor: '#fff',
      },
    };
  };

  const bottomTabOptions = (
    // name: string,
    // goBack: any,
    activeIcon: ImageSourcePropType,
    inactiveIcon: ImageSourcePropType,
    // rightIcon?: any,
  ): BottomTabNavigationOptions => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: ({focused}) => (
        <Image source={focused ? activeIcon : inactiveIcon} />
      ),
    };
  };

  const tabHeaderTitle = (navigation: any, title: string) => ({
    headerStyle: {
      height: 65,
    },
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: 'Montserrat-Bold',
      color: colors.primary,
    },

    headerLeft: () => {
      return (
        <Pressable
          style={{paddingLeft: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={images.ARROW_LEFT_ICON} />
        </Pressable>
      );
    },
  });

  const isHeaderShown = showHeader(true);
  const isHeaderNotShown = showHeader(false);

  return (
    <>
      <CustomDrawer />
      <Tab.Navigator
        tabBar={(props: any) => {
          const routeName = props?.state?.routes[props?.state?.index].name;
          if (routeName === 'chat' || routeName == 'fun-activities') {
            return <></>;
          } else {
            return <BottomTabBar {...props} />;
          }
        }}
        screenOptions={{
          headerTitle: '',

          tabBarStyle: {
            height: 60,
          },
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={() => ({
            ...bottomTabOptions(
              images.ACTIVE_HOME_ICON,
              images.INACTIVE_HOME_ICON,
            ),
            header: ({navigation}) => {
              return <HomeHeader navigation={navigation} />;
            },
          })}
        />

        <Tab.Screen
          name="chat"
          component={Chat}
          options={({navigation}) => {
            return {
              ...bottomTabOptions(
                images.ACTIVE_CHAT_ICON,
                images.INACTIVE_CHAT_ICON,
              ),
              header: () => {
                return <ChatHeader />;
              },
            };
          }}
        />

        <Tab.Screen
          name="photo-journal"
          component={PhotoJournal}
          options={({navigation}) => ({
            ...bottomTabOptions(
              images.ACTIVE_PHOTO_JOURNAL_ICON,
              images.INACTIVE_PHOTO_JOURNAL_ICON,
            ),
            ...tabHeaderTitle(navigation, 'Photo Journal'),
            headerRight: () => {
              return (
                <Pressable
                  style={{paddingRight: 15}}
                  onPress={() => {
                    navigation.navigate('add-journal');
                  }}>
                  <Image source={images.ADD_POST_ICON} />
                </Pressable>
              );
            },
          })}
        />
        <Tab.Screen
          name="fun-activities"
          component={FunActivities}
          options={({navigation}) => ({
            ...bottomTabOptions(
              images.ACTIVE_FUN_ACTIVITIES_ICON,
              images.INACTIVE_FUN_ACTIVITIES_ICON,
            ),
            ...isHeaderNotShown,
          })}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={({navigation}) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => {
              return focused ? (
                <Avatar
                  size={32}
                  rounded
                  containerStyle={{
                    borderColor: colors.primary,
                    borderWidth: 2,
                    elevation: 5,
                  }}
                  source={images.DEFAULT_PROFILE}
                />
              ) : (
                <Avatar size={32} rounded source={images.DEFAULT_PROFILE} />
              );
            },
            ...tabHeaderTitle(navigation, 'Profile'),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;

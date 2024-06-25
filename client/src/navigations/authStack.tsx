import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from '../screens/intro';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import Connect from '../screens/auth/connect';
import UserName from '../screens/auth/profile/userName';
import Gender from '../screens/auth/profile/gender';
import Dates from '../screens/auth/profile/dates';
import Concent from '../screens/auth/concent';
interface Props {
  Stack: any;
}

const AuthStackNavigator: React.FC<Props> = ({Stack}) => {
  const showHeader = (isShown: boolean) => {
    return {
      headerShown: isShown,
      contentStyle: {
        backgroundColor: '#fff',
      },
      cardStyle: {},
    };
  };

  const isHeaderNotShown = showHeader(false);

  return (
    <>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="intro"
          component={Intro}
          options={{
            ...isHeaderNotShown,
          }}
        />

        <Stack.Screen
          name="register"
          component={Register}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="connect"
          component={Connect}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="profile-name"
          component={UserName}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="profile-gender"
          component={Gender}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="profile-dates"
          component={Dates}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="concent"
          component={Concent}
          options={{
            ...isHeaderNotShown,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigator;

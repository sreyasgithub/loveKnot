import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pending from './pending';
import Achieved from './achieved';
import colors from '../../assets/colors';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomTopTabBar from '../../components/customTabBar';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchbucketList} from '../../redux/slices/bucket-list/fetchBucketList.slice';
import {AppDispatch} from '../../redux/store';

const Tab = createMaterialTopTabNavigator();

const BucketListTabs = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  useFocusEffect(
    React.useCallback(() => {
      if (navigation) {
        dispatch(fetchbucketList());
      }
    }, []),
  );

  return (
    <Tab.Navigator
      tabBar={props => <CustomTopTabBar {...props} />}
      screenOptions={{
        tabBarContentContainerStyle: {
          backgroundColor: colors.white,
        },
      }}>
      <Tab.Screen name="pending" component={Pending} />
      <Tab.Screen name="achieved" component={Achieved} />
    </Tab.Navigator>
  );
};

export default BucketListTabs;

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import images from '../../../assets/images';
import globalStyles from '../../../assets/globalStyles';
import colors from '../../../assets/colors';
import {Avatar} from 'react-native-elements';
import styles from '../bucket-list.styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {fetchbucketList} from '../../../redux/slices/bucket-list/fetchBucketList.slice';
import {appState} from '../../../redux/slices/rootReducer';

import ListItemCard from '../components/listItemCard';
import Loader from '../../../components/loader';
import {useFocusEffect} from '@react-navigation/native';

const Pending = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const bucketListAll = useSelector((state: appState) => state.fetchBucketList);

  const {pendingList, achievedList, isLoading} = bucketListAll;

  return (
    <View style={[globalStyles.screenContainer, {padding: 0}]}>
      <View style={{}}>
        <View
          style={{
            minHeight: Dimensions.get('window').height - 150,
          }}>
          {pendingList.length > 0 && !isLoading ? (
            <FlatList
              data={pendingList}
              refreshing={isLoading}
              onRefresh={() => {
                dispatch(fetchbucketList());
              }}
              renderItem={({item, index}) => {
                return (
                  <ListItemCard theme={'pending'} index={index} item={item} />
                );
              }}
            />
          ) : pendingList.length === 0 && !isLoading ? (
            <View style={globalStyles.alignCenterInScreen}>
              <Image source={images.BUCKET_LIST_SCREEN_ICON} />
            </View>
          ) : (
            <View style={globalStyles.alignCenterInScreen}>
              <Loader />
            </View>
          )}
          <Pressable
            style={styles.addIconWrapper}
            onPress={() => {
              navigation.navigate('add-bucket-list');
            }}>
            <Image source={images.ADD_LIST_ITEM_ICON} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Pending;

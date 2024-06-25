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
import NoData from '../../../components/noData';

const Achieved = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const bucketListAll = useSelector((state: appState) => state.fetchBucketList);

  const {pendingList, achievedList, isLoading} = bucketListAll;
  const [selectedCardId, setSelectedCardId] = useState<any>(null);
  console.log(achievedList?.length);

  return (
    <View style={[globalStyles.screenContainer, {padding: 0}]}>
      <View style={{}}>
        <View
          style={{
            minHeight: Dimensions.get('window').height - 150,
          }}>
          {achievedList?.length > 0 && !isLoading ? (
            <FlatList
              data={achievedList}
              refreshing={isLoading}
              onRefresh={() => {
                dispatch(fetchbucketList());
              }}
              renderItem={({item, index}) => {
                return (
                  <ListItemCard theme={'acheived'} index={index} item={item} />
                );
              }}
            />
          ) : achievedList?.length === 0 && !isLoading ? (
            <NoData
              image={images.BUCKET_LIST_SCREEN_ICON}
              statement="No Item is achieved yet"
            />
          ) : (
            <View style={globalStyles.alignCenterInScreen}>
              <Loader />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Achieved;

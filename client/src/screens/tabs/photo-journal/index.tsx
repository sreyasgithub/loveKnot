import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import globalStyles from '../../../assets/globalStyles';

import PhotoCard from './photoCard';
import {fetchJournal} from '../../../redux/slices/photo-journal/fetchJounal.slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {appState} from '../../../redux/slices/rootReducer';
import {cardProps} from './interfaces';
import NoData from '../../../components/noData';
import images from '../../../assets/images';
import Loader from '../../../components/loader';
import {useFocusEffect} from '@react-navigation/native';
import Model from '../../../components/model';
const PhotoJournal = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = useState(false);
  const photoJournals = useSelector((state: appState) => state.journals);
  const modal = useSelector((state: appState) => state.modal);
  const {isLoading, data} = photoJournals;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchJournal());
    }, [navigation]),
  );

  const renderItem = ({item}: any) => {
    return <PhotoCard item={item} />;
    // return <View></View>;
  };

  const posts = data?.posts;

  return (
    <>
      {posts?.length && !isLoading ? (
        <View style={globalStyles.screenContent}>
          <FlatList
            refreshing={refresh}
            onRefresh={() => {
              dispatch(fetchJournal());
            }}
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.content._id.toString()}
          />
        </View>
      ) : posts?.length === 0 && !isLoading ? (
        <ScrollView
          contentContainerStyle={globalStyles.screenContent}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                dispatch(fetchJournal());
              }}
            />
          }>
          <NoData
            image={images.PHOTO_JOURNAL_NO_DATA}
            statement="No Photos Available"
            subStatement="please upload photos to see"
          />
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={globalStyles.screenContent}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                dispatch(fetchJournal());
              }}
            />
          }>
          <Loader center={true} />
        </ScrollView>
      )}
    </>
  );
};

export default PhotoJournal;

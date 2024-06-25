import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Pressable, View} from 'react-native';
import {ButtonMd, ButtonSm} from '../../../components/buttons';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';
import ThingsToDoForm from './form';
import {showModel} from '../../../redux/slices/components/modal.slice';
import {useDispatch, useSelector} from 'react-redux';
import modalTypes from '../../../redux/types/modal.types';
import {appState} from '../../../redux/slices/rootReducer';
import Model from '../../../components/model';
import {Text} from 'react-native';
import images from '../../../assets/images';
import styles from '../bucket-list.styles';
import {deleteTodoItem} from '../../../redux/slices/bucket-list/createBucketList.slice';

type RootStackParamList = {
  data: {
    formData: {
      budget: '';
      category: '';
      description: '';
      imgSrc: '';
      name: '';
      targetDate: '';
      thingsToDo: [];
      website: '';
    };
    setData: any;
  };
};

// Create a type for the route prop

const ThingsToDo = () => {
  const modal = useSelector((state: appState) => state.modal);
  const [thingsToDo, setThingsToDo] = useState();
  const createBucketListState = useSelector(
    (state: appState) => state.createBucketList,
  );

  const dispatch = useDispatch();

  const renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <View style={styles.toDoItemWrapper}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            fontSize: 16,
            color: colors.black,
          }}>
          {item?.item}
        </Text>
        <Pressable
          style={styles.todoDltIcon}
          onPress={() => {
            dispatch(deleteTodoItem(item?.item));
          }}>
          <Image source={images.DELETE_PINK_ICON} />
        </Pressable>
      </View>
    );
  };
  useEffect(() => {
    setThingsToDo(createBucketListState.thingsToDo);
  }, [createBucketListState.thingsToDo]);

  return (
    <View style={globalStyles.screenContent}>
      <FlatList data={thingsToDo} renderItem={renderItem} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 20,
        }}>
        <ButtonMd
          label="+Add"
          bgColor={colors.primary}
          onPress={() => {
            dispatch(showModel(modalTypes.BUCKET_LIST_THINGS_TO_DO));
          }}
          width={80}
        />
      </View>
      {modal.type === modalTypes.BUCKET_LIST_THINGS_TO_DO && (
        <Model onBackdropPress={false}>
          <Text style={globalStyles.selectPopUpLabel}>Things to do</Text>
          <ThingsToDoForm />
        </Model>
      )}
    </View>
  );
};

export default ThingsToDo;

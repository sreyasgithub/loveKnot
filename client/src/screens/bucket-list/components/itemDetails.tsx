import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import {CheckBox, Dialog, Text} from 'react-native-elements';
import images from '../../../assets/images';
import colors from '../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
import {
  closeModel,
  showModel,
} from '../../../redux/slices/components/modal.slice';
import ThingsToDo from '../thingsToDo';
import formatDate from '../../../services/setDateFormat.svc';
import {ButtonSm} from '../../../components/buttons';
import modalTypes from '../../../redux/types/modal.types';
import Model from '../../../components/model';
import PopUp from '../../../components/popUp';
import deleteBucketListItemSlice, {
  deleteBucketListItem,
  setBLItemId,
} from '../../../redux/slices/bucket-list/deleteBucketList.slice';
import {AppDispatch} from '../../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {achieveBucketListItem} from '../../../redux/slices/bucket-list/achieveBucketList.slice';
import {
  editBucketList,
  editThingsToDoBucketList,
} from '../../../redux/slices/bucket-list/editBucketList.slice';

interface Props {
  item: {
    content: {
      imgSrc: {
        public_id: string;
        url: string;
      };
      _id: string;
      userId: string;
      name: string;
      description: string;
      category: string;
      targetDate: string;
      website: string;
      budget: string;
      thingsToDo: Array<string>;
      isPending: boolean;
      createdOn: string;
      __v: number;
    };
    postedBy: {
      userImg: {
        public_id: string;
        url: string;
      };
      userName: string;
    };
  };
  theme: 'pending' | 'acheived';
}

const ItemDetails: React.FC<Props> = ({item, theme}) => {
  const modal = useSelector((state: appState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const deleteBucketListItem = useSelector(
    (state: appState) => state.deleteBucketListItem,
  );
  const CheckListItem = ({
    toDoItem,
    index,
    theme,
  }: {
    toDoItem: any;
    index: any;
    theme: 'pending' | 'acheived';
  }) => {
    const [isChecked, setIsChecked] = useState<any>(toDoItem?.isChecked);

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          checked={isChecked}
          onPress={() => {
            if (theme === 'pending') {
              setIsChecked(!isChecked);

              dispatch(
                editThingsToDoBucketList({
                  blItemId: item?.content?._id,
                  toDoItemId: toDoItem?._id,
                  isChecked: !isChecked,
                }),
              );
            }
          }}
          wrapperStyle={{
            backgroundColor: 'transparent',
          }}
          checkedColor={theme === 'pending' ? colors.accent : colors.primary}
          uncheckedColor={
            theme === 'pending'
              ? colors._accent.shade1
              : colors._primary.shade_1
          }
          containerStyle={{
            padding: 0,
            margin: 0,
          }}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
        />
        <Text>{toDoItem?.item}</Text>
      </View>
    );
  };
  const lineColor =
    theme === 'pending' ? colors.secondary : colors._primary.shade_2;
  const wrapperColor =
    theme === 'pending' ? colors._accent.shade1 : colors._primary.shade_1;
  const navigation = useNavigation<any>();

  return (
    <Dialog
      isVisible={modal.visible}
      onBackdropPress={() => {
        dispatch(closeModel());
      }}
      overlayStyle={styles.overlay}>
      <ImageBackground
        source={{
          uri: item?.content?.imgSrc?.url
            ? item?.content?.imgSrc?.url
            : 'https://garden.spoonflower.com/c/5090068/p/f/m/3yDyWOWB4oECjSmqcc9qmveAYXj9WfizlmWcqq8S3gEqvqlo5DilMA/Light%20Gray%20Solid.jpg',
        }}
        imageStyle={{borderRadius: 10}}
        style={[
          {
            width: '100%',
            height: '100.28%',
          },
        ]}
        resizeMode="cover">
        <View
          style={[
            theme === 'pending'
              ? globalStyles.flexRowSpaceBetween
              : {justifyContent: 'center'},
            {paddingHorizontal: 40, paddingTop: 20},
          ]}>
          <Text
            style={{
              fontFamily: 'Playball-Regular',
              fontSize: 30,
              color: theme === 'pending' ? colors.accent : colors.primary,
              textAlign: theme === 'acheived' ? 'center' : 'left',
            }}>
            {item?.content?.name}
          </Text>

          {theme === 'pending' && (
            <View style={globalStyles.flexRowSpaceBetween}>
              <Pressable
                style={{marginRight: 20}}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('edit-bucket-list', {
                      item: item,
                    });
                  }
                }}>
                <Image source={images.EDIT_BROWN_ICON} />
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(closeModel());
                  dispatch(setBLItemId(item?.content?._id));

                  dispatch(showModel(modalTypes.DELETE_BUCKET_LIST));
                }}>
                <Image source={images.DELETE_BROWN_ICON} />
              </Pressable>
            </View>
          )}
        </View>
        <View style={[styles.detailsContainer]}>
          <View style={{}}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={[
                  styles.categoryWrapper,
                  {backgroundColor: wrapperColor},
                ]}>
                <View style={styles.categoryIconWrapper}>
                  <Image
                    source={images.TRAVEL_WHITE_ICON}
                    style={{width: 30, height: 30}}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryLabel}>
                  {item?.content?.category}
                </Text>
              </View>
              <View style={{width: '66%'}}>
                <View
                  style={[
                    styles.dateBudgetWrapper,
                    {backgroundColor: wrapperColor},
                  ]}>
                  <Text>{formatDate(item?.content?.targetDate)}</Text>
                  <Image source={images.CALENDER} />
                </View>
                <View
                  style={[
                    [styles.dateBudgetWrapper, {backgroundColor: wrapperColor}],
                    {marginTop: 10},
                  ]}>
                  <Text>{item?.content?.budget}</Text>
                  <Image source={images.BUDGET_PINK_ICON} />
                </View>
              </View>
            </View>
            {item?.content?.description ? (
              <Text
                style={[
                  styles.description,
                  {
                    borderTopColor: lineColor,
                    borderBottomColor: lineColor,
                  },
                ]}>
                {item?.content?.description}
              </Text>
            ) : (
              <View
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: lineColor,
                    marginVertical: 20,
                  },
                ]}></View>
            )}

            <View>
              <View
                style={[
                  styles.thingsToDoHeaderWrapper,
                  {
                    backgroundColor:
                      theme === 'pending'
                        ? colors._accent.shade1
                        : colors._primary.shade_1,
                  },
                ]}>
                <Text style={[styles.thingsToDoHeading]}>Things to do</Text>
              </View>
              <View style={{height: 120, marginBottom: 10}}>
                <FlatList
                  data={item.content.thingsToDo}
                  renderItem={({item, index}) => (
                    <CheckListItem
                      toDoItem={item}
                      index={index}
                      theme={theme}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopColor: lineColor,
              borderTopWidth: 1,
            }}>
            <Text
              style={styles.website}
              onPress={() => {
                Linking.openURL(item?.content?.website).catch(err =>
                  console.error("Couldn't load page", err),
                );
              }}>
              {item?.content?.website?.slice(0, 40)}
              {item?.content?.website?.length > 40 && '...'}
            </Text>
          </View>
        </View>
        {theme === 'pending' && (
          <View style={globalStyles.flexRowCenter}>
            <ButtonSm
              label="Achieved"
              bgColor={colors.accent}
              color={colors.white}
              onPress={() => {
                dispatch(
                  achieveBucketListItem({
                    blItemId: item?.content?._id,
                    navigation: navigation,
                  }),
                );
              }}
              width={100}
            />
          </View>
        )}
      </ImageBackground>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  overlay: {
    padding: 0,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 150,
    borderRadius: 20,
  },
  categoryWrapper: {
    borderRadius: 10,
    width: '30%',
    padding: 10,
    ...globalStyles.flexColCenter,
    marginRight: 10,
  },
  categoryIconWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 10,
  },
  categoryLabel: {
    fontSize: 10,
    fontFamily: 'OpenSans-SemiBold',
    color: colors.black,
  },

  description: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: colors.black,

    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 20,
    marginVertical: 10,
  },

  dateBudgetWrapper: {
    borderRadius: 10,
    padding: 10,
    ...globalStyles.flexRowSpaceBetween,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    margin: 15,
    marginBottom: 0,
    borderRadius: 10,
    height: '76%',
    padding: 15,
    opacity: 0.85,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  thingsToDoHeaderWrapper: {
    backgroundColor: colors._accent.shade1,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  thingsToDoHeading: {
    fontFamily: 'OpenSans-Medium',
    color: colors.black,
    fontSize: 14,
  },
  website: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 10,
    color: colors.grey.shade4,
    padding: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ItemDetails;

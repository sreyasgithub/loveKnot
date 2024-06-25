import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import UploadNShowImage from '../../../components/uploadNShowImage';
import images from '../../../assets/images';
import TextField from '../../../components/textField';
import TextArea from '../../../components/textArea';
import globalStyles from '../../../assets/globalStyles';
import Select from '../../../components/select';
import colors from '../../../assets/colors';
import {ButtonLg} from '../../../components/buttons';
import SelectDatePicker from '../../../components/dateSelector/selectDatePicker';
import {dateTypes} from '../../../redux/types/dates.types';
import IconButton from '../../../components/iconButton';
import Categories from './categories';
import Budget from './budget';

import Website from './website';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {setBLTargetDate} from '../../../redux/slices/components/datePicker.slice';
import {appState} from '../../../redux/slices/rootReducer';
import {WebView} from 'react-native-webview';
import {createbucketList} from '../../../redux/slices/bucket-list/createBucketList.slice';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {editBucketList} from '../../../redux/slices/bucket-list/editBucketList.slice';

interface Props {}

type RootStackParamList = {
  'edit-bucket-list': {
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
  };
};

// Create a type for the route prop
type ConnectScreenRouteProp = RouteProp<RootStackParamList, 'edit-bucket-list'>;

// Initialize countdown value

const AddBucketListItem = ({navigation}: any) => {
  const route = useRoute<ConnectScreenRouteProp>();
  const createBucketListState = useSelector(
    (state: appState) => state.createBucketList,
  );
  const [data, setData] = useState({
    id: '',
    imgSrc: '',
    name: '',
    description: '',
    category: '',
    targetDate: '',
    website: '',
    budget: '',
    thingsToDo: createBucketListState.thingsToDo,
    navigation: navigation,
  });

  const dispatch = useDispatch<AppDispatch>();

  const datePicker = useSelector((state: appState) => state.datePicker);
  const imagePicker = useSelector((state: appState) => state.imagePicker);
  const {blTargetDate} = datePicker;

  const openWebsite = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  useEffect(() => {
    setData({...data, thingsToDo: createBucketListState.thingsToDo});
  }, [createBucketListState.thingsToDo]);

  useEffect(() => {
    setData({...data, imgSrc: imagePicker.image});
  }, [imagePicker.image]);

  useEffect(() => {
    setData({...data, targetDate: blTargetDate});
  }, [blTargetDate]);

  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        const item = route.params.item;
        console.log(item);

        setData({
          id: item?.content?._id,
          imgSrc: '',
          name: item?.content?.name,
          description: item?.content?.description,
          category: item?.content?.category,
          targetDate: item?.content?.targetDate,
          website: item?.content?.website,
          budget: item?.content?.budget,
          thingsToDo: item?.content?.thingsToDo,
          navigation: navigation,
        });
      }
    }, [route.params]),
  );
  console.log('data.thingsToDo', data);

  return (
    <ScrollView>
      <View style={globalStyles.contentWrapper}>
        <UploadNShowImage
          width={Dimensions.get('screen').width - 40}
          defaultImg={images.BUCKET_LIST_SCREEN_ICON}
        />
        <TextField
          placeholder="Name your bucket list item"
          onChange={(text: any) => {
            setData({...data, name: text});
          }}
          value={data.name}
        />
        <TextArea
          placeholder="Description (Optional)"
          onChange={(text: any) => {
            setData({...data, description: text});
          }}
          numberOfLines={4}
          maxLength={400}
          value={data.description}
        />
        <Select
          icon={images.CATEGORY_BLACK_ICON}
          labelSelector="Set"
          label="Select a Category"
          labelColor={colors.black}
          overlayLabel={'Categories'}
          overlayContent={<Categories data={data} setData={setData} />}
          value={data?.category}
        />
        <SelectDatePicker
          icon={images.CALENDER_BLACK_ICON}
          handleChange={(date: any) => {
            dispatch(setBLTargetDate(date));
          }}
          labelSelector="Set"
          label="Target Date"
          labelColor={colors.black}
          selected={data?.targetDate}
          dateType={dateTypes.bucketListTargetDate}
          overlayLabel={'Target Date'}
        />
        <Select
          icon={images.WEBSITE_BLACK_ICON}
          labelSelector="Set"
          label="Website"
          labelColor={colors.black}
          overlayLabel={'Website'}
          value={data?.website}
          overlayContent={<Website data={data} setData={setData} />}
        />
        {data?.website && (
          <Pressable
            onPress={() => {
              openWebsite(data?.website);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'OpenSans-SemiBold',
                color: colors.primary,
                marginLeft: 10,
                textDecorationLine: 'underline',
              }}>
              {data?.website?.slice(0, 50)}
            </Text>
          </Pressable>
        )}
        <Select
          icon={images.BUDGET_BLACK_ICON_SM}
          labelSelector="Set"
          label="Budget"
          labelColor={colors.black}
          overlayLabel={'Budget'}
          overlayContent={<Budget data={data} setData={setData} />}
          value={data?.budget}
        />
        <Select
          icon={images.TO_DO_LIST_BLACK_ICON}
          labelSelector="+ Add"
          label="Things to do"
          labelColor={colors.black}
          overlayLabel={'Things to do'}
          value={data?.thingsToDo?.length}
          onPress={() => {
            navigation.navigate('things-to-do');
          }}
        />

        <ButtonLg
          label="Save"
          onPress={() => {
            if (route.params) {
              dispatch(editBucketList(data));
            } else {
              dispatch(createbucketList(data));
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddBucketListItem;

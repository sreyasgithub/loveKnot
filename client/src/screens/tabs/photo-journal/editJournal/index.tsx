import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import globalStyles from '../../../../assets/globalStyles';

import images from '../../../../assets/images';
import styles from '../photo-journal.styles';

import openImagePicker from '../../../../services/imagePicker';
import colors from '../../../../assets/colors';
import TextField from '../../../../components/textField';
import TextArea from '../../../../components/textArea';
import Select from '../../../../components/select';
import {ButtonLg} from '../../../../components/buttons';
import Model from '../../../../components/model';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../../redux/slices/rootReducer';
import {
  NavigationContainerProps,
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import UploadNShowImage from '../../../../components/uploadNShowImage';

import {AppDispatch} from '../../../../redux/store';
import {editJournal} from '../../../../redux/slices/photo-journal/editJournal.slice';
import {setImageUri} from '../../../../redux/slices/components/imagePicker.slice';

type RootStackParamList = {
  item: any;
};

// Create a type for the route prop
type EditJournalScreenRouteProp = RouteProp<RootStackParamList, 'item'>;

const EditJournal = () => {
  const route = useRoute<EditJournalScreenRouteProp>();
  const {item}: any = route.params;
  const navigation = useNavigation();
  console.log(item);

  const createJournalState = useSelector(
    (state: appState) => state.createJournal,
  );
  console.log(item.content.imgSrc.url);
  const dispatch = useDispatch<AppDispatch>();

  const modal = useSelector((state: appState) => state.modal);
  const [data, setData] = useState({
    imgSrc: createJournalState.imageUri,
    caption: item.content.caption,
    description: item.content.description,
    journalId: item.content._id,
    navigation,
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(setImageUri(item.content.imgSrc.url));
    }, []),
  );

  useEffect(() => {
    setData({...data, imgSrc: createJournalState.image});
  }, [createJournalState.image]);

  return (
    <ScrollView
      style={[globalStyles.screenContent, globalStyles.contentWrapper]}>
      <View>
        <UploadNShowImage
          width={Dimensions.get('screen').width - 80}
          defaultImg={images.COUPLE_USER}
        />
        <TextField
          onChange={(text: any) => {
            setData({...data, caption: text});
          }}
          value={data.caption}
        />
        <TextArea
          numberOfLines={4}
          onChange={(text: any) => {
            setData({...data, description: text});
          }}
          maxLength={300}
          value={data.description}
        />
        {/* <Select
          icon={images.MUSIC_TONE_ICON}
          label="Edit Music"
          onPress={() => {}}
          arrowSelector={true}
        /> */}

        <ButtonLg
          label="Update"
          onPress={() => {
            dispatch(editJournal(data));
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EditJournal;

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import globalStyles from '../../../../assets/globalStyles';

import images from '../../../../assets/images';

import TextField from '../../../../components/textField';
import TextArea from '../../../../components/textArea';
import Select from '../../../../components/select';
import {ButtonLg} from '../../../../components/buttons';
import UploadNShowImage from '../../../../components/uploadNShowImage';
import {createJournal} from '../../../../redux/slices/photo-journal/createJournal.slice';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../../redux/slices/rootReducer';
import {AppDispatch} from '../../../../redux/store';

const AddJournal = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const imagePicker = useSelector((state: appState) => state.imagePicker);

  const [data, setData] = useState({
    imgSrc: imagePicker.image,
    caption: '',
    description: '',
    navigation,
  });

  useEffect(() => {
    setData({...data, imgSrc: imagePicker.image});
  }, [imagePicker.image]);

  return (
    <View style={[globalStyles.screenContent, globalStyles.contentWrapper]}>
      <View>
        <UploadNShowImage
          width={Dimensions.get('screen').width - 80}
          defaultImg={images.COUPLE_USER}
        />
        <TextField
          placeholder="Enter your caption"
          onChange={(text: any) => {
            setData({...data, caption: text});
          }}
        />
        <TextArea
          numberOfLines={4}
          placeholder="Wanna Describe Your Moment?"
          onChange={(text: any) => {
            setData({...data, description: text});
          }}
          maxLength={200}
        />
        {/* <Select
          icon={images.MUSIC_TONE_ICON}
          label="Add Music"
          arrowSelector={true}
          onPress={() => {}}
        /> */}

        <ButtonLg
          label="Post"
          onPress={() => {
            dispatch(createJournal(data));
          }}
        />
      </View>
    </View>
  );
};

export default AddJournal;
